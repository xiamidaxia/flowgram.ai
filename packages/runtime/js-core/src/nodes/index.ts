/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { INodeExecutorFactory } from '@flowgram.ai/runtime-interface';

import { StartExecutor } from './start';
import { LoopExecutor } from './loop';
import { LLMExecutor } from './llm';
import { HTTPExecutor } from './http';
import { EndExecutor } from './end';
import { BlockEndExecutor, BlockStartExecutor } from './empty';
import { ConditionExecutor } from './condition';
import { CodeExecutor } from './code';

export const WorkflowRuntimeNodeExecutors: INodeExecutorFactory[] = [
  StartExecutor,
  EndExecutor,
  LLMExecutor,
  ConditionExecutor,
  LoopExecutor,
  BlockStartExecutor,
  BlockEndExecutor,
  HTTPExecutor,
  CodeExecutor,
];
