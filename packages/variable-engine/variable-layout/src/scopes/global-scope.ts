import { injectable, interfaces } from 'inversify';
import { ASTNode, ASTNodeJSON, Scope, VariableEngine } from '@flowgram.ai/variable-core';

@injectable()
export class GlobalScope extends Scope {
  static readonly ID = Symbol('GlobalScope');

  static is(scope: Scope): scope is GlobalScope {
    return scope.id === GlobalScope.ID;
  }

  /**
   * Sets a variable in the Global Scope with the given key and JSON value.
   *
   * @param key - The key under which the variable will be stored.
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setVar(key: string, json: ASTNodeJSON): ASTNode;

  /**
   * Sets a variable in the Global Scope with the default key 'outputs'.
   *
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setVar(json: ASTNodeJSON): ASTNode;

  public setVar(arg1: string | ASTNodeJSON, arg2?: ASTNodeJSON): ASTNode {
    if (typeof arg1 === 'string' && arg2 !== undefined) {
      return this.ast.set(arg1, arg2);
    }

    if (typeof arg1 === 'object' && arg2 === undefined) {
      return this.ast.set('outputs', arg1);
    }

    throw new Error('Invalid arguments');
  }

  /**
   * Retrieves a variable from the Global Scope by key.
   *
   * @param key - The key of the variable to retrieve. Defaults to 'outputs'.
   * @returns The value of the variable, or undefined if not found.
   */
  public getVar(key: string = 'outputs') {
    return this.ast.get(key);
  }

  /**
   * Clears a variable from the Global Scope by key.
   *
   * @param key - The key of the variable to clear. Defaults to 'outputs'.
   * @returns The updated AST node.
   */
  public clearVar(key: string = 'outputs') {
    return this.ast.remove(key);
  }
}

export const bindGlobalScope = (bind: interfaces.Bind) => {
  bind(GlobalScope).toDynamicValue((ctx) => {
    const variableEngine = ctx.container.get(VariableEngine);
    let scope = variableEngine.getScopeById(GlobalScope.ID) as GlobalScope;

    if (!scope) {
      scope = variableEngine.createScope(
        GlobalScope.ID,
        {},
        { ScopeConstructor: GlobalScope }
      ) as GlobalScope;
      variableEngine.chain.refreshAllChange();
    }

    return scope;
  });
};
