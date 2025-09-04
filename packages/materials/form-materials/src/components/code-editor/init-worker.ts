/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { typescript } from '@flowgram.ai/coze-editor/language-typescript';

let tsWorkerInit = false;

export const initTsWorker = () => {
  if (tsWorkerInit) {
    return;
  }
  tsWorkerInit = true;

  const tsWorker = new Worker(
    new URL(`@flowgram.ai/coze-editor/language-typescript/worker`, import.meta.url),
    { type: 'module' }
  );
  typescript.languageService.initialize(tsWorker, {
    compilerOptions: {
      // eliminate Promise error
      lib: ['es2015', 'dom'],
      noImplicitAny: false,
    },
  });
};
