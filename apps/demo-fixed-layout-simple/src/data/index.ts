import { FlowDocumentJSON, FlowLayoutDefault } from '@flowgram.ai/fixed-layout-editor';

import { mindmap } from './mindmap';
import { condition } from './condition';

export const FLOW_LIST: Record<string, FlowDocumentJSON & { defaultLayout?: FlowLayoutDefault }> = {
  condition,
  mindmap: { ...mindmap, defaultLayout: FlowLayoutDefault.HORIZONTAL_FIXED_LAYOUT },
};
