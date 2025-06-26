import React, { useMemo } from 'react';

import { Input } from '@douyinfe/semi-ui';

import { ConditionRowValueType, Op } from './types';
import { UIContainer, UILeft, UIOperator, UIRight, UIValues } from './styles';
import { useRule } from './hooks/useRule';
import { useOp } from './hooks/useOp';
import { VariableSelector } from '../variable-selector';
import { DynamicValueInput } from '../dynamic-value-input';
import { JsonSchemaBasicType } from '../../typings';

interface PropTypes {
  value?: ConditionRowValueType;
  onChange: (value?: ConditionRowValueType) => void;
  style?: React.CSSProperties;
  readonly?: boolean;
}

export function ConditionRow({ style, value, onChange, readonly }: PropTypes) {
  const { left, operator, right } = value || {};
  const { rule } = useRule(left);
  const { renderOpSelect, opConfig } = useOp({
    rule,
    op: operator,
    onChange: (v) => onChange({ ...value, operator: v }),
  });

  const targetSchema = useMemo(() => {
    const targetType: JsonSchemaBasicType | null = rule?.[operator as Op] || null;
    return targetType ? { type: targetType, extra: { weak: true } } : null;
  }, [rule, opConfig]);

  return (
    <UIContainer style={style}>
      <UIOperator>{renderOpSelect()}</UIOperator>
      <UIValues>
        <UILeft>
          <VariableSelector
            readonly={readonly}
            style={{ width: '100%' }}
            value={left?.content}
            onChange={(v) =>
              onChange({
                ...value,
                left: {
                  type: 'ref',
                  content: v,
                },
              })
            }
          />
        </UILeft>
        <UIRight>
          {targetSchema ? (
            <DynamicValueInput
              readonly={readonly || !rule}
              value={right}
              schema={targetSchema}
              onChange={(v) => onChange({ ...value, right: v })}
            />
          ) : (
            <Input size="small" disabled value={opConfig?.rightDisplay || 'Empty'} />
          )}
        </UIRight>
      </UIValues>
    </UIContainer>
  );
}

export { type ConditionRowValueType };
