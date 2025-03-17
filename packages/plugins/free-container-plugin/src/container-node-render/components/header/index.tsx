import React, { type FC } from 'react';

import { useNodeRender } from '@flowgram.ai/free-layout-core';

import { useContainerNodeRenderProps } from '../../hooks';
import { ContainerNodeHeaderStyle } from './style';

export const ContainerNodeHeader: FC = () => {
  const { startDrag, onFocus, onBlur } = useNodeRender();

  const { title } = useContainerNodeRenderProps();

  return (
    <ContainerNodeHeaderStyle
      className="container-node-header"
      draggable={true}
      onMouseDown={(e) => {
        startDrag(e);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <p className="container-node-title">{title}</p>
    </ContainerNodeHeaderStyle>
  );
};
