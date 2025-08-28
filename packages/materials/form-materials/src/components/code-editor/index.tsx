/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy } from 'react';

export const CodeEditor = lazy(() =>
  import('./editor').then((module) => ({ default: module.CodeEditor }))
);

export type { CodeEditorPropsType } from './editor';
