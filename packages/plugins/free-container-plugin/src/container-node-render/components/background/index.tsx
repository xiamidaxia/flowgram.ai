import React, { type FC } from 'react';

import { useNodeRender } from '@flowgram.ai/free-layout-core';

import { ContainerNodeBackgroundStyle } from './style';

export const ContainerNodeBackground: FC = () => {
  const { node } = useNodeRender();
  return (
    <ContainerNodeBackgroundStyle
      className="container-node-background"
      data-flow-editor-selectable="true"
    >
      <svg width="100%" height="100%">
        <pattern
          id="container-node-dot-pattern"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" stroke="#eceeef" fillOpacity="0.5" />
        </pattern>
        <rect
          width="100%"
          height="100%"
          fill="url(#container-node-dot-pattern)"
          data-node-panel-container={node.id}
        />
      </svg>
    </ContainerNodeBackgroundStyle>
  );
};
