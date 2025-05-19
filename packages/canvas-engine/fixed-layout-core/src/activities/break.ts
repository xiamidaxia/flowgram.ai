import { FlowNodeBaseType, type FlowNodeRegistry } from '@flowgram.ai/document';

/**
 * Break 节点, 用于分支断开
 */
export const BreakRegistry: FlowNodeRegistry = {
  type: FlowNodeBaseType.BREAK,
  extend: FlowNodeBaseType.END,
};
