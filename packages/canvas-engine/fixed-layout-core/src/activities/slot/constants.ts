/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowRendererKey } from '@flowgram.ai/renderer';

export const RENDER_SLOT_PORT_KEY = FlowRendererKey.SLOT_PORT_RENDER;
export const RENDER_SLOT_COLLAPSE_KEY = FlowRendererKey.SLOT_COLLPASE_RENDER;

export const SLOT_PORT_DISTANCE = 60;
export const SLOT_COLLAPSE_MARGIN = 20;
export const SLOT_SPACING = 32;

export const SLOT_NODE_LAST_SPACING = 10;

export const SLOT_INLINE_BLOCKS_DELTA = SLOT_COLLAPSE_MARGIN + SLOT_PORT_DISTANCE * 2;
