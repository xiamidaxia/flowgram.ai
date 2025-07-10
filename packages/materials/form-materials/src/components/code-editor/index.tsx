/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useRef } from 'react';

import { ActiveLinePlaceholder, createRenderer, EditorProvider } from '@coze-editor/editor/react';
import preset, { type EditorAPI } from '@coze-editor/editor/preset-code';
import { EditorView } from '@codemirror/view';

import { getSuffixByLanguageId } from './utils';

import './theme';
import './language-features';

const OriginCodeEditor = createRenderer(preset, [
  EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
    },
  }),
]);

export interface CodeEditorPropsType extends React.PropsWithChildren<{}> {
  value?: string;
  onChange?: (value: string) => void;
  languageId: 'python' | 'typescript' | 'shell' | 'json';
  theme?: 'dark' | 'light';
  placeholder?: string;
  activeLinePlaceholder?: string;
}

export function CodeEditor({
  value,
  onChange,
  languageId = 'python',
  theme = 'light',
  children,
  placeholder,
  activeLinePlaceholder,
}: CodeEditorPropsType) {
  const editorRef = useRef<EditorAPI | null>(null);

  useEffect(() => {
    // listen to value change
    if (editorRef.current?.getValue() !== value) {
      editorRef.current?.setValue(String(value || ''));
    }
  }, [value]);

  return (
    <EditorProvider>
      <OriginCodeEditor
        defaultValue={value}
        options={{
          uri: `file:///untitled${getSuffixByLanguageId(languageId)}`,
          languageId,
          theme,
          placeholder,
        }}
        didMount={(editor: EditorAPI) => {
          editorRef.current = editor;
        }}
        onChange={(e) => onChange?.(e.value)}
      >
        {activeLinePlaceholder && (
          <ActiveLinePlaceholder>{activeLinePlaceholder}</ActiveLinePlaceholder>
        )}
        {children}
      </OriginCodeEditor>
    </EditorProvider>
  );
}
