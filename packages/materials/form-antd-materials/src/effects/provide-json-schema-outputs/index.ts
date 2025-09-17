/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  ASTFactory,
  EffectOptions,
  FlowNodeRegistry,
  createEffectFromVariableProvider,
} from '@flowgram.ai/editor';

import { JsonSchemaUtils } from '../../utils';
import { IJsonSchema } from '../../typings';

export const provideJsonSchemaOutputs: EffectOptions[] = createEffectFromVariableProvider({
  parse: (value: IJsonSchema, ctx) => [
    ASTFactory.createVariableDeclaration({
      key: `${ctx.node.id}`,
      meta: {
        title: ctx.node.form?.getValueIn('title') || ctx.node.id,
        icon: ctx.node.getNodeRegistry<FlowNodeRegistry>().info?.icon,
      },
      type: JsonSchemaUtils.schemaToAST(value),
    }),
  ],
});
