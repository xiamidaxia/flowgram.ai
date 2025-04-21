import { WorkflowDocument, WorkflowContentChangeType } from '@flowgram.ai/free-layout-core';
import { type FlowNodeEntity } from '@flowgram.ai/document';

import {
  type ContentChangeTypeToOperation,
  FreeOperationType,
  type DeleteWorkflowNodeOperation,
} from '../types';
import { FreeHistoryConfig } from '../free-history-config';

export const deleteNodeChange: ContentChangeTypeToOperation<DeleteWorkflowNodeOperation> = {
  type: WorkflowContentChangeType.DELETE_NODE,
  toOperation: (event, ctx) => {
    const config = ctx.get<FreeHistoryConfig>(FreeHistoryConfig);
    const document = ctx.get<WorkflowDocument>(WorkflowDocument);
    const node = event.entity as FlowNodeEntity;
    const json = document.toNodeJSON(node);
    const parentID = node.parent?.id;

    return {
      type: FreeOperationType.deleteNode,
      value: {
        node: json,
        parentID,
      },
      uri: config.getNodeURI(node.id),
    };
  },
};
