/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { WorkflowNodeEntity } from '@flowgram.ai/free-layout-core';

export type StackingContext = {
  hoveredEntityID?: string;
  selectedNodes: WorkflowNodeEntity[];
  selectedIDs: Set<string>;
};
