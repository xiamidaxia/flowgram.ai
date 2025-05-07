import { useLayoutEffect } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';

import { NodeSize } from './use-node-size';

export const useSyncNodeRenderSize = (nodeSize?: NodeSize) => {
  const node = useCurrentEntity();

  useLayoutEffect(() => {
    if (!nodeSize) {
      return;
    }
    node.renderData.node.style.width = nodeSize.width + 'px';
    node.renderData.node.style.height = nodeSize.height + 'px';
  }, [nodeSize?.width, nodeSize?.height]);
};
