import React, { useEffect, type FC } from 'react';

import { WorkflowPortRender } from '@flowgram.ai/free-lines-plugin';
import { WorkflowNodePortsData, useNodeRender } from '@flowgram.ai/free-layout-core';

import { useContainerNodeRenderProps } from '../../hooks';

export const ContainerNodePorts: FC = () => {
  const { node, ports } = useNodeRender();
  const { renderPorts } = useContainerNodeRenderProps();

  useEffect(() => {
    const portsData = node.getData<WorkflowNodePortsData>(WorkflowNodePortsData);
    portsData.updateDynamicPorts();
  }, [node]);

  return (
    <>
      {renderPorts.map((p) => (
        <div
          key={`canvas-port${p.id}`}
          className="container-node-port"
          data-port-id={p.id}
          data-port-type={p.type}
          style={p.style}
        />
      ))}
      {ports.map((p) => (
        <WorkflowPortRender key={p.id} entity={p} />
      ))}
    </>
  );
};
