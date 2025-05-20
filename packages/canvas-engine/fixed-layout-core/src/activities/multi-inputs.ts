import { FlowNodeBaseType, FlowNodeSplitType, type FlowNodeRegistry } from '@flowgram.ai/document';

/**
 * 多输入节点, 只能作为 开始节点
 * - multiInputs:
 *   - inlineBlocks
 *     - input
 *     - input
 */
export const MultiInputsRegistry: FlowNodeRegistry = {
  type: FlowNodeBaseType.MULTI_INPUTS,
  extend: FlowNodeSplitType.SIMPLE_SPLIT,
  extendChildRegistries: [
    {
      type: FlowNodeBaseType.BLOCK_ICON,
      meta: {
        hidden: true,
      },
      getLines() {
        return [];
      },
      getLabels() {
        return [];
      },
    },
    {
      type: FlowNodeBaseType.INLINE_BLOCKS,
      getLabels() {
        return [];
      },
    },
  ],
  getLabels() {
    return [];
  },
};
