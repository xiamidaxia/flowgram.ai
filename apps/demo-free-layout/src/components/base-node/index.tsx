import { useCallback } from 'react';

import {
  FlowNodeEntity,
  useNodeRender,
  WorkflowNodeRenderer,
} from '@flowgram.ai/free-layout-editor';
import { ConfigProvider } from '@douyinfe/semi-ui';

import { NodeRenderContext } from '../../context';
import './index.css';
import { ErrorIcon } from './error-icon';

export const BaseNode = ({ node }: { node: FlowNodeEntity }) => {
  /**
   * Provides methods related to node rendering
   * 提供节点渲染相关的方法
   */
  const nodeRender = useNodeRender();
  /**
   * It can only be used when nodeEngine is enabled
   * 只有在节点引擎开启时候才能使用表单
   */
  const form = nodeRender.form;

  /**
   * Used to make the Tooltip scale with the node, which can be implemented by itself depending on the UI library
   * 用于让 Tooltip 跟随节点缩放, 这个可以根据不同的 ui 库自己实现
   */
  const getPopupContainer = useCallback(() => node.renderData.node || document.body, []);

  return (
    <WorkflowNodeRenderer
      className={`flowgram-node-render ${nodeRender.selected ? 'selected' : ''}`}
      node={node}
      style={{
        borderRadius: 8,
        outline: form?.state.invalid ? '1px solid red' : 'none',
      }}
    >
      {form?.state.invalid && <ErrorIcon />}
      <NodeRenderContext.Provider value={nodeRender}>
        <ConfigProvider getPopupContainer={getPopupContainer}>{form?.render()}</ConfigProvider>
      </NodeRenderContext.Provider>
    </WorkflowNodeRenderer>
  );
};
