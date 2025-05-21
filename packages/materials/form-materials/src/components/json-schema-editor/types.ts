import { JsonSchema } from '../type-selector/types';

export interface PropertyValueType extends JsonSchema {
  name?: string;
  key?: number;
  isPropertyRequired?: boolean;
}

export type PropertiesValueType = Pick<PropertyValueType, 'properties' | 'required'>;

export type JsonSchemaProperties = JsonSchema['properties'];

export interface ConfigType {
  placeholder?: string;
  descTitle?: string;
  descPlaceholder?: string;
  addButtonText?: string;
}
