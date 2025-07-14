/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';

import { defaultFormMeta } from '../default-form-meta';
import { FlowNodeRegistry } from '../../typings';
import iconTool from '../../assets/icon-tool.svg';

let index = 0;
export const ToolNodeRegistry: FlowNodeRegistry = {
  type: 'tool',
  info: {
    icon: iconTool,
    description: 'Tool.',
  },
  meta: {
    addDisable: true,
    deleteDisable: true, // memory 不能单独删除，只能通过 agent
    copyDisable: true,
    draggable: false,
  },
  formMeta: defaultFormMeta,
  onAdd() {
    return {
      id: `tool${nanoid(5)}`,
      type: 'tool',
      data: {
        title: `Tool_${++index}`,
      },
    };
  },
};
