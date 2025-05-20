import { FlowNodeBaseType, type FlowNodeRegistry, FlowNodeSplitType } from '@flowgram.ai/document';

import { BlockRegistry } from './block';

/**
 * 多输出节点
 * - multiOutputs:
 *  - blockIcon
 *  - inlineBlocks
 *    - output or multiOutputs
 *    - output or multiOutputs
 */
export const MultiOuputsRegistry: FlowNodeRegistry = {
  type: FlowNodeBaseType.MULTI_OUTPUTS,
  extend: FlowNodeSplitType.SIMPLE_SPLIT,
  getLines: (transition, layout) => {
    if (transition.entity.parent?.flowNodeType === FlowNodeBaseType.INLINE_BLOCKS) {
      return BlockRegistry.getLines!(transition, layout);
    }
    return [];
  },
};
