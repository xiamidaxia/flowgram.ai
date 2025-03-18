import React, { type FC } from 'react';

import { useNodeRender } from '@flowgram.ai/free-layout-core';
import { FlowNodeTransformData } from '@flowgram.ai/document';

import { ContainerNodeBorderStyle } from './style';

export const ContainerNodeBorder: FC = () => {
  const { node } = useNodeRender();
  const transformData = node.getData(FlowNodeTransformData);
  const topWidth = Math.max(transformData.padding.top - 50, 50);

  return (
    <ContainerNodeBorderStyle
      className="container-node-border"
      style={{
        borderTopWidth: topWidth,
      }}
    />
  );
};
