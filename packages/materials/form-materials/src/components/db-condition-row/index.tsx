/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { I18n } from '@flowgram.ai/editor';
import { Input } from '@douyinfe/semi-ui';

import { InjectDynamicValueInput } from '@/components/dynamic-value-input';

import { DBConditionOptionType, DBConditionRowValueType, IRules, OpConfigs } from './types';
import { UIContainer, UILeft, UIOperator, UIRight, UIValues } from './styles';
import { useOp } from './hooks/use-op';
import { useLeft } from './hooks/use-left';

interface PropTypes {
  value?: DBConditionRowValueType;
  onChange: (value?: DBConditionRowValueType) => void;
  style?: React.CSSProperties;
  options?: DBConditionOptionType[];
  readonly?: boolean;
  ruleConfig?: {
    ops?: OpConfigs;
    rules?: IRules;
  };
}

const defaultRuleConfig = {
  ops: {},
  rules: {},
};

export function DBConditionRow({
  style,
  value,
  onChange,
  readonly,
  options,
  ruleConfig = defaultRuleConfig,
}: PropTypes) {
  const { left, operator, right } = value || {};

  const { rule, renderDBOptionSelect } = useLeft({
    left,
    options,
    onChange: (leftKey) => onChange({ ...value, left: leftKey }),
    readonly,
    userRules: ruleConfig.rules,
  });

  const { renderOpSelect, opConfig } = useOp({
    rule,
    op: operator,
    onChange: (v) => onChange({ ...value, operator: v }),
    readonly,
    userOps: ruleConfig.ops,
  });

  const targetSchema = useMemo(() => {
    const targetType: string | null = rule?.[operator || ''] || null;
    return targetType ? { type: targetType, extra: { weak: true } } : null;
  }, [rule, opConfig]);

  return (
    <UIContainer style={style}>
      <UIOperator>{renderOpSelect()}</UIOperator>
      <UIValues>
        <UILeft>{renderDBOptionSelect()}</UILeft>
        <UIRight>
          {targetSchema ? (
            <InjectDynamicValueInput
              readonly={readonly || !rule}
              value={right}
              schema={targetSchema}
              onChange={(v) => onChange({ ...value, right: v })}
            />
          ) : (
            <Input
              size="small"
              disabled
              style={{ pointerEvents: 'none' }}
              value={opConfig?.rightDisplay || I18n.t('Empty')}
            />
          )}
        </UIRight>
      </UIValues>
    </UIContainer>
  );
}

export { type DBConditionRowValueType, type DBConditionOptionType };
