import { FC } from 'react';

export interface WorkflowGroupPluginOptions {
  groupNodeRender: FC;
  disableGroupShortcuts?: boolean;
  disableGroupNodeRegister?: boolean;
}
