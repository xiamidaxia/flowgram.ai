import { parseTypeJsonOrKind } from '../utils/helpers';
import { VarJSONSchema } from './json-schema';
import { ASTKind, ASTNodeJSON, ASTNodeJSONOrKind } from '../types';
import { ASTNodeFlags } from '../flags';
import { BaseVariableField } from '../declaration';
import { ASTNode } from '../ast-node';
import { UnionJSON } from './union';
import { ASTFactory } from '../factory';

export abstract class BaseType<JSON extends ASTNodeJSON = any, InjectOpts = any> extends ASTNode<
  JSON,
  InjectOpts
> {
  public flags: number = ASTNodeFlags.BasicType;

  /**
   * 类型是否一致
   * @param targetTypeJSON
   */
  public isTypeEqual(targetTypeJSONOrKind?: ASTNodeJSONOrKind): boolean {
    const targetTypeJSON = parseTypeJsonOrKind(targetTypeJSONOrKind);

    // 如果是 Union 类型，有一个子类型保持相等即可
    if (targetTypeJSON?.kind === ASTKind.Union) {
      return ((targetTypeJSON as UnionJSON)?.types || [])?.some((_subType) =>
        this.isTypeEqual(_subType)
      );
    }

    return this.kind === targetTypeJSON?.kind;
  }

  /**
   * 可下钻类型需实现
   * @param keyPath
   */
  getByKeyPath(keyPath: string[] = []): BaseVariableField | undefined {
    throw new Error(`Get By Key Path is not implemented for Type: ${this.kind}`);
  }

  /**
   * Get AST JSON for current base type
   * @returns
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: this.kind,
    };
  }

  /**
   * Get Standard JSON Schema for current base type
   * @returns
   */
  toJSONSchema(): VarJSONSchema.ISchema {
    return {
      type: this.kind.toLowerCase() as VarJSONSchema.BasicType,
    };
  }

  /**
   * Check if the type is equal with json schema
   */
  isEqualWithJSONSchema(schema: VarJSONSchema.ISchema | VarJSONSchema.ISchema[]): boolean {
    if (Array.isArray(schema)) {
      return this.isTypeEqual(
        ASTFactory.createUnion({
          types: schema
            .map((_schema) => ASTFactory.createTypeASTFromSchema(_schema)!)
            .filter(Boolean),
        })
      );
    }

    return this.isTypeEqual(ASTFactory.createTypeASTFromSchema(schema));
  }
}
