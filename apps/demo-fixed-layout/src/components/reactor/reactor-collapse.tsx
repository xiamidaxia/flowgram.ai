/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from 'react';

import {
  type FlowNodeEntity,
  FlowNodeRenderData,
  FlowNodeTransformData,
} from '@flow-ide-editor/fixed-layout-editor';

import Collapse from '../collapse';

export function ReactorCollapse({ reactor }: { reactor: FlowNodeEntity }) {
  const [hoverActivated, setHoverActivated] = useState(false);

  const icon = reactor.firstChild!;
  const iconActivated = icon.getData(FlowNodeRenderData).activated;
  const iconHeight = icon.getData(FlowNodeTransformData).size.height;

  const isChildVisible = reactor.collapsed || hoverActivated || iconActivated;

  return (
    <div
      style={{
        width: 30,
        height: iconHeight || 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={() => setHoverActivated(true)}
      onMouseLeave={() => setHoverActivated(false)}
    >
      {isChildVisible && (
        <Collapse
          node={reactor}
          activateNode={icon}
          collapseNode={reactor}
          arrowDirection="left"
          hoverActivated={hoverActivated}
        />
      )}
    </div>
  );
}
