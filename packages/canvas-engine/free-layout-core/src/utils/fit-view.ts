/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type PlaygroundConfigEntity } from '@flowgram.ai/core';

import { type WorkflowDocument } from '../workflow-document';

export const fitView = (
  doc: WorkflowDocument,
  playgroundConfig: PlaygroundConfigEntity,
  easing = true
) =>
  // 留出 30 像素的边界
  playgroundConfig.fitView(doc.root.bounds, easing, 30);
