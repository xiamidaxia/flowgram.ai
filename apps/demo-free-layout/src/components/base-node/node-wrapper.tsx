import React, { useState, useContext } from 'react';

import { WorkflowPortRender } from '@flowgram.ai/free-layout-editor';

import { useNodeRenderContext } from '../../hooks';
import { SidebarContext } from '../../context';

export interface NodeWrapperProps {
  children: React.ReactNode;
}

/**
 * Used for drag-and-drop/click events and ports rendering of nodes
 * 用于节点的拖拽/点击事件和点位渲染
 */
export const NodeWrapper: React.FC<NodeWrapperProps> = (props) => {
  const nodeRender = useNodeRenderContext();
  const { selected, startDrag, ports, selectNode, nodeRef, onFocus, onBlur } = nodeRender;
  const [isDragging, setIsDragging] = useState(false);
  const sidebar = useContext(SidebarContext);

  return (
    <>
      <div
        ref={nodeRef}
        draggable
        onDragStart={(e) => {
          startDrag(e);
          setIsDragging(true);
        }}
        onClick={(e) => {
          selectNode(e);
          if (!isDragging) {
            sidebar.setNodeRender(nodeRender);
          }
        }}
        onMouseUp={() => setIsDragging(false)}
        onFocus={onFocus}
        onBlur={onBlur}
        data-node-selected={String(selected)}
      >
        {props.children}
      </div>
      {ports.map((p) => (
        <WorkflowPortRender key={p.id} entity={p} />
      ))}
    </>
  );
};
