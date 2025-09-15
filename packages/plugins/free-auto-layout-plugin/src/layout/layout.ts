/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Rectangle } from '@flowgram.ai/utils';

import { ILayout, LayoutConfig, LayoutNode, LayoutOptions, LayoutParams, LayoutSize } from './type';
import { LayoutStore } from './store';
import { LayoutPosition } from './position';
import { DagreLayout } from './dagre';

export class Layout implements ILayout {
  private readonly _store: LayoutStore;

  private readonly _layout: DagreLayout;

  private readonly _position: LayoutPosition;

  constructor(config: LayoutConfig) {
    this._store = new LayoutStore(config);
    this._layout = new DagreLayout(this._store);
    this._position = new LayoutPosition(this._store);
  }

  public init(params: LayoutParams, options: LayoutOptions): void {
    this._store.create(params, options);
  }

  public layout(): void {
    if (!this._store.initialized) {
      return;
    }
    this._layout.layout();
  }

  public async position(): Promise<void> {
    if (!this._store.initialized) {
      return;
    }
    return await this._position.position();
  }

  public get size(): LayoutSize {
    if (!this._store.initialized) {
      return Rectangle.EMPTY;
    }
    const rects = this._store.nodes.map((node) => this.layoutNodeRect(node));
    const rect = Rectangle.enlarge(rects);
    const { padding } = this._store.container.entity.transform;
    return {
      width: rect.width + padding.left + padding.right,
      height: rect.height + padding.top + padding.bottom,
    };
  }

  private layoutNodeRect(layoutNode: LayoutNode): Rectangle {
    const { width, height } = layoutNode.size;
    const { x, y } = layoutNode.position;
    return new Rectangle(x, y, width, height);
  }
}
