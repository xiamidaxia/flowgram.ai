/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema } from '@flowgram.ai/json-schema';

import { IFlowConstantRefValue } from '@/typings';

export interface OpConfig {
  label: string;
  abbreviation: string;
  // When right is not a value, display this text
  rightDisplay?: string;
}

export type OpConfigs = Record<string, OpConfig>;

export type IRule = Partial<Record<string, string | null>>;

export type IRules = Record<string, IRule>;

export interface DBConditionRowValueType {
  left?: string;
  schema?: IJsonSchema;
  operator?: string;
  right?: IFlowConstantRefValue;
}

export interface DBConditionOptionType {
  label: string | JSX.Element;
  value: string;
  schema: IJsonSchema;
}
