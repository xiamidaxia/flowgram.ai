import { ReactNode } from 'react';

import type { WorkflowNodeEntity } from '@flowgram.ai/free-layout-core';

export interface ContainerNodeMetaRenderProps {
  title: string;
  tooltip?: string;
  renderPorts: {
    id: string;
    type: 'input' | 'output';
    style: React.CSSProperties;
  }[];
  style: React.CSSProperties;
}

export interface ContainerNodeRenderProps {
  node: WorkflowNodeEntity;
  content?: ReactNode;
}
