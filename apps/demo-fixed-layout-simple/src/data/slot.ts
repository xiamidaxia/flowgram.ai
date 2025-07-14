/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const slot: FlowDocumentJSON = {
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
    {
      id: 'slot_0',
      type: 'slot',
      data: {
        title: 'Slot',
        content: 'Slot content',
      },
      blocks: [
        {
          id: 'slot_0',
          type: 'slotBlock',
          data: {
            title: 'Slot 0',
            content: 'slot 1 content',
          },
          blocks: [
            {
              id: 'custom_0',
              type: 'custom',
              data: {
                title: 'Custom',
                content: 'custom content',
              },
            },
          ],
        },
        {
          id: 'slot_1',
          type: 'slotBlock',
          data: {
            title: 'Slot 1',
            content: 'slot 1 content',
          },
          blocks: [
            {
              id: 'custom_1',
              type: 'custom',
              data: {
                title: 'Custom',
                content: 'custom content',
              },
            },
          ],
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
