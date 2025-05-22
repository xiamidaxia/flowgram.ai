import { VarJSONSchema } from './json-schema';
import { ASTKind } from '../types';
import { BaseType } from './base-type';

export class BooleanType extends BaseType {
  static kind: string = ASTKind.Boolean;

  fromJSON(): void {
    // noop
  }

  toJSONSchema(): VarJSONSchema.ISchema {
    return {
      type: 'boolean',
    };
  }
}
