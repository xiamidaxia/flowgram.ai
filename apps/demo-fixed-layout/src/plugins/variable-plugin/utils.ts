import { get } from 'lodash-es';
import { ASTKind, type ASTNodeJSON } from '@flowgram.ai/fixed-layout-editor';

import { type JsonSchema } from '../../typings';

function sortProperties(properties: Record<string, JsonSchema>) {
  return Object.entries(properties).sort(
    (a, b) => (get(a?.[1], 'extra.index') || 0) - (get(b?.[1], 'extra.index') || 0)
  );
}

export function createASTFromJSONSchema(jsonSchema: JsonSchema): ASTNodeJSON | undefined {
  const { type } = jsonSchema || {};

  if (!type) {
    return undefined;
  }

  switch (type) {
    case 'object':
      return {
        kind: ASTKind.Object,
        properties: sortProperties(jsonSchema.properties || {}).map(([key, _property]) => ({
          key,
          type: createASTFromJSONSchema(_property),
          meta: { description: _property.description },
        })),
      };

    case 'array':
      return {
        kind: ASTKind.Array,
        items: createASTFromJSONSchema(jsonSchema.items!),
      };

    default:
      // Camel case to variable-core type
      return {
        kind: type.charAt(0).toUpperCase() + type.slice(1),
        enum: jsonSchema.enum,
      };
  }
}
