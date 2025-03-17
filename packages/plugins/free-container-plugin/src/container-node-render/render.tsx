import React, { type FC } from 'react';

import type { ContainerNodeRenderProps } from './type';
import {
  ContainerNodeBackground,
  ContainerNodeHeader,
  ContainerNodePorts,
  ContainerNodeBorder,
  ContainerNodeContainer,
} from './components';

export const ContainerNodeRender: FC<ContainerNodeRenderProps> = (props) => (
  <ContainerNodeContainer>
    <ContainerNodeBorder />
    <ContainerNodeBackground />
    <ContainerNodeHeader />
    <ContainerNodePorts />
  </ContainerNodeContainer>
);
