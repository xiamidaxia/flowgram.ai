import { useNodeRender } from '@flowgram.ai/free-layout-editor';
import { ContainerNodeForm } from '@flowgram.ai/free-container-plugin';

import { NodeRenderContext } from '../../context';

export const ContainerNodeContent = () => {
  const nodeRender = useNodeRender();

  return (
    <NodeRenderContext.Provider value={nodeRender}>
      <ContainerNodeForm />;
    </NodeRenderContext.Provider>
  );
};
