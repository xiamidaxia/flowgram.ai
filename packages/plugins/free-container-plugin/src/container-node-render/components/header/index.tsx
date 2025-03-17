import React, { ReactNode, type FC } from 'react';

import { useNodeRender } from '@flowgram.ai/free-layout-core';

import { ContainerNodeHeaderStyle } from './style';

interface IContainerNodeHeader {
  children?: ReactNode | ReactNode[];
}

export const ContainerNodeHeader: FC<IContainerNodeHeader> = ({ children }) => {
  const { startDrag, onFocus, onBlur } = useNodeRender();

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
      {children}
    </ContainerNodeHeaderStyle>
  );
};
