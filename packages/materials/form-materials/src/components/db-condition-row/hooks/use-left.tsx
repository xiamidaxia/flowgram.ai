/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';
import React from 'react';

import { JsonSchemaTypeManager, useTypeManager } from '@flowgram.ai/json-schema';
import { Icon } from '@douyinfe/semi-ui';

import { ConditionRow } from '@/components';

import { DBConditionOptionType, IRules } from '../types';
import { UIOptionLabel, UISelect } from '../styles';

const defaultRules = ConditionRow.defaultRules;

interface HookParams {
  left?: string;
  options?: DBConditionOptionType[];
  userRules?: IRules;
  readonly?: boolean;
  onChange: (leftKey: string) => void;
}

export function useLeft({ left, options, userRules, readonly, onChange }: HookParams) {
  const rules = useMemo(() => ({ ...defaultRules, ...(userRules || {}) }), [userRules]);

  const typeManager = useTypeManager() as JsonSchemaTypeManager;

  const rule = useMemo(() => {
    if (!left) return undefined;

    const option = options?.find((item) => item.value === left);

    if (!option?.schema?.type) {
      return undefined;
    }

    return rules[option.schema.type];
  }, [left, options, rules]);

  const renderDBOptionSelect = () => (
    <UISelect
      disabled={readonly}
      size="small"
      style={{ width: '100%' }}
      value={left}
      onChange={(v) => onChange(v as string)}
      optionList={
        options?.map((item) => ({
          label: (
            <UIOptionLabel>
              <Icon size="small" svg={typeManager.getDisplayIcon(item.schema)} />
              {item.label}
            </UIOptionLabel>
          ),
          value: item.value,
        })) || []
      }
    />
  );

  return { rule, renderDBOptionSelect };
}
