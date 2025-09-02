/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { inject, injectable } from 'inversify';
import { Layer, observeEntityDatas, observeEntity, PlaygroundConfigEntity, TransformData } from '@flowgram.ai/core';
import { FlowNodeEntity } from '@flowgram.ai/document'
import { domUtils } from '@flowgram.ai/utils';

import { MinimapLayerOptions } from './type';
import { FlowMinimapService } from './service';
import { MinimapRender } from './component';

@injectable()
export class FlowMinimapLayer extends Layer<MinimapLayerOptions> {
  public static type = 'FlowMinimapLayer';

  @inject(FlowMinimapService) private readonly service: FlowMinimapService;
  @observeEntityDatas(FlowNodeEntity, TransformData) transformDatas: TransformData[];
  @observeEntity(PlaygroundConfigEntity) configEntity: PlaygroundConfigEntity;

  public readonly node: HTMLElement;

  private readonly className = 'gedit-minimap-layer gedit-playground-layer';

  constructor() {
    super();
    this.node = domUtils.createDivWithClass(this.className);
    this.node.style.zIndex = '9999';
  }

  public render(): JSX.Element {
    this.service.render()
    if (this.options.disableLayer) {
      return <></>;
    }
    return (
      <MinimapRender
        service={this.service}
        panelStyles={this.options.panelStyles}
        containerStyles={this.options.containerStyles}
        inactiveStyle={this.options.inactiveStyle}
      />
    );
  }
}
