/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy } from 'react';

export const JsonEditorWithVariables = lazy(() =>
  import('./editor').then((module) => ({ default: module.JsonEditorWithVariables }))
);

export type { JsonEditorWithVariablesProps } from './editor';
