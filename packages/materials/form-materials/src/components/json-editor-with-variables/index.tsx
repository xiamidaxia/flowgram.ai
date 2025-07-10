/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { VariableTree } from './extensions/variable-tree';
import { VariableTagInject } from './extensions/variable-tag';
import { CodeEditor, type CodeEditorPropsType } from '../code-editor';

export function JsonEditorWithVariables(props: Omit<CodeEditorPropsType, 'languageId'>) {
  return (
    <CodeEditor languageId="json" activeLinePlaceholder="Press '@' to Select variable" {...props}>
      <VariableTree />
      <VariableTagInject />
    </CodeEditor>
  );
}
