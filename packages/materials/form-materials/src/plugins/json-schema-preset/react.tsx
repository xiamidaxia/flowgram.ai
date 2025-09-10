/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import {
  type IJsonSchema,
  useTypeManager as useOriginTypeManager,
  TypePresetProvider as OriginTypePresetProvider,
  JsonSchemaTypeManager,
} from '@flowgram.ai/json-schema';

import { jsonSchemaTypePreset } from './type-definition';
import { type JsonSchemaTypeRegistry } from './manager';

export const useTypeManager = () =>
  useOriginTypeManager() as JsonSchemaTypeManager<IJsonSchema, JsonSchemaTypeRegistry>;

export const JsonSchemaTypePresetProvider = ({
  types = [],
  children,
}: React.PropsWithChildren<{ types: JsonSchemaTypeRegistry[] }>) => (
  <OriginTypePresetProvider types={[...jsonSchemaTypePreset, ...types]}>
    {children}
  </OriginTypePresetProvider>
);
