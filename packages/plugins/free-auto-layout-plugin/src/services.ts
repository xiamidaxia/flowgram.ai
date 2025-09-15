/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import {
  WorkflowDocument,
  WorkflowLineEntity,
  WorkflowNodeEntity,
  WorkflowNodeLinesData,
} from '@flowgram.ai/free-layout-core';

import { AutoLayoutOptions } from './type';
import { LayoutConfig, LayoutEdge, LayoutNode } from './layout/type';
import { DefaultLayoutOptions } from './layout/constant';
import { DefaultLayoutConfig, Layout, type LayoutOptions } from './layout';

@injectable()
export class AutoLayoutService {
  @inject(WorkflowDocument) private readonly document: WorkflowDocument;

  private layoutConfig: LayoutConfig = DefaultLayoutConfig;

  public init(options: AutoLayoutOptions) {
    this.layoutConfig = {
      ...this.layoutConfig,
      ...options.layoutConfig,
    };
  }

  public async layout(options: Partial<LayoutOptions> = {}): Promise<void> {
    const layoutOptions: LayoutOptions = {
      ...DefaultLayoutOptions,
      ...options,
    };
    const root = this.createLayoutNode(this.document.root, options);
    const layouts = await this.layoutNode(root, layoutOptions);
    await Promise.all(layouts.map((layout) => layout.position()));
  }

  private async layoutNode(container: LayoutNode, options: LayoutOptions): Promise<Layout[]> {
    const { layoutNodes, layoutEdges } = container;
    if (layoutNodes.length === 0) {
      return [];
    }
    // 触发子节点布局
    const childrenLayouts = (
      await Promise.all(layoutNodes.map((n) => this.layoutNode(n, options)))
    ).flat();
    const layout = new Layout(this.layoutConfig);
    layout.init({ container, layoutNodes, layoutEdges }, options);
    layout.layout();
    const { size } = layout;
    container.size = size;
    return [...childrenLayouts, layout];
  }

  private createLayoutNodes(nodes: WorkflowNodeEntity[], options: LayoutOptions): LayoutNode[] {
    return nodes.map((node) => this.createLayoutNode(node, options));
  }

  /** 创建节点布局数据 */
  private createLayoutNode(node: WorkflowNodeEntity, options: LayoutOptions): LayoutNode {
    const { blocks } = node;
    const edges = this.getNodesAllLines(blocks);

    // 创建子布局节点
    const layoutNodes = this.createLayoutNodes(blocks, options);
    const layoutEdges = this.createLayoutEdges(edges);

    const { bounds } = node.transform;
    const { width, height, center } = bounds;
    const { x, y } = center;
    const layoutNode: LayoutNode = {
      id: node.id,
      entity: node,
      index: '', // 初始化时，index 未计算
      rank: -1, // 初始化时，节点还未布局，层级为-1
      order: -1, // 初始化时，节点还未布局，顺序为-1
      position: { x, y },
      offset: { x: 0, y: 0 },
      size: { width, height },
      layoutNodes,
      layoutEdges,
    };
    return layoutNode;
  }

  private createLayoutEdges(edges: WorkflowLineEntity[]): LayoutEdge[] {
    const layoutEdges = edges
      .map((edge) => this.createLayoutEdge(edge))
      .filter(Boolean) as LayoutEdge[];
    return layoutEdges;
  }

  /** 创建线条布局数据 */
  private createLayoutEdge(edge: WorkflowLineEntity): LayoutEdge | undefined {
    const { from, to } = edge.info;
    if (!from || !to || edge.vertical) {
      return;
    }
    const layoutEdge: LayoutEdge = {
      id: edge.id,
      entity: edge,
      from,
      to,
      fromIndex: '', // 初始化时，index 未计算
      toIndex: '', // 初始化时，index 未计算
      name: edge.id,
    };
    return layoutEdge;
  }

  private getNodesAllLines(nodes: WorkflowNodeEntity[]): WorkflowLineEntity[] {
    const lines = nodes
      .map((node) => {
        const linesData = node.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData);
        const outputLines = linesData.outputLines.filter(Boolean);
        const inputLines = linesData.inputLines.filter(Boolean);
        return [...outputLines, ...inputLines];
      })
      .flat();

    return lines;
  }
}
