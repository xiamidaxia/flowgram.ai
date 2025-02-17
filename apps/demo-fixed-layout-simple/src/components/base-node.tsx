import { FlowNodeEntity, useNodeRender } from '@flowgram.ai/fixed-layout-editor';

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

  return (
    <div
      className="demo-fixed-node"
      onMouseEnter={nodeRender.onMouseEnter}
      onMouseLeave={nodeRender.onMouseLeave}
      onMouseDown={e => {
        // trigger drag node
        nodeRender.startDrag(e);
        e.stopPropagation();
      }}
      style={{
        ...(nodeRender.isBlockOrderIcon || nodeRender.isBlockIcon ? { width: 260 } : {}),
      }}
    >
      {form?.render()}
    </div>
  );
};
