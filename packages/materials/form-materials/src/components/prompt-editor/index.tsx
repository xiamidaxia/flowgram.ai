/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Renderer, EditorProvider, ActiveLinePlaceholder } from '@coze-editor/editor/react';
import preset from '@coze-editor/editor/preset-prompt';

import { PropsType } from './types';
import { UIContainer } from './styles';
import MarkdownHighlight from './extensions/markdown';
import LanguageSupport from './extensions/language-support';
import JinjaHighlight from './extensions/jinja';

export type PromptEditorPropsType = PropsType;

export function PromptEditor(props: PropsType) {
  const {
    value,
    onChange,
    readonly,
    placeholder,
    activeLinePlaceholder,
    style,
    hasError,
    children,
  } = props || {};

  return (
    <UIContainer $hasError={hasError} style={style}>
      <EditorProvider>
        <Renderer
          plugins={preset}
          defaultValue={String(value?.content)}
          options={{
            readOnly: readonly,
            editable: !readonly,
            placeholder,
          }}
          onChange={(e) => {
            onChange({ type: 'template', content: e.value });
          }}
        />
        {activeLinePlaceholder && (
          <ActiveLinePlaceholder>{activeLinePlaceholder}</ActiveLinePlaceholder>
        )}
        <MarkdownHighlight />
        <LanguageSupport />
        <JinjaHighlight />
        {children}
      </EditorProvider>
    </UIContainer>
  );
}
