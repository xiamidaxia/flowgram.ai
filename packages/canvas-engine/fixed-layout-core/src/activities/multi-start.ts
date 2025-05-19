import { FlowNodeBaseType, type FlowNodeRegistry } from '@flowgram.ai/document';

/**
 * 多输入的开始节点
 */
export const MultiStartRegistry: FlowNodeRegistry = {
  type: FlowNodeBaseType.MULTI_START,
  extend: FlowNodeBaseType.START,
};
