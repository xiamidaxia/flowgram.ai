/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IVariableStore } from '@runtime/variable';
import { IStatusCenter } from '@runtime/status';
import { ISnapshotCenter } from '@runtime/snapshot';
import { IMessageCenter } from '@runtime/message';
import { IIOCenter } from '@runtime/io-center';
import { IState } from '../state';
import { IReporter } from '../reporter';
import { IDocument } from '../document';
import { InvokeParams } from '../base';

export interface ContextData {
  variableStore: IVariableStore;
  state: IState;
  document: IDocument;
  ioCenter: IIOCenter;
  snapshotCenter: ISnapshotCenter;
  statusCenter: IStatusCenter;
  messageCenter: IMessageCenter;
  reporter: IReporter;
}

export interface IContext extends ContextData {
  id: string;
  init(params: InvokeParams): void;
  dispose(): void;
  sub(): IContext;
}
