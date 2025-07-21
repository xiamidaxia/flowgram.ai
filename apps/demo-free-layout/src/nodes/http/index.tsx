/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';
import { createInferInputsPlugin } from '@flowgram.ai/form-materials';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconHTTP from '../../assets/icon-http.svg';
import { FormRender } from './form-render';
import { defaultFormMeta } from '../default-form-meta';
let index = 0;

export const HTTPNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.HTTP,
  info: {
    icon: iconHTTP,
    description: 'Call the HTTP API',
  },
  meta: {
    size: {
      width: 360,
      height: 390,
    },
  },
  onAdd() {
    return {
      id: `http_${nanoid(5)}`,
      type: 'http',
      data: {
        title: `HTTP_${++index}`,
        api: {
          method: 'GET',
        },
        body: {
          bodyType: 'JSON',
        },
        headers: {},
        params: {},
        outputs: {
          type: 'object',
          properties: {
            body: { type: 'string' },
            headers: { type: 'object' },
            statusCode: { type: 'integer' },
          },
        },
      },
    };
  },
  formMeta: {
    render: (props) => <FormRender {...props} />,
    effect: defaultFormMeta.effect,
    plugins: [
      createInferInputsPlugin({ sourceKey: 'headersValues', targetKey: 'headers' }),
      createInferInputsPlugin({ sourceKey: 'paramsValues', targetKey: 'params' }),
    ],
  },
};
