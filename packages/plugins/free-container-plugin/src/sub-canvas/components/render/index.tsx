import React, { CSSProperties, type FC } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';

import { SubCanvasRenderStyle } from './style';
import { SubCanvasTips } from '../tips';
import { SubCanvasBorder } from '../border';
import { SubCanvasBackground } from '../background';
import { useNodeSize, useSyncNodeRenderSize } from '../../hooks';

interface ISubCanvasBorder {
  className?: string;
  style?: CSSProperties;
}

export const SubCanvasRender: FC<ISubCanvasBorder> = ({ className, style }) => {
  const node = useCurrentEntity();
  const nodeSize = useNodeSize();
  const nodeHeight = nodeSize?.height ?? 0;
  const { padding } = node.transform;

  useSyncNodeRenderSize(nodeSize);

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
        <SubCanvasTips />
      </SubCanvasBorder>
    </SubCanvasRenderStyle>
  );
};
