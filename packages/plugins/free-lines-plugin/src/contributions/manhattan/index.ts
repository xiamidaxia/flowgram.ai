/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IPoint, Point, Rectangle } from '@flowgram.ai/utils';
import {
  POINT_RADIUS,
  WorkflowLineEntity,
  WorkflowLineRenderContribution,
} from '@flowgram.ai/free-layout-core';
import { FlowNodeTransformData } from '@flowgram.ai/document';

import { LINE_PADDING } from '../../constants/lines';

export interface ManhattanData {
  points: IPoint[];
  path: string;
  bbox: Rectangle;
}

// 线条与节点的安全距离
const AVOID_PADDING = 16;
// 转折惩罚，用于在相同距离时优先更少拐点
const TURN_COST = 10;

export class WorkflowManhattanLineContribution implements WorkflowLineRenderContribution {
  public static type = 'WorkflowManhattanLineContribution';

  public entity: WorkflowLineEntity;

  constructor(entity: WorkflowLineEntity) {
    this.entity = entity;
  }

  private data?: ManhattanData;

  public get path(): string {
    return this.data?.path ?? '';
  }

  public calcDistance(pos: IPoint): number {
    if (!this.data) {
      return Number.MAX_SAFE_INTEGER;
    }
    // 计算点到所有线段的最小距离
    return Math.min(
      ...this.data.points.slice(1).map((point, index) => {
        const prevPoint = this.data!.points[index];
        return this.getDistanceToLineSegment(pos, prevPoint, point);
      })
    );
  }

  private getDistanceToLineSegment(point: IPoint, start: IPoint, end: IPoint): number {
    // 计算线段的方向向量
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // 如果线段退化为一个点
    if (dx === 0 && dy === 0) {
      return Point.getDistance(point, start);
    }

    // 计算投影点的参数 t
    const t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy);

    // 如果投影点在线段外部，返回到端点的距离
    if (t < 0) return Point.getDistance(point, start);
    if (t > 1) return Point.getDistance(point, end);

