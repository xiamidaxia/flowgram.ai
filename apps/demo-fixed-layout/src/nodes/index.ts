import { type FlowNodeRegistry } from '../typings';
import { TryCatchNodeRegistry } from './trycatch';
import { StartNodeRegistry } from './start';
import { LoopNodeRegistry } from './loop';
import { LLMNodeRegistry } from './llm';
import { IFBlockNodeRegistry } from './if-block';
import { IFNodeRegistry } from './if';
import { EndNodeRegistry } from './end';
import { ConditionNodeRegistry } from './condition';
import { CatchBlockNodeRegistry } from './catch-block';
import { CaseDefaultNodeRegistry } from './case-default';
import { CaseNodeRegistry } from './case';
import { BreakLoopNodeRegistry } from './break-loop';

export const FlowNodeRegistries: FlowNodeRegistry[] = [
  StartNodeRegistry,
  EndNodeRegistry,
  ConditionNodeRegistry,
  LLMNodeRegistry,
  LoopNodeRegistry,
  CaseNodeRegistry,
  TryCatchNodeRegistry,
  CatchBlockNodeRegistry,
  IFNodeRegistry,
  IFBlockNodeRegistry,
  BreakLoopNodeRegistry,
  CaseDefaultNodeRegistry,
];
