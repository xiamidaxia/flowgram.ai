import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const tryCatch: FlowDocumentJSON = {
  nodes: [
    // 开始节点
    {
      id: 'start_0',
      type: 'start',
      data: {
        title: 'Start',
        content: 'start content',
      },
      blocks: [],
    },
    // 分支节点
    {
      id: 'tryCatch_0',
      type: 'tryCatch',
      data: {
        title: 'TryCatch',
      },
      blocks: [
        {
          id: 'tryBlock_0',
          type: 'tryBlock',
          blocks: [],
        },
        {
          id: 'catchBlock_0',
          type: 'catchBlock',
          data: {
            title: 'Catch Block 1',
          },
          blocks: [],
        },
        {
          id: 'catchBlock_1',
          type: 'catchBlock',
          data: {
            title: 'Catch Block 2',
          },
          blocks: [],
        },
      ],
    },
    // 结束节点
    {
      id: 'end_0',
      type: 'end',
      data: {
        title: 'End',
        content: 'end content',
      },
    },
  ],
};
