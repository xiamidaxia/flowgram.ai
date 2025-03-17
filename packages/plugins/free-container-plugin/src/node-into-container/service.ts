/* eslint-disable @typescript-eslint/no-non-null-assertion -- no need */
import { throttle } from 'lodash';
import { inject, injectable } from 'inversify';
import {
  type PositionSchema,
  Rectangle,
  type Disposable,
  DisposableCollection,
  Emitter,
} from '@flowgram.ai/utils';
import {
  type NodesDragEvent,
  WorkflowDocument,
  WorkflowDragService,
  WorkflowLinesManager,
  type WorkflowNodeEntity,
  WorkflowNodeMeta,
  WorkflowOperationBaseService,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-core';
import { HistoryService } from '@flowgram.ai/free-history-plugin';
import { FlowNodeTransformData, FlowNodeRenderData } from '@flowgram.ai/document';
import { PlaygroundConfigEntity, TransformData } from '@flowgram.ai/core';

import type { NodeIntoContainerEvent, NodeIntoContainerState } from './type';
import { NodeIntoContainerType } from './constant';

@injectable()
export class NodeIntoContainerService {
  public state: NodeIntoContainerState;

  @inject(WorkflowDragService)
  private dragService: WorkflowDragService;

  @inject(WorkflowDocument)
  private document: WorkflowDocument;

  @inject(PlaygroundConfigEntity)
  private playgroundConfig: PlaygroundConfigEntity;

  @inject(WorkflowOperationBaseService)
  private operationService: WorkflowOperationBaseService;

  @inject(WorkflowLinesManager)
  private linesManager: WorkflowLinesManager;

  @inject(HistoryService) private historyService: HistoryService;

  @inject(WorkflowSelectService) private selectService: WorkflowSelectService;

  private emitter = new Emitter<NodeIntoContainerEvent>();

  private toDispose = new DisposableCollection();

  public readonly on = this.emitter.event;

  public init(): void {
    this.initState();
    this.toDispose.push(this.emitter);
  }

  public ready(): void {
    this.toDispose.push(this.listenDragToContainer());
  }

  public dispose(): void {
    this.initState();
    this.toDispose.dispose();
  }

  /** 移除节点连线 */
  public async removeNodeLines(node: WorkflowNodeEntity): Promise<void> {
    const lines = this.linesManager.getAllLines();
    lines.forEach((line) => {
      if (line.from.id !== node.id && line.to?.id !== node.id) {
        return;
      }
      line.dispose();
    });
    await this.nextFrame();
  }

  /** 将节点移出容器 */
  public async moveOutContainer(params: { node: WorkflowNodeEntity }): Promise<void> {
    const { node } = params;
    const parentNode = node.parent;
    const containerNode = parentNode?.parent;
    const nodeJSON = await this.document.toNodeJSON(node);
    if (
      !parentNode ||
      !containerNode ||
      !this.isContainer(parentNode) ||
      !nodeJSON.meta?.position
    ) {
      return;
    }
    this.operationService.moveNode(node, {
      parent: containerNode,
    });
    const parentTransform = parentNode.getData<TransformData>(TransformData);
    this.operationService.updateNodePosition(node, {
      x: parentTransform.position.x + nodeJSON.meta!.position!.x,
      y: parentTransform.position.y + nodeJSON.meta!.position!.y,
    });
    await this.nextFrame();
    parentTransform.fireChange();
    this.emitter.fire({
      type: NodeIntoContainerType.Out,
      node,
      sourceContainer: parentNode,
      targetContainer: containerNode,
    });
  }

  /** 能否将节点移出容器 */
  public canMoveOutContainer(node: WorkflowNodeEntity): boolean {
    const parentNode = node.parent;
    const containerNode = parentNode?.parent;
    if (!parentNode || !containerNode || !this.isContainer(parentNode)) {
      return false;
    }
    return true;
  }

  /** 初始化状态 */
  private initState(): void {
    this.state = {
      isDraggingNode: false,
      isSkipEvent: false,
      transforms: undefined,
      dragNode: undefined,
      dropNode: undefined,
      sourceParent: undefined,
    };
  }

  /** 监听节点拖拽 */
  private listenDragToContainer(): Disposable {
    const draggingNode = (e: NodesDragEvent) => this.draggingNode(e);
    const throttledDraggingNode = throttle(draggingNode, 200); // 200ms触发一次计算
    return this.dragService.onNodesDrag(async (event) => {
      if (this.selectService.selectedNodes.length !== 1) {
        return;
      }
      if (event.type === 'onDragStart') {
        if (this.state.isSkipEvent) {
          // 拖出容器后重新进入
          this.state.isSkipEvent = false;
          return;
        }
        this.historyService.startTransaction(); // 开始合并历史记录
        this.state.isDraggingNode = true;
        this.state.transforms = this.getContainerTransforms();
        this.state.dragNode = this.selectService.selectedNodes[0];
        this.state.dropNode = undefined;
        this.state.sourceParent = this.state.dragNode?.parent;
        await this.dragOutContainer(event); // 检查是否需拖出容器
      }
      if (event.type === 'onDragging') {
        throttledDraggingNode(event);
      }
      if (event.type === 'onDragEnd') {
        if (this.state.isSkipEvent) {
          // 拖出容器情况下需跳过本次事件
          return;
        }
        throttledDraggingNode.cancel();
        draggingNode(event); // 直接触发一次计算，防止延迟
        await this.dropNodeToContainer(); // 放置节点
        await this.clearInvalidLines(); // 清除非法线条
        this.setDropNode(undefined);
        this.initState(); // 重置状态
        this.historyService.endTransaction(); // 结束合并历史记录
      }
    });
  }

  /** 监听节点拖拽出容器 */
  private async dragOutContainer(event: NodesDragEvent): Promise<void> {
    const { dragNode } = this.state;
    const activated = event.triggerEvent.metaKey || event.triggerEvent.ctrlKey;
    if (
      !activated || // 必须按住指定按键
      !dragNode || // 必须有一个节点
      !this.canMoveOutContainer(dragNode) // 需要能被移出容器
    ) {
      return;
    }
    this.moveOutContainer({ node: dragNode });
    this.state.isSkipEvent = true;
    event.dragger.stop(event.dragEvent.clientX, event.dragEvent.clientY);
    await this.nextFrame();
    this.dragService.startDragSelectedNodes(event.triggerEvent);
  }

  /** 移除节点所有非法连线 */
  private async clearInvalidLines(): Promise<void> {
    const { dragNode, sourceParent } = this.state;
    if (!dragNode) {
      return;
    }
    if (dragNode.parent === sourceParent) {
      return;
    }
    const lines = this.linesManager.getAllLines();
    lines.forEach((line) => {
      if (line.from.id !== dragNode.id && line.to?.id !== dragNode.id) {
        return;
      }
      line.dispose();
    });
    await this.nextFrame();
  }

  /** 获取重叠位置 */
  private getCollisionTransform(params: {
    transforms: FlowNodeTransformData[];
    targetRect?: Rectangle;
    targetPoint?: PositionSchema;
    withPadding?: boolean;
  }): FlowNodeTransformData | undefined {
    const { targetRect, targetPoint, transforms, withPadding = false } = params;
    const collisionTransform = transforms.find((transform) => {
      const { bounds, entity } = transform;
      const padding = withPadding ? this.document.layout.getPadding(entity) : { left: 0, right: 0 };
      const transformRect = new Rectangle(
        bounds.x + padding.left + padding.right,
        bounds.y,
        bounds.width,
        bounds.height
      );
      // 检测两个正方形是否相互碰撞
      if (targetRect) {
        return this.isRectIntersects(targetRect, transformRect);
      }
      if (targetPoint) {
        return this.isPointInRect(targetPoint, transformRect);
      }
      return false;
    });
    return collisionTransform;
  }

  /** 设置放置节点高亮 */
  private setDropNode(dropNode?: WorkflowNodeEntity) {
    if (this.state.dropNode === dropNode) {
      return;
    }
    if (this.state.dropNode) {
      // 清除上一个节点高亮
      const renderData = this.state.dropNode.getData(FlowNodeRenderData);
      const renderDom = renderData.node?.children?.[0] as HTMLElement;
      if (renderDom) {
        renderDom.style.outline = '';
      }
    }
    this.state.dropNode = dropNode;
    if (!dropNode) {
      return;
    }
    // 设置当前节点高亮
    const renderData = dropNode.getData(FlowNodeRenderData);
    const renderDom = renderData.node?.children?.[0] as HTMLElement;
    if (renderDom) {
      renderDom.style.outline = '1px solid var(--coz-stroke-hglt,#4e40e5)';
    }
  }

  /** 获取容器节点transforms */
  private getContainerTransforms(): FlowNodeTransformData[] {
    return this.document
      .getRenderDatas(FlowNodeTransformData, false)
      .filter((transform) => {
        const { entity } = transform;
        if (entity.originParent) {
          return entity.getNodeMeta().selectable && entity.originParent.getNodeMeta().selectable;
        }
        return entity.getNodeMeta().selectable;
      })
      .filter((transform) => this.isContainer(transform.entity));
  }

  /** 放置节点到容器 */
  private async dropNodeToContainer(): Promise<void> {
    const { dropNode, dragNode, isDraggingNode } = this.state;
    if (!isDraggingNode || !dragNode || !dropNode) {
      return;
    }
    return await this.moveIntoContainer({
      node: dragNode,
      containerNode: dropNode,
    });
  }

  /** 拖拽节点 */
  private draggingNode(nodeDragEvent: NodesDragEvent): void {
    const { dragNode, isDraggingNode, transforms } = this.state;
    if (!isDraggingNode || !dragNode || this.isContainer(dragNode) || !transforms?.length) {
      return this.setDropNode(undefined);
    }
    const mousePos = this.playgroundConfig.getPosFromMouseEvent(nodeDragEvent.dragEvent);
    const collisionTransform = this.getCollisionTransform({
      targetPoint: mousePos,
      transforms: this.state.transforms ?? [],
    });
    const dropNode = collisionTransform?.entity;
    if (!dropNode || dragNode.parent?.id === dropNode.id) {
      return this.setDropNode(undefined);
    }
    const canDrop = this.dragService.canDropToNode({
      dragNodeType: dragNode.flowNodeType,
      dropNode,
    });
    if (!canDrop.allowDrop) {
      return this.setDropNode(undefined);
    }
    return this.setDropNode(canDrop.dropNode);
  }

  /** 将节点移入容器 */
  private async moveIntoContainer(params: {
    node: WorkflowNodeEntity;
    containerNode: WorkflowNodeEntity;
  }): Promise<void> {
    const { node, containerNode } = params;
    const parentNode = node.parent;
    const nodeJSON = await this.document.toNodeJSON(node);

    this.operationService.moveNode(node, {
      parent: containerNode,
    });

    this.operationService.updateNodePosition(
      node,
      this.dragService.adjustSubNodePosition(
        nodeJSON.type as string,
        containerNode,
        nodeJSON.meta!.position
      )
    );

    await this.nextFrame();

    this.emitter.fire({
      type: NodeIntoContainerType.In,
      node,
      sourceContainer: parentNode,
      targetContainer: containerNode,
    });
  }

  private isContainer(node?: WorkflowNodeEntity): boolean {
    return node?.getNodeMeta<WorkflowNodeMeta>().isContainer ?? false;
  }

  /** 判断点是否在矩形内 */
  private isPointInRect(point: PositionSchema, rect: Rectangle): boolean {
    return (
      point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom
    );
  }

  /** 判断两个矩形是否相交 */
  private isRectIntersects(rectA: Rectangle, rectB: Rectangle): boolean {
    // 检查水平方向是否有重叠
    const hasHorizontalOverlap = rectA.right > rectB.left && rectA.left < rectB.right;
    // 检查垂直方向是否有重叠
    const hasVerticalOverlap = rectA.bottom > rectB.top && rectA.top < rectB.bottom;
    // 只有当水平和垂直方向都有重叠时,两个矩形才相交
    return hasHorizontalOverlap && hasVerticalOverlap;
  }

  private async nextFrame(): Promise<void> {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}
