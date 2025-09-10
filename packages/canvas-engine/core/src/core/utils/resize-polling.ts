/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Disposable } from '@flowgram.ai/utils';

const POLLING_MAX_TIME = 5000;
const POLLING_INTERVAL = 100;

/**
 * ResizeObserver 在有动画情况不准确，需要轮循兜底执行 resize 几秒
 */
export class ResizePolling implements Disposable {
  private _intervalKey?: number;

  private _startTime = 0;

  start(fn: () => boolean) {
    if (this._intervalKey !== undefined) {
      clearInterval(this._intervalKey);
    }
    this._startTime = Date.now();
    this._intervalKey = window.setInterval(() => {
      const success = fn();
      if (!success || Date.now() - this._startTime >= POLLING_MAX_TIME) {
        clearInterval(this._intervalKey);
      }
    }, POLLING_INTERVAL);
  }

  dispose() {
    if (this._intervalKey !== undefined) {
      clearInterval(this._intervalKey);
    }
    this._intervalKey = undefined;
  }
}
