/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createTheme, tags as t } from '@coze-editor/editor/preset-code';
import { type Extension } from '@codemirror/state';

const colors = {
  background: '#FFFFFF',
  comment: '#6B7280',
  key: '#2563EB',
  variable: '#DC2626',
  string: '#059669',
  number: '#EA580C',
  boolean: '#7C3AED',
  null: '#7C3AED',
  separator: '#374151',
};

export const lightTheme: Extension = createTheme({
  variant: 'light',
  settings: {
    background: '#FFFFFF',
    foreground: '#1F2937',
    caret: '#2563EB',
    selection: '#E5E7EB',
    gutterBackground: '#F9FAFB',
    gutterForeground: '#6B7280',
    gutterBorderColor: 'transparent',
    gutterBorderWidth: 0,
    lineHighlight: '#F3F4F680',
    bracketColors: ['#F59E0B', '#8B5CF6', '#06B6D4'],
    tooltip: {
      backgroundColor: '#FFFFFF',
      color: '#1F2937',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    link: {
      color: '#2563EB',
    },
    completionItemHover: {
      backgroundColor: '#F3F4F6',
    },
    completionItemSelected: {
      backgroundColor: '#E5E7EB',
    },
    completionItemIcon: {
      color: '#4B5563',
    },
    completionItemLabel: {
      color: '#1F2937',
    },
    completionItemInfo: {
      color: '#4B5563',
    },
    completionItemDetail: {
      color: '#6B7280',
    },
  },
  styles: [
    // JSON
    {
      tag: t.comment,
      color: colors.comment,
    },
    {
      tag: [t.propertyName],
      color: colors.key,
    },
    {
      tag: [t.variableName],
      color: colors.variable,
    },

    {
      tag: [t.string],
      color: colors.string,
    },
    {
      tag: [t.number],
      color: colors.number,
    },
    {
      tag: [t.bool],
      color: colors.boolean,
    },
    {
      tag: [t.null],
      color: colors.null,
    },
    {
      tag: [t.separator],
      color: colors.separator,
    },

    // markdown
    {
      tag: [t.heading],
      color: '#2563EB',
    },
    {
      tag: [t.processingInstruction],
      color: '#2563EB',
    },

    // js
    {
      tag: [t.definitionKeyword],
      color: '#9333EA',
    },
    {
      tag: [t.modifier],
      color: '#9333EA',
    },
    {
      tag: [t.controlKeyword],
      color: '#9333EA',
    },
    {
      tag: [t.operatorKeyword],
      color: '#9333EA',
    },

    // shell
    // curl
    {
      tag: [t.standard(t.variableName)],
      color: '#059669',
    },
    // -X
    {
      tag: [t.attributeName],
      color: '#EA580C',
    },
    // url in string (includes quotes), e.g. "https://..."
    {
      tag: [t.special(t.string)],
      color: '#2563EB',
    },
  ],
});