    // 投影点在线段上，计算实际距离
    const projectionPoint = {
      x: start.x + t * dx,
      y: start.y + t * dy,
    };
    return Point.getDistance(point, projectionPoint);
  }

  public get bounds(): Rectangle {
    if (!this.data) {
      return new Rectangle();
    }
    return this.data.bbox;
  }

  public update(params: { fromPos: IPoint; toPos: IPoint }): void {
    const { fromPos, toPos } = params;
    const { vertical } = this.entity;

    const sourceOffset = {
      x: vertical ? 0 : POINT_RADIUS,
      y: vertical ? POINT_RADIUS : 0,
    };
    const targetOffset = {
      x: vertical ? 0 : -POINT_RADIUS,
      y: vertical ? -POINT_RADIUS : 0,
    };

    // 计算曼哈顿路径的点（带避让）
    const points = this.getRoutedPoints({
      source: {
        x: fromPos.x + sourceOffset.x,
        y: fromPos.y + sourceOffset.y,
      },
      target: {
        x: toPos.x + targetOffset.x,
        y: toPos.y + targetOffset.y,
      },
      vertical,
    });

    const bbox = Rectangle.createRectangleWithTwoPoints(
      points.reduce(
        (min, p) => ({
          x: Math.min(min.x, p.x),
          y: Math.min(min.y, p.y),
        }),
        points[0]
      ),
      points.reduce(
        (max, p) => ({
          x: Math.max(max.x, p.x),
          y: Math.max(max.y, p.y),
        }),
        points[0]
      )
    );

    // 调整所有点到 SVG 视口坐标系
    const adjustedPoints = points.map((p) => ({
      x: p.x - bbox.x + LINE_PADDING,
      y: p.y - bbox.y + LINE_PADDING,
    }));

    // 生成路径
    const path = this.getPathFromPoints(adjustedPoints);

    this.data = {
      points,
      path,
      bbox,
    };
  }

  /**
   * 基于节点矩形避让的正交路由
   */
  private getRoutedPoints(params: {
    source: IPoint;
    target: IPoint;
    vertical: boolean;
  }): IPoint[] {
    const { source, target, vertical } = params;

    // 简单 L 型尝试（优先方向）
    const l1: IPoint[] = [source, { x: source.x, y: target.y }, target];
    const l2: IPoint[] = [source, { x: target.x, y: source.y }, target];

    const obstacles = this.getObstacles();

    const segmentBlocked = (a: IPoint, b: IPoint): boolean => {
      // 只会有水平或垂直线段
      const x1 = Math.min(a.x, b.x);
      const x2 = Math.max(a.x, b.x);
      const y1 = Math.min(a.y, b.y);
      const y2 = Math.max(a.y, b.y);
      for (const r of obstacles) {
        // 开放边界（允许贴边滑走），因此使用开区间
        const withinX = x1 < r.right && x2 > r.left;
        const withinY = y1 < r.bottom && y2 > r.top;
        if (withinX && withinY) {
          // 需要同时为水平/垂直对齐
          if (a.y === b.y) {
            // 水平线段与矩形在 y 上有交集，且 x 范围穿过
            if (r.top < a.y && r.bottom > a.y) {
              if (!(x2 <= r.left || x1 >= r.right)) return true;
            }
          } else if (a.x === b.x) {
            if (r.left < a.x && r.right > a.x) {
              if (!(y2 <= r.top || y1 >= r.bottom)) return true;
            }
          }
        }
      }
      return false;
    };

    const pathClear = (pts: IPoint[]) => {
      for (let i = 0; i < pts.length - 1; i++) {
        if (segmentBlocked(pts[i], pts[i + 1])) return false;
      }
      return true;
    };

    // 先尝试两拐点
    if (pathClear(vertical ? l1 : l2)) return this.compressPoints(vertical ? l1 : l2);
    if (pathClear(vertical ? l2 : l1)) return this.compressPoints(vertical ? l2 : l1);

    // 构建正交可见网格（由所有矩形的左右上下边界 + 起终点组成）
    const xs = new Set<number>([source.x, target.x]);
    const ys = new Set<number>([source.y, target.y]);
    for (const r of obstacles) {
      xs.add(r.left);
      xs.add(r.right);
      ys.add(r.top);
      ys.add(r.bottom);
    }
    const xsArr = Array.from(xs).sort((a, b) => a - b);
    const ysArr = Array.from(ys).sort((a, b) => a - b);

    // 网格点集合（过滤掉落在障碍内部的点）
    const key = (x: number, y: number) => `${x},${y}`;
    const nodes = new Map<string, IPoint>();
    const insideAny = (p: IPoint) => obstacles.some((r) => p.x > r.left && p.x < r.right && p.y > r.top && p.y < r.bottom);
    for (const x of xsArr) {
      for (const y of ysArr) {
        const p = { x, y };
        if (!insideAny(p)) nodes.set(key(x, y), p);
      }
    }

    // 构建相邻边（同一行、同一列的相邻可见点）
    const neighbors = new Map<string, { to: string; cost: number; dir: 'H' | 'V' }[]>();
    const addEdge = (a: IPoint, b: IPoint) => {
      if (segmentBlocked(a, b)) return;
      const ka = key(a.x, a.y);
      const kb = key(b.x, b.y);
      if (!nodes.has(ka) || !nodes.has(kb)) return;
      const dir: 'H' | 'V' = a.y === b.y ? 'H' : 'V';
      const cost = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      if (!neighbors.has(ka)) neighbors.set(ka, []);
      if (!neighbors.has(kb)) neighbors.set(kb, []);
      neighbors.get(ka)!.push({ to: kb, cost, dir });
      neighbors.get(kb)!.push({ to: ka, cost, dir });
    };

    // 行
    for (const y of ysArr) {
      const rowPoints = xsArr
        .map((x) => nodes.get(key(x, y)))
        .filter(Boolean) as IPoint[];
      for (let i = 0; i < rowPoints.length - 1; i++) {
        addEdge(rowPoints[i], rowPoints[i + 1]);
      }
    }
    // 列
    for (const x of xsArr) {
      const colPoints = ysArr
        .map((y) => nodes.get(key(x, y)))
        .filter(Boolean) as IPoint[];
      for (let i = 0; i < colPoints.length - 1; i++) {
        addEdge(colPoints[i], colPoints[i + 1]);
      }
    }

    // Dijkstra，状态包含进入方向以惩罚拐弯
    const startK = key(source.x, source.y);
    const endK = key(target.x, target.y);
    const dist = new Map<string, number>();
    const prev = new Map<string, string>();
    const prevDir = new Map<string, 'H' | 'V' | 'N'>();

    const pq: { k: string; d: number; dir: 'H' | 'V' | 'N' }[] = [];
    const push = (item: { k: string; d: number; dir: 'H' | 'V' | 'N' }) => {
      pq.push(item);
      pq.sort((a, b) => a.d - b.d);
    };

    push({ k: startK, d: 0, dir: vertical ? 'V' : 'H' });
    dist.set(startK, 0);
    prevDir.set(startK, 'N');

    while (pq.length) {
      const { k, d } = pq.shift()!;
      if (k === endK) break;
      const list = neighbors.get(k) || [];
      for (const e of list) {
        const turnPenalty = prevDir.get(k) && prevDir.get(k) !== 'N' && prevDir.get(k) !== e.dir ? TURN_COST : 0;
        const nd = d + e.cost + turnPenalty;
        if (dist.get(e.to) === undefined || nd < dist.get(e.to)!) {
          dist.set(e.to, nd);
          prev.set(e.to, k);
          prevDir.set(e.to, e.dir);
          push({ k: e.to, d: nd, dir: e.dir });
        }
      }
    }

    // 回溯路径
    const out: IPoint[] = [];
    let cur = endK;
    if (!dist.has(endK)) {
      // 无法到达，退化为简单 L 型
      return this.compressPoints(vertical ? l1 : l2);
    }
    while (cur) {
      const p = nodes.get(cur)!;
      out.push({ x: p.x, y: p.y });
      cur = prev.get(cur)!;
      if (cur === startK) {
        out.push(nodes.get(startK)!);
        break;
      }
    }
    out.reverse();

    return this.compressPoints(out);
  }

  private compressPoints(points: IPoint[]): IPoint[] {
    if (points.length <= 2) return points;
    const result: IPoint[] = [points[0]];
    for (let i = 1; i < points.length - 1; i++) {
      const a = result[result.length - 1];
      const b = points[i];
      const c = points[i + 1];
      // 去掉共线点
      if ((a.x === b.x && b.x === c.x) || (a.y === b.y && b.y === c.y)) {
        continue;
      }
      result.push(b);
    }
    result.push(points[points.length - 1]);
    return result;
  }

  private getObstacles(): Rectangle[] {
    const doc = this.entity.linesManager['document'];
    const fromNode = this.entity.from;
    const toNode = this.entity.to;
    if (!doc) return [];
    const rects: Rectangle[] = [];
    doc
      .getAllNodes()
      .forEach((node: any) => {
        if (!node || node === fromNode || node === toNode) return;
        const transform = node.getData(FlowNodeTransformData);
        const b = transform?.bounds as Rectangle | undefined;
        if (!b || b.width === 0 || b.height === 0) return;
        const r = new Rectangle(b.x, b.y, b.width, b.height).pad(AVOID_PADDING);
        rects.push(r);
      });
    return rects;
  }

  private getPathFromPoints(points: IPoint[]): string {
    return points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      return `${path} L ${point.x} ${point.y}`;
    }, '');
  }
}
