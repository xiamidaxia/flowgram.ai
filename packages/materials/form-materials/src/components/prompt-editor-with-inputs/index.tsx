/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy } from 'react';

export const PromptEditorWithInputs = lazy(() =>
  import('./editor').then((module) => ({ default: module.PromptEditorWithInputs }))
);

export type { PromptEditorWithInputsProps } from './editor';
