/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  WorkflowSchema,
  IValidation,
  ValidationResult,
  InvokeParams,
  IJsonSchema,
  FlowGramNode,
} from '@flowgram.ai/runtime-interface';

import { JSONSchemaValidator } from '@infra/index';

export class WorkflowRuntimeValidation implements IValidation {
  public invoke(params: InvokeParams): ValidationResult {
    const { schema, inputs } = params;
    const schemaValidationResult = this.schema(schema);
    if (!schemaValidationResult.valid) {
      return schemaValidationResult;
    }
    const inputsValidationResult = this.inputs(this.getWorkflowInputsDeclare(schema), inputs);
    if (!inputsValidationResult.valid) {
      return inputsValidationResult;
    }
    return {
      valid: true,
    };
  }

  private schema(schema: WorkflowSchema): ValidationResult {
    // TODO
    // 检查成环
    // 检查边的节点是否存在
    // 检查跨层级连线
    // 检查是否只有一个开始节点和一个结束节点
    // 检查开始节点是否在根节点
    // 检查结束节点是否在根节点

    // 注册节点检查器
    return {
      valid: true,
    };
  }

  private inputs(inputsSchema: IJsonSchema, inputs: Record<string, unknown>): ValidationResult {
    const { result, errorMessage } = JSONSchemaValidator({
      schema: inputsSchema,
      value: inputs,
    });
    if (!result) {
      const error = `JSON Schema validation failed: ${errorMessage}`;
      return {
        valid: false,
        errors: [error],
      };
    }
    return {
      valid: true,
    };
  }

  private getWorkflowInputsDeclare(schema: WorkflowSchema): IJsonSchema {
    const startNode = schema.nodes.find((node) => node.type === FlowGramNode.Start);
    if (!startNode) {
      throw new Error('Workflow schema must have a start node');
    }
    return startNode.data.outputs;
  }
}
