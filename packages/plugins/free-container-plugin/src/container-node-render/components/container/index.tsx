import React, { useEffect, useState, type FC, type ReactNode } from 'react';

import { useNodeRender, WorkflowNodePortsData } from '@flowgram.ai/free-layout-core';
import { FlowNodeTransformData } from '@flowgram.ai/document';

import { useContainerNodeRenderProps } from '../../hooks';
import { ContainerNodeContainerStyle } from './style';

interface IContainerNodeContainer {
  children: ReactNode | ReactNode[];
}

export const ContainerNodeContainer: FC<IContainerNodeContainer> = ({ children }) => {
  const { node, selected, selectNode, nodeRef } = useNodeRender();
  const nodeMeta = node.getNodeMeta();
  const { size = { width: 300, height: 200 } } = nodeMeta;
  const { style = {} } = useContainerNodeRenderProps();

  const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
  const [width, setWidth] = useState(size.width);
  const [height, setHeight] = useState(size.height);

  const updatePorts = () => {
    const portsData = node.getData<WorkflowNodePortsData>(WorkflowNodePortsData);
    portsData.updateDynamicPorts();
  };

  const updateSize = () => {
    // 无子节点时
    if (node.blocks.length === 0) {
      setWidth(size.width);
      setHeight(size.height);
      return;
    }
    // 存在子节点时，只监听宽高变化
    setWidth(transform.bounds.width);
    setHeight(transform.bounds.height);
  };

  useEffect(() => {
    const dispose = transform.onDataChange(() => {
      updateSize();
      updatePorts();
    });
    return () => dispose.dispose();
  }, [transform, width, height]);

  useEffect(() => {
    // 初始化触发一次
    updateSize();
  }, []);

  return (
    <ContainerNodeContainerStyle
      className="container-node-container"
      style={{
        width,
        height,
        outline: selected ? '1px solid var(--coz-stroke-hglt, #4E40E5)' : '',
        ...style,
      }}
      ref={nodeRef}
      data-node-selected={String(selected)}
      onMouseDown={selectNode}
      onClick={(e) => {
        selectNode(e);
      }}
    >
      {children}
    </ContainerNodeContainerStyle>
  );
};
