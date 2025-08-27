/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createTheme, tags as t } from '@coze-editor/editor/preset-code';
import { type Extension } from '@codemirror/state';

const colors = {
  background: '#0D1117',
  // syntax - 现代化暗色主题配色
  comment: '#8B949E',
  key: '#7DD3FC',
  variable: '#F472B6',
  string: '#34D399',
  number: '#FBBF24',
  boolean: '#A78BFA',
  null: '#A78BFA',
  separator: '#E6EDF3',
};

export const darkTheme: Extension = createTheme({
  variant: 'dark',
  settings: {
    background: colors.background,
    foreground: '#E6EDF3',
    caret: '#7DD3FC',
    selection: '#264F7833',
    gutterBackground: colors.background,
    gutterForeground: '#6E7681',
    gutterBorderColor: 'transparent',
    gutterBorderWidth: 0,
    lineHighlight: '#21262D',
    bracketColors: ['#FBBF24', '#A78BFA', '#7DD3FC'],
    tooltip: {
      backgroundColor: '#21262D',
      color: '#E6EDF3',
      border: '1px solid #30363D',
    },
    link: {
      color: '#58A6FF',
    },
    completionItemHover: {
      backgroundColor: '#21262D',
    },
    completionItemSelected: {
      backgroundColor: '#1F6EEB',
    },
    completionItemIcon: {
      color: '#8B949E',
    },
    completionItemLabel: {
      color: '#E6EDF3',
    },
    completionItemInfo: {
      color: '#8B949E',
    },
    completionItemDetail: {
      color: '#6E7681',
    },
  },
  styles: [
    // json
    {
      tag: t.comment,
      color: colors.comment,
    },
    {
      tag: [t.propertyName],
      color: colors.key,
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

    // js
    {
      tag: [t.definitionKeyword],
      color: '#C084FC',
    },
    {
      tag: [t.modifier],
      color: '#C084FC',
    },
    {
      tag: [t.controlKeyword],
      color: '#C084FC',
    },
    {
      tag: [t.operatorKeyword],
      color: '#C084FC',
    },

    // markdown
    {
      tag: [t.heading],
      color: '#7DD3FC',
    },
    {
      tag: [t.processingInstruction],
      color: '#7DD3FC',
    },

    // shell
    // curl
    {
      tag: [t.standard(t.variableName)],
      color: '#34D399',
    },
    // -X
    {
      tag: [t.attributeName],
      color: '#FBBF24',
    },
    // url in string (includes quotes), e.g. "https://..."
    {
      tag: [t.special(t.string)],
      color: '#7DD3FC',
    },
  ],
});
