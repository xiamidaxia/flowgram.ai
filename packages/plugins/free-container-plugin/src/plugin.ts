import { FlowRendererRegistry } from '@flowgram.ai/renderer';
import { definePluginCreator } from '@flowgram.ai/core';

import type { WorkflowContainerPluginOptions } from './type';
import { NodeIntoContainerService } from './node-into-container';
import { ContainerNodeRenderKey, ContainerNodeRender } from './container-node-render';

export const createContainerNodePlugin = definePluginCreator<WorkflowContainerPluginOptions>({
  onBind: ({ bind }) => {
    bind(NodeIntoContainerService).toSelf().inSingletonScope();
  },
  onInit(ctx) {
    ctx.get(NodeIntoContainerService).init();

    const registry = ctx.get<FlowRendererRegistry>(FlowRendererRegistry);
    registry.registerReactComponent(ContainerNodeRenderKey, ContainerNodeRender);
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
