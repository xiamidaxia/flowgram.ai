import { VarJSONSchema } from './json-schema';
import { ASTKind } from '../types';
import { ASTNodeFlags } from '../flags';
import { BaseType } from './base-type';

export class IntegerType extends BaseType {
  public flags: ASTNodeFlags = ASTNodeFlags.BasicType;

  static kind: string = ASTKind.Integer;

  fromJSON(): void {
    // noop
  }

  toJSONSchema(): VarJSONSchema.ISchema {
    return {
      type: 'integer',
    };
  }
}
