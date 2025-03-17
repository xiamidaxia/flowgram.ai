import React from 'react';

interface INodeRenderContext {}

/** 业务自定义节点上下文 */
export const NodeRenderContext = React.createContext<INodeRenderContext>({});
