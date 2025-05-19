import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const mindmap: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      data: {
        title: 'Start',
        content: 'start content',
      },
      blocks: [],
    },
    {
      id: 'simpleSplit',
      type: 'simpleSplit',
      data: {
        title: 'split',
      },
      blocks: [
        {
          id: 'branch_0',
          type: 'block',
          data: {
            title: 'Branch 0',
            content: 'branch 1 content',
          },
          blocks: [
            {
              id: 'end_0',
              type: 'end',
              data: {
                title: 'End',
                content: 'end 0',
              },
            },
          ],
        },
        {
          id: 'branch_1',
          type: 'block',
          data: {
            title: 'Branch 1',
            content: 'branch 1 content',
          },
          blocks: [
            {
              id: 'end_1',
              type: 'end',
              data: {
                title: 'End',
                content: 'end 1',
              },
            },
          ],
        },
      ],
    },
  ],
};
