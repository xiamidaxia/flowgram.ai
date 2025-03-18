import React from 'react';

import { FlowRendererRegistry } from '@flowgram.ai/renderer';
import { definePluginCreator } from '@flowgram.ai/core';

import type { WorkflowContainerPluginOptions } from './type';
import { NodeIntoContainerService } from './node-into-container';
import {
  ContainerNodeRenderKey,
  ContainerNodeRender,
  ContainerNodeRenderProps,
} from './container-node-render';

export const createContainerNodePlugin = definePluginCreator<WorkflowContainerPluginOptions>({
  onBind: ({ bind }) => {
    bind(NodeIntoContainerService).toSelf().inSingletonScope();
  },
  onInit(ctx, options) {
    ctx.get(NodeIntoContainerService).init();

    const registry = ctx.get<FlowRendererRegistry>(FlowRendererRegistry);
    registry.registerReactComponent(ContainerNodeRenderKey, (props: ContainerNodeRenderProps) => (
      <ContainerNodeRender {...props} content={options.renderContent} />
    ));
  },
  onReady(ctx, options) {
    if (options.disableNodeIntoContainer !== true) {
      ctx.get(NodeIntoContainerService).ready();
    }
  },
  onDispose(ctx) {
    ctx.get(NodeIntoContainerService).dispose();
  },
});
