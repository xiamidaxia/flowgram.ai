import { get } from 'lodash';

import { ASTKind, ASTNodeJSON } from './types';
import { MapJSON } from './type/map';
import { VarJSONSchema } from './type/json-schema';
import { ArrayJSON } from './type/array';
import { CustomTypeJSON, ObjectJSON, UnionJSON } from './type';
import {
  EnumerateExpressionJSON,
  KeyPathExpressionJSON,
  WrapArrayExpressionJSON,
} from './expression';
import { PropertyJSON, VariableDeclarationJSON, VariableDeclarationListJSON } from './declaration';
import { ASTNode } from './ast-node';

export namespace ASTFactory {
  /**
   * 类型相关
   * @returns
   */
  export const createString = () => ({ kind: ASTKind.String });
  export const createNumber = () => ({ kind: ASTKind.Number });
  export const createBoolean = () => ({ kind: ASTKind.Boolean });
  export const createInteger = () => ({ kind: ASTKind.Integer });
  export const createObject = (json: ObjectJSON) => ({
    kind: ASTKind.Object,
    ...json,
  });
  export const createArray = (json: ArrayJSON) => ({
    kind: ASTKind.Array,
    ...json,
  });
  export const createMap = (json: MapJSON) => ({
    kind: ASTKind.Map,
    ...json,
  });
  export const createUnion = (json: UnionJSON) => ({
    kind: ASTKind.Union,
    ...json,
  });
  export const createCustomType = (json: CustomTypeJSON) => ({
    kind: ASTKind.CustomType,
    ...json,
  });

  /**
   * 声明相关
   */
  export const createVariableDeclaration = <VariableMeta = any>(
    json: VariableDeclarationJSON<VariableMeta>
  ) => ({
    kind: ASTKind.VariableDeclaration,
    ...json,
  });
  export const createProperty = <VariableMeta = any>(json: PropertyJSON<VariableMeta>) => ({
    kind: ASTKind.Property,
    ...json,
  });
  export const createVariableDeclarationList = (json: VariableDeclarationListJSON) => ({
    kind: ASTKind.VariableDeclarationList,
    ...json,
  });

  /**
   * 表达式相关
   */
  export const createEnumerateExpression = (json: EnumerateExpressionJSON) => ({
    kind: ASTKind.EnumerateExpression,
    ...json,
  });
  export const createKeyPathExpression = (json: KeyPathExpressionJSON) => ({
    kind: ASTKind.KeyPathExpression,
    ...json,
  });
  export const createWrapArrayExpression = (json: WrapArrayExpressionJSON) => ({
    kind: ASTKind.WrapArrayExpression,
    ...json,
  });

  /**
   * Converts a JSON schema to an Abstract Syntax Tree (AST) representation.
   * This function recursively processes the JSON schema and creates corresponding AST nodes.
   *
   * For more information on JSON Schema, refer to the official documentation:
   * https://json-schema.org/
   *
   *
   * @param jsonSchema - The JSON schema to convert.
   * @returns An AST node representing the JSON schema, or undefined if the schema type is not recognized.
   */
  export function createTypeASTFromSchema(
    jsonSchema: VarJSONSchema.ISchema
  ): ASTNodeJSON | undefined {
    const { type, extra } = jsonSchema || {};
    const { weak = false } = extra || {};

    if (!type) {
      return undefined;
    }

    switch (type) {
      case 'object':
        if (weak) {
          return { kind: ASTKind.Object, weak: true };
        }
        return ASTFactory.createObject({
          properties: Object.entries(jsonSchema.properties || {})
            /**
             * Sorts the properties of a JSON schema based on the 'extra.index' field.
             * If the 'extra.index' field is not present, the property will be treated as having an index of 0.
             */
            .sort((a, b) => (get(a?.[1], 'extra.index') || 0) - (get(b?.[1], 'extra.index') || 0))
            .map(([key, _property]) => ({
              key,
              type: createTypeASTFromSchema(_property),
              meta: { description: _property.description },
            })),
        });
      case 'array':
        if (weak) {
          return { kind: ASTKind.Array, weak: true };
        }
        return ASTFactory.createArray({
          items: createTypeASTFromSchema(jsonSchema.items!),
        });
      case 'map':
        if (weak) {
          return { kind: ASTKind.Map, weak: true };
        }
        return ASTFactory.createMap({
          valueType: createTypeASTFromSchema(jsonSchema.additionalProperties!),
        });
      case 'string':
        return ASTFactory.createString();
      case 'number':
        return ASTFactory.createNumber();
      case 'boolean':
        return ASTFactory.createBoolean();
      case 'integer':
        return ASTFactory.createInteger();

      default:
        // If the type is not recognized, return CustomType
        return ASTFactory.createCustomType({ typeName: type });
    }
  }

  /**
   * 通过 AST Class 创建
   */
  export const create = <JSON extends ASTNodeJSON>(
    targetType: { kind: string; new (...args: any[]): ASTNode<JSON> },
    json: JSON
  ) => ({ kind: targetType.kind, ...json });
}
