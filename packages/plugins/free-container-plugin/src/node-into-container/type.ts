import type { WorkflowNodeEntity } from '@flowgram.ai/free-layout-core';
import type { FlowNodeTransformData } from '@flowgram.ai/document';

import type { NodeIntoContainerType } from './constant';

export interface NodeIntoContainerState {
  isDraggingNode: boolean;
  isSkipEvent: boolean;
  transforms?: FlowNodeTransformData[];
  dragNode?: WorkflowNodeEntity;
  dropNode?: WorkflowNodeEntity;
  sourceParent?: WorkflowNodeEntity;
}

export interface NodeIntoContainerEvent {
  type: NodeIntoContainerType;
  node: WorkflowNodeEntity;
  sourceContainer?: WorkflowNodeEntity;
  targetContainer: WorkflowNodeEntity;
}
