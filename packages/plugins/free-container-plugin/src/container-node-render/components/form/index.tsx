import React, { type FC } from 'react';

import { useNodeRender } from '@flowgram.ai/free-layout-core';

import { ContainerNodeFormStyle } from './style';

export const ContainerNodeForm: FC = () => {
  const { form } = useNodeRender();
  if (!form) {
    return null;
  }
  return <ContainerNodeFormStyle>{form.render()}</ContainerNodeFormStyle>;
};
