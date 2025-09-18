/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { useBaseColor } from '../hooks/use-base-color';

export const MARK_ACTIVATED_ARROW_ID = '$marker_arrow_activated$';
// export const MARK_ACTIVATED_ARROW_URL = `url(#${MARK_ACTIVATED_ARROW_ID})`;

function MarkerActivatedArrow(props: { id?: string }): JSX.Element {
  const { baseActivatedColor } = useBaseColor();
  return (
    <marker
      data-line-id={props.id}
      id={props.id || MARK_ACTIVATED_ARROW_ID}
      markerWidth="6"
      markerHeight="10"
      width="6"
      height="10"
      orient="auto"
      refX="5"
      refY="5"
    >
      <path
        d="M1 1L4.58132 4.72268C4.7303 4.87755 4.7303 5.12245 4.58132 5.27732L1 9"
        stroke={baseActivatedColor}
        fill="none"
        strokeLinecap="round"
      />
    </marker>
  );
}

// version 变化才触发组件更新
export default MarkerActivatedArrow;
