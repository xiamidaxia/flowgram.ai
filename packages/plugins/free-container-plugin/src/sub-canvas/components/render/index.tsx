import React, { CSSProperties, useLayoutEffect, type FC } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';

import { SubCanvasRenderStyle } from './style';
import { SubCanvasBorder } from '../border';
import { SubCanvasBackground } from '../background';
import { useNodeSize } from '../../hooks';

interface ISubCanvasBorder {
  className?: string;
  style?: CSSProperties;
}

export const SubCanvasRender: FC<ISubCanvasBorder> = ({ className, style }) => {
  const node = useCurrentEntity();
  const nodeSize = useNodeSize();
  const { height, width } = nodeSize ?? {};
  const nodeHeight = nodeSize?.height ?? 0;
  const { padding } = node.transform;

  useLayoutEffect(() => {
    node.renderData.node.style.width = width + 'px';
    node.renderData.node.style.height = height + 'px';
  }, [height, width]);

  return (
    <SubCanvasRenderStyle
      className={`sub-canvas-render ${className ?? ''}`}
      style={{
        height: nodeHeight - padding.top,
        ...style,
      }}
      data-flow-editor-selectable="true"
      onDragStart={(e) => {
        e.stopPropagation();
      }}
    >
      <SubCanvasBorder>
        <SubCanvasBackground />
      </SubCanvasBorder>
    </SubCanvasRenderStyle>
  );
};
