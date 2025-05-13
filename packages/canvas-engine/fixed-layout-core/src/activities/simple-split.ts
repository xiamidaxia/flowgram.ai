import {
  type FlowNodeRegistry,
  FlowNodeSplitType,
  FlowNodeBaseType,
  FlowNodeJSON,
  FlowNodeEntity,
} from '@flowgram.ai/document';

/**
 * 可以动态添加分支的分支节点, 无 BlockOrderIcon 节点
 * simpleSplit:  (最原始的 id)
 *  blockIcon
 *  inlineBlocks
 *    block1
 *    block2
 */
export const SimpleSplitRegistry: FlowNodeRegistry = {
  type: FlowNodeSplitType.SIMPLE_SPLIT,
  extend: FlowNodeSplitType.DYNAMIC_SPLIT,
  onBlockChildCreate(
    originParent: FlowNodeEntity,
    blockData: FlowNodeJSON,
    addedNodes: FlowNodeEntity[] = [] // 新创建的节点都要存在这里
  ) {
    const { document } = originParent;
    const parent = document.getNode(`$inlineBlocks$${originParent.id}`);
    // 块节点会生成一个空的 Block 节点用来切割 Block
    const proxyBlock = document.addNode({
      id: `$block$${blockData.id}`,
      type: FlowNodeBaseType.BLOCK,
      originParent,
      parent,
    });
    const realBlock = document.addNode(
      {
        ...blockData,
        type: blockData.type || FlowNodeBaseType.BLOCK,
        parent: proxyBlock,
      },
      addedNodes
    );
    addedNodes.push(proxyBlock, realBlock);
    return proxyBlock;
  },
  // addChild(node, json, options = {}) {
  //   const { index } = options;
  //   const document = node.document;
  //   return document.addBlock(node, json, undefined, undefined, index);
  // }
};
