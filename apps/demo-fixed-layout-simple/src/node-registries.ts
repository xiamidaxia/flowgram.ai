import { nanoid } from 'nanoid';
import {
  FlowNodeRegistry,
  FlowNodeEntity,
  FlowNodeBaseType,
} from '@flowgram.ai/fixed-layout-editor';

/**
 * 自定义节点注册
 */
export const nodeRegistries: FlowNodeRegistry[] = [
  {
    /**
     * 自定义节点类型
     */
    type: 'condition',
    /**
     * 自定义节点扩展:
     *  - loop: 扩展为循环节点
     *  - start: 扩展为开始节点
     *  - dynamicSplit: 扩展为分支节点
     *  - end: 扩展为结束节点
     *  - tryCatch: 扩展为 tryCatch 节点
     *  - break: 分支断开
     *  - default: 扩展为普通节点 (默认)
     */
    extend: 'dynamicSplit',
    /**
     * 节点配置信息
     */
    meta: {
      // isStart: false, // 是否为开始节点
      // isNodeEnd: false, // 是否为结束节点，结束节点后边无法再添加节点
      // draggable: false, // 是否可拖拽，如开始节点和结束节点无法拖拽
      // selectable: false, // 触发器等开始节点不能被框选
      // deleteDisable: true, // 禁止删除
      // copyDisable: true, // 禁止copy
      // addDisable: true, // 禁止添加
    },
    onAdd() {
      return {
        id: `condition_${nanoid(5)}`,
        type: 'condition',
        data: {
          title: 'Condition',
        },
        blocks: [
          {
            id: nanoid(5),
            type: 'block',
            data: {
              title: 'If_0',
            },
          },
          {
            id: nanoid(5),
            type: 'block',
            data: {
              title: 'If_1',
            },
          },
        ],
      };
    },
  },
  {
    type: 'custom',
    meta: {},
    onAdd() {
      return {
        id: `custom_${nanoid(5)}`,
        type: 'custom',
        data: {
          title: 'Custom',
          content: 'this is custom content',
        },
      };
    },
  },
  {
    type: 'multiStart2',
    extend: 'dynamicSplit',
    meta: {
      isStart: true,
    },
    onCreate(node, json) {
      const doc = node.document;
      const addedNodes: FlowNodeEntity[] = [];
      const blocks = json.blocks || [];

      if (blocks.length > 0) {
        // 水平布局
        const inlineBlocksNode = doc.addNode({
          id: `$inlineBlocks$${node.id}`,
          type: FlowNodeBaseType.INLINE_BLOCKS,
          originParent: node,
          parent: node,
        });
        addedNodes.push(inlineBlocksNode);
        blocks.forEach((blockData) => {
          doc.addBlock(node, blockData, addedNodes);
        });
      }
      return addedNodes;
    },
  },
  {
    type: 'tree',
    extend: 'simpleSplit',
  },
];
