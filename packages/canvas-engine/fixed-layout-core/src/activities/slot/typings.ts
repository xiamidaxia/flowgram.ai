/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeBaseType } from '@flowgram.ai/document';

export enum SlotNodeType {
  Slot = FlowNodeBaseType.SLOT,
  SlotPort = FlowNodeBaseType.SLOT_PORT,
  SlotInlineBlocks = 'slotInlineBlocks',
  SlotPortInlineBlocks = 'slotPortInlineBlocks',
}
