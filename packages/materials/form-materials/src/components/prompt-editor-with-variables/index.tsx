/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy } from 'react';

export const PromptEditorWithVariables = lazy(() =>
  import('./editor').then((module) => ({ default: module.PromptEditorWithVariables }))
);

export type { PromptEditorWithVariablesProps } from './editor';
