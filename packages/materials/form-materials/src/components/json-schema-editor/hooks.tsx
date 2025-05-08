import { useEffect, useMemo, useState } from 'react';

import { PropertyValueType } from './types';
import { JsonSchema } from '../type-selector';

let _id = 0;
function genId() {
  return _id++;
}

function getDrilldownSchema(
  value?: PropertyValueType,
  path?: (keyof PropertyValueType)[]
): { schema?: PropertyValueType | null; path?: (keyof PropertyValueType)[] } {
  if (!value) {
    return {};
  }

  if (value.type === 'array' && value.items) {
    return getDrilldownSchema(value.items, [...(path || []), 'items']);
  }

  return { schema: value, path };
}

export function usePropertiesEdit(
  value?: PropertyValueType,
  onChange?: (value: PropertyValueType) => void
) {
  // Get drilldown (array.items.items...)
  const drilldown = useMemo(() => getDrilldownSchema(value), [value?.type, value?.items]);

  const isDrilldownObject = drilldown.schema?.type === 'object';

  // Generate Init Property List
  const initPropertyList = useMemo(
    () =>
      isDrilldownObject
        ? Object.entries(drilldown.schema?.properties || {}).map(
            ([key, _value]) =>
              ({
                key: genId(),
                name: key,
                isPropertyRequired: value?.required?.includes(key) || false,
                ..._value,
              } as PropertyValueType)
          )
        : [],
    [isDrilldownObject]
  );

  const [propertyList, setPropertyList] = useState<PropertyValueType[]>(initPropertyList);

  const updatePropertyList = (updater: (list: PropertyValueType[]) => PropertyValueType[]) => {
    setPropertyList((_list) => {
      const next = updater(_list);

      // onChange to parent
      const nextProperties: Record<string, JsonSchema> = {};
      const nextRequired: string[] = [];

      for (const _property of next) {
        if (!_property.name) {
          continue;
        }

        nextProperties[_property.name] = _property;

        if (_property.isPropertyRequired) {
          nextRequired.push(_property.name);
        }
      }

      let drilldownSchema = value || {};
      if (drilldown.path) {
        drilldownSchema = drilldown.path.reduce((acc, key) => acc[key], value || {});
      }
      drilldownSchema.properties = nextProperties;
      drilldownSchema.required = nextRequired;

      onChange?.(value || {});

      return next;
    });
  };

  const onAddProperty = () => {
    updatePropertyList((_list) => [..._list, { key: genId(), name: '', type: 'string' }]);
  };

  const onRemoveProperty = (key: number) => {
    updatePropertyList((_list) => _list.filter((_property) => _property.key !== key));
  };

  const onEditProperty = (key: number, nextValue: PropertyValueType) => {
    updatePropertyList((_list) =>
      _list.map((_property) => (_property.key === key ? nextValue : _property))
    );
  };

  useEffect(() => {
    if (!isDrilldownObject) {
      setPropertyList([]);
    }
  }, [isDrilldownObject]);

  return {
    propertyList,
    isDrilldownObject,
    onAddProperty,
    onRemoveProperty,
    onEditProperty,
  };
}
