import { type FlowNodeRegistry } from '../typings';
import { TryCatchNodeRegistry } from './trycatch';
import { StartNodeRegistry } from './start';
import { LoopNodeRegistry } from './loop';
import { LLMNodeRegistry } from './llm';
import { EndNodeRegistry } from './end';
import { ConditionNodeRegistry } from './condition';
import { BlockNodeRegistry } from './block';

export const FlowNodeRegistries: FlowNodeRegistry[] = [
  StartNodeRegistry,
  EndNodeRegistry,
  ConditionNodeRegistry,
  LLMNodeRegistry,
  LoopNodeRegistry,
  BlockNodeRegistry,
  TryCatchNodeRegistry,
];

export { defaultFormMeta } from './default-form-meta';
