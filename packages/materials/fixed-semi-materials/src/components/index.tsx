/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowRendererKey } from '@flowgram.ai/fixed-layout-editor';

import { Ellipse } from '../assets';
import TryCatchCollapse from './try-catch-collapse';
import { SlotLabel } from './slot-label';
import { SlotCollapse } from './slot-collapse';
import DraggingAdder from './dragging-adder';
import DragNode from './drag-node';
import DragHighlightAdder from './drag-highlight-adder';
import Collapse from './collapse';
import BranchAdder from './branch-adder';
import Adder from './adder';

export const defaultFixedSemiMaterials = {
  [FlowRendererKey.ADDER]: Adder,
  [FlowRendererKey.COLLAPSE]: Collapse,
  [FlowRendererKey.TRY_CATCH_COLLAPSE]: TryCatchCollapse,
  [FlowRendererKey.BRANCH_ADDER]: BranchAdder,
  [FlowRendererKey.DRAG_NODE]: DragNode,
  [FlowRendererKey.DRAGGABLE_ADDER]: DraggingAdder,
  [FlowRendererKey.DRAG_HIGHLIGHT_ADDER]: DragHighlightAdder,
  [FlowRendererKey.DRAG_BRANCH_HIGHLIGHT_ADDER]: Ellipse,
  [FlowRendererKey.SLOT_COLLPASE_RENDER]: SlotCollapse,
  [FlowRendererKey.SLOT_LABEL_RENDER]: SlotLabel,
};
