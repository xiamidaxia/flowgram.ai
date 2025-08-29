/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazySuspense } from '@/shared';

export const CodeEditor = lazySuspense(() =>
  import('./editor').then((module) => ({ default: module.CodeEditor }))
);

export type { CodeEditorPropsType } from './editor';
