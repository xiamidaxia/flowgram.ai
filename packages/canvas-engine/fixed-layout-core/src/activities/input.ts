import {
  FlowNodeBaseType,
  type FlowNodeRegistry,
  type FlowTransitionLine,
  FlowTransitionLineEnum,
  LABEL_SIDE_TYPE,
} from '@flowgram.ai/document';

/**
 * 输入节点
 */
export const InputRegistry: FlowNodeRegistry = {
  type: FlowNodeBaseType.INPUT,
  extend: FlowNodeBaseType.BLOCK,
  meta: {
    hidden: false,
  },
  getLines(transition) {
    const currentTransform = transition.transform;
    const { isVertical } = transition.entity;
    const lines: FlowTransitionLine[] = [];

    const hasBranchDraggingAdder =
      currentTransform && currentTransform.entity.isInlineBlock && transition.renderData.draggable;

    // 分支拖拽场景线条 push
    // 当有其余分支的时候，绘制一条两个分支之间的线条
    if (hasBranchDraggingAdder) {
      if (isVertical) {
        const currentOffsetRightX = currentTransform.firstChild?.bounds?.right || 0;
        const nextOffsetLeftX = currentTransform.next?.firstChild?.bounds?.left || 0;
        const currentInputPointY = currentTransform.inputPoint.y;
        if (currentTransform?.next) {
          lines.push({
            type: FlowTransitionLineEnum.DRAGGING_LINE,
            from: currentTransform.parent!.inputPoint,
            to: {
              x: (currentOffsetRightX + nextOffsetLeftX) / 2,
              y: currentInputPointY,
            },
            side: LABEL_SIDE_TYPE.NORMAL_BRANCH,
          });
        }
      } else {
        const currentOffsetRightY = currentTransform.firstChild?.bounds?.bottom || 0;
        const nextOffsetLeftY = currentTransform.next?.firstChild?.bounds?.top || 0;
        const currentInputPointX = currentTransform.inputPoint.x;
        if (currentTransform?.next) {
          lines.push({
            type: FlowTransitionLineEnum.DRAGGING_LINE,
            from: currentTransform.parent!.inputPoint,
            to: {
              x: currentInputPointX,
              y: (currentOffsetRightY + nextOffsetLeftY) / 2,
            },
            side: LABEL_SIDE_TYPE.NORMAL_BRANCH,
          });
        }
      }
    }

    // 最后一个节点是 end 节点，不绘制 mergeLine
    if (!transition.isNodeEnd) {
      lines.push({
        type: FlowTransitionLineEnum.MERGE_LINE,
        from: currentTransform.outputPoint,
        to: currentTransform.parent!.outputPoint,
        side: LABEL_SIDE_TYPE.NORMAL_BRANCH,
      });
    }

    return lines;
  },
  getLabels() {
    return [];
  },
};
