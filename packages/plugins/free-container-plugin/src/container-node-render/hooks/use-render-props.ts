import { useNodeRender } from '@flowgram.ai/free-layout-core';

import { type ContainerNodeMetaRenderProps } from '../type';

export const useContainerNodeRenderProps = (): ContainerNodeMetaRenderProps => {
  const { node } = useNodeRender();
  const nodeMeta = node.getNodeMeta();

  const {
    title = '',
    tooltip,
    renderPorts = [],
    style = {},
  } = (nodeMeta?.renderContainerNode?.() ?? {}) as Partial<ContainerNodeMetaRenderProps>;

  return {
    title,
    tooltip,
    renderPorts,
    style,
  };
};
