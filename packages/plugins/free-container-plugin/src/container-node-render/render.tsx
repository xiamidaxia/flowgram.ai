import React, { type FC } from 'react';

import type { ContainerNodeRenderProps } from './type';
import {
  ContainerNodeBackground,
  ContainerNodeHeader,
  ContainerNodePorts,
  ContainerNodeBorder,
  ContainerNodeContainer,
  ContainerNodeForm,
} from './components';

export const ContainerNodeRender: FC<ContainerNodeRenderProps> = () => (
  <ContainerNodeContainer>
    <ContainerNodeBackground />
    <ContainerNodeBorder />
    <ContainerNodeHeader>
      <ContainerNodeForm />
    </ContainerNodeHeader>
    <ContainerNodePorts />
  </ContainerNodeContainer>
);
