/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy } from 'react';

export const PromptEditor = lazy(() =>
  import('./editor').then((module) => ({ default: module.PromptEditor }))
);

export type { PromptEditorPropsType } from './editor';
