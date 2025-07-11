/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeEntity } from '@flowgram.ai/document';
import { FlowNodeTransformData } from '@flowgram.ai/document';

import { SlotNodeType } from '../typings';

/**
 * Slot 节点是否可下钻，看 inlineBlocks 是否有子节点
 * @param Slot Slot 节点
 */
export const canSlotDrilldown = (Slot: FlowNodeEntity): boolean =>
  !!Slot?.lastCollapsedChild?.blocks.length;

/**
 * 是否是 Slot 内部
 * @param entity
 * @returns
 */
export const insideSlot = (entity?: FlowNodeEntity): boolean =>
  entity?.parent?.flowNodeType === SlotNodeType.SlotPort;

/**
 * 判断是否是 Slot 节点
 * @param entity
 * @returns
 */
export const isSlot = (entity?: FlowNodeEntity): boolean => !!entity?.getNodeMeta().isSlot;

/**
 * 获取在页面上实际渲染的第一个 Child 节点
 * @param node
 */
export const getDisplayFirstChildTransform = (
  transform: FlowNodeTransformData
): FlowNodeTransformData => {
  if (transform.firstChild) {
    return getDisplayFirstChildTransform(transform.firstChild);
  }

  return transform;
};
