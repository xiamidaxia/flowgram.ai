import { useCallback } from 'react';

import {
  FlowNodeEntity,
  useNodeRender,
  WorkflowNodeRenderer,
} from '@flowgram.ai/free-layout-editor';
import { ConfigProvider } from '@douyinfe/semi-ui';

import { NodeRenderContext } from '../../context';
import { BaseNodeStyle, ErrorIcon } from './styles';

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
    <ConfigProvider getPopupContainer={getPopupContainer}>
      <WorkflowNodeRenderer node={node}>
        {form?.state.invalid && <ErrorIcon />}
        <BaseNodeStyle
          className={nodeRender.selected ? 'selected' : ''}
          style={{
            outline: form?.state.invalid ? '1px solid red' : 'none',
          }}
        >
          <NodeRenderContext.Provider value={{}}>{form?.render()}</NodeRenderContext.Provider>
        </BaseNodeStyle>
      </WorkflowNodeRenderer>
    </ConfigProvider>
  );
};
