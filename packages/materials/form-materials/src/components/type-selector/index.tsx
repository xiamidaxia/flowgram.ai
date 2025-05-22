import React, { useMemo } from 'react';

import { Button, Cascader } from '@douyinfe/semi-ui';

import { JsonSchema } from './types';
import { ArrayIcons, VariableTypeIcons, getSchemaIcon, options } from './constants';

interface PropTypes {
  value?: Partial<JsonSchema>;
  onChange: (value?: Partial<JsonSchema>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const getTypeSelectValue = (value?: Partial<JsonSchema>): string[] | undefined => {
  if (value?.type === 'array' && value?.items) {
    return [value.type, ...(getTypeSelectValue(value.items) || [])];
  }

  return value?.type ? [value.type] : undefined;
};

export const parseTypeSelectValue = (value?: string[]): Partial<JsonSchema> | undefined => {
  const [type, ...subTypes] = value || [];

  if (type === 'array') {
    return { type: 'array', items: parseTypeSelectValue(subTypes) };
  }

  return { type };
};

export function TypeSelector(props: PropTypes) {
  const { value, onChange, disabled, style } = props;

  const selectValue = useMemo(() => getTypeSelectValue(value), [value]);

  return (
    <Cascader
      disabled={disabled}
      size="small"
      triggerRender={() => (
        <Button size="small" style={style}>
          {getSchemaIcon(value)}
        </Button>
      )}
      treeData={options}
      value={selectValue}
      leafOnly={true}
      onChange={(value) => {
        onChange(parseTypeSelectValue(value as string[]));
      }}
    />
  );
}

export { JsonSchema, VariableTypeIcons, ArrayIcons, getSchemaIcon };
