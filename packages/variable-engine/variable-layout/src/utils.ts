import { FlowNodeEntity } from '@flowgram.ai/document';

import { FlowNodeVariableData } from './flow-node-variable-data';

export function getNodeScope(node: FlowNodeEntity) {
  return node.getData(FlowNodeVariableData).public;
}

export function getNodePrivateScope(node: FlowNodeEntity) {
  return node.getData(FlowNodeVariableData).initPrivate();
}
