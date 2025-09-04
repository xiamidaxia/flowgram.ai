/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { languages } from '@flowgram.ai/coze-editor/preset-code';
import { typescript } from '@flowgram.ai/coze-editor/language-typescript';
import { shell } from '@flowgram.ai/coze-editor/language-shell';
import { python } from '@flowgram.ai/coze-editor/language-python';
import { json } from '@flowgram.ai/coze-editor/language-json';
import { mixLanguages } from '@flowgram.ai/coze-editor';

languages.register('python', python);
languages.register('shell', shell);
languages.register('typescript', typescript);

languages.register('json', {
  // mixLanguages is used to solve the problem that interpolation also uses parentheses, which causes incorrect highlighting
  language: mixLanguages({
    outerLanguage: json.language,
  }),
  languageService: json.languageService,
});
