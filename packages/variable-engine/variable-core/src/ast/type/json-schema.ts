export namespace VarJSONSchema {
  export type BasicType = 'boolean' | 'string' | 'integer' | 'number' | 'object' | 'array' | 'map';

  export interface ISchema<T = string> {
    type?: T;
    default?: any;
    title?: string;
    description?: string;
    enum?: (string | number)[];
    properties?: Record<string, ISchema<T>>;
    additionalProperties?: ISchema<T>;
    items?: ISchema<T>;
    required?: string[];
    $ref?: string;
    extra?: {
      index?: number;
      // Used in BaseType.isEqualWithJSONSchema, the type comparison will be weak
      weak?: boolean;
      // Set the render component
      formComponent?: string;
      [key: string]: any;
    };
  }

  export type IBasicSchema = ISchema<BasicType>;
}
