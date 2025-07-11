import { FlowNodeBaseType } from '@flowgram.ai/document';

export enum SlotNodeType {
  Slot = FlowNodeBaseType.SLOT,
  SlotPort = FlowNodeBaseType.SLOT_PORT,
  SlotInlineBlocks = 'slotInlineBlocks',
  SlotPortInlineBlocks = 'slotPortInlineBlocks',
}
