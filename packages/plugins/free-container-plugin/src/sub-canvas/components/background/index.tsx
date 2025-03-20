import React, { type FC } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';

import { SubCanvasBackgroundStyle } from './style';

export const SubCanvasBackground: FC = () => {
  const node = useCurrentEntity();
  return (
    <SubCanvasBackgroundStyle className="sub-canvas-background" data-flow-editor-selectable="true">
      <svg width="100%" height="100%">
        <pattern id="sub-canvas-dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" stroke="#eceeef" fillOpacity="0.5" />
        </pattern>
        <rect
          width="100%"
          height="100%"
          fill="url(#sub-canvas-dot-pattern)"
          data-node-panel-container={node.id}
        />
      </svg>
    </SubCanvasBackgroundStyle>
  );
};
