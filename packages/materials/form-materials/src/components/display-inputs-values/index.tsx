/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IFlowValue } from '@/typings';
import { DisplayFlowValue } from '@/components/display-flow-value';

import { DisplayInputsWrapper } from './styles';

interface PropsType {
  value?: Record<string, IFlowValue | undefined>;
  showIconInTree?: boolean;
}

export function DisplayInputsValues({ value, showIconInTree }: PropsType) {
  const childEntries = Object.entries(value || {});

  return (
    <DisplayInputsWrapper>
      {childEntries.map(([key, value]) => (
        <DisplayFlowValue key={key} title={key} value={value} showIconInTree={showIconInTree} />
      ))}
    </DisplayInputsWrapper>
  );
}
