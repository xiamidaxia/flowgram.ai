import { WorkflowNodeEntity, WorkflowNodeMeta } from '@flowgram.ai/free-layout-core';

/** 是否容器节点 */
export const isContainer = (node?: WorkflowNodeEntity): boolean =>
  node?.getNodeMeta<WorkflowNodeMeta>().isContainer ?? false;
