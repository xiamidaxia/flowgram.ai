import React, { useCallback } from 'react';

import { useScopeAvailable, ASTMatch, BaseVariableField, VarJSONSchema } from '@flowgram.ai/editor';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { Icon } from '@douyinfe/semi-ui';

import { ArrayIcons, VariableTypeIcons } from '../type-selector/constants';

type VariableField = BaseVariableField<{ icon?: string | JSX.Element; title?: string }>;

export function useVariableTree(params: {
  includeSchema?: VarJSONSchema.ISchema | VarJSONSchema.ISchema[];
  excludeSchema?: VarJSONSchema.ISchema | VarJSONSchema.ISchema[];
}): TreeNodeData[] {
  const { includeSchema, excludeSchema } = params;

  const available = useScopeAvailable();

  const getVariableTypeIcon = useCallback((variable: VariableField) => {
    if (variable.meta?.icon) {
      if (typeof variable.meta.icon === 'string') {
        return <img style={{ marginRight: 8 }} width={12} height={12} src={variable.meta.icon} />;
      }

      return variable.meta.icon;
    }

    const _type = variable.type;

    if (ASTMatch.isArray(_type)) {
      return (
        <Icon
          size="small"
          svg={ArrayIcons[_type.items?.kind.toLowerCase()] || VariableTypeIcons.array}
        />
      );
    }

    if (ASTMatch.isCustomType(_type)) {
      return <Icon size="small" svg={VariableTypeIcons[_type.typeName.toLowerCase()]} />;
    }

    return <Icon size="small" svg={VariableTypeIcons[variable.type?.kind.toLowerCase()]} />;
  }, []);

  const renderVariable = (
    variable: VariableField,
    parentFields: VariableField[] = []
  ): TreeNodeData | null => {
    let type = variable?.type;

    if (!type) {
      return null;
    }

    let children: TreeNodeData[] | undefined;

    if (ASTMatch.isObject(type)) {
      children = (type.properties || [])
        .map((_property) => renderVariable(_property as VariableField, [...parentFields, variable]))
        .filter(Boolean) as TreeNodeData[];

      if (!children?.length) {
        return null;
      }
    }

    const keyPath = [...parentFields.map((_field) => _field.key), variable.key];
    const key = keyPath.join('.');

    const isSchemaInclude = includeSchema ? type.isEqualWithJSONSchema(includeSchema) : true;
    const isSchemaExclude = excludeSchema ? type.isEqualWithJSONSchema(excludeSchema) : false;
    const isSchemaMatch = isSchemaInclude && !isSchemaExclude;

    // If not match, and no children, return null
    if (!isSchemaMatch && !children?.length) {
      return null;
    }

    return {
      key: key,
      label: variable.meta?.title || variable.key,
      value: key,
      keyPath,
      icon: getVariableTypeIcon(variable),
      children,
      disabled: !isSchemaMatch,
      rootMeta: parentFields[0]?.meta,
    };
  };

  return [...available.variables.slice(0).reverse()]
    .map((_variable) => renderVariable(_variable as VariableField))
    .filter(Boolean) as TreeNodeData[];
}
