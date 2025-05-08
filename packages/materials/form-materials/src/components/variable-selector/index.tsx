import React from 'react';

import { TreeSelect } from '@douyinfe/semi-ui';

import { useVariableTree } from './use-variable-tree';

export interface PropTypes {
  value?: string;
  onChange: (value?: string) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
}

export const VariableSelector = ({
  value,
  onChange,
  style,
  readonly = false,
  hasError,
}: PropTypes) => {
  const treeData = useVariableTree();

  return (
    <>
      <TreeSelect
        dropdownMatchSelectWidth={false}
        disabled={readonly}
        treeData={treeData}
        size="small"
        value={value}
        style={{
          ...style,
          outline: hasError ? '1px solid red' : undefined,
        }}
        validateStatus={hasError ? 'error' : undefined}
        onChange={(option) => {
          onChange(option as string);
        }}
        showClear
        placeholder="Select Variable..."
      />
    </>
  );
};
