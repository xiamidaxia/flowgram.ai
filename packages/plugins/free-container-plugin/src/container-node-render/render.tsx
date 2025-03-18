import React, { type FC } from 'react';

import type { ContainerNodeRenderProps } from './type';
import {
  ContainerNodeBackground,
  ContainerNodeHeader,
  ContainerNodePorts,
  ContainerNodeBorder,
  ContainerNodeContainer,
} from './components';

export const ContainerNodeRender: FC<ContainerNodeRenderProps> = ({ content }) => (
  <ContainerNodeContainer>
    <ContainerNodeBackground />
    <ContainerNodeBorder />
    <ContainerNodeHeader>{content}</ContainerNodeHeader>
    <ContainerNodePorts />
  </ContainerNodeContainer>
);
