/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createRoot } from 'react-dom/client';

import { PlaygroundEditor } from './editor';

const app = createRoot(document.getElementById('root')!);

app.render(<PlaygroundEditor />);
