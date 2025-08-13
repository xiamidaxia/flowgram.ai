/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { interfaces } from 'inversify';
import { FlowRendererContainerModule, FlowRendererRegistry } from '@flowgram.ai/renderer';
import { createReduxDevToolPlugin } from '@flowgram.ai/redux-devtool-plugin';
import { createNodeVariablePlugin } from '@flowgram.ai/node-variable-plugin';
import { createNodeCorePlugin } from '@flowgram.ai/node-core-plugin';
import { createMaterialsPlugin } from '@flowgram.ai/materials-plugin';
import { createI18nPlugin } from '@flowgram.ai/i18n-plugin';
import { createHistoryNodePlugin } from '@flowgram.ai/history-node-plugin';
import { FlowDocumentContainerModule } from '@flowgram.ai/document';
import { createPlaygroundPlugin, Plugin, PluginsProvider } from '@flowgram.ai/core';

import { createFlowEditorClientPlugins } from '../clients/flow-editor-client-plugins';
import { EditorPluginContext, EditorProps } from './editor-props';

export function createDefaultPreset<CTX extends EditorPluginContext = EditorPluginContext>(
  opts: EditorProps<CTX>,
  plugins: Plugin[] = []
): PluginsProvider<CTX> {
  return (ctx: CTX) => {
    opts = { ...EditorProps.DEFAULT, ...opts };
    /**
     * i18n support
     */
    if (opts.i18n) {
      plugins.push(createI18nPlugin(opts.i18n));
    }
    /**
     * 默认注册顶层 flow editor client plugin
     */
    plugins.push(...createFlowEditorClientPlugins());

    /**
     * 注册 Redux 开发者工具
     */
    if (opts.reduxDevTool?.enable) {
      plugins.push(createReduxDevToolPlugin(opts.reduxDevTool));
    }

    /**
     * 注册画布模块
     */
    const defaultContainerModules: interfaces.ContainerModule[] = [
      FlowDocumentContainerModule, // 默认文档
      FlowRendererContainerModule, // 默认渲染
    ];
    /**
     * 注册物料
     */
    plugins.push(createMaterialsPlugin(opts.materials || {}));

    /**
     * 注册节点引擎
     */
    if (opts.nodeEngine && opts.nodeEngine.enable !== false) {
      plugins.push(createNodeCorePlugin({ materials: opts.nodeEngine.materials }));

      if (opts.variableEngine?.enable) {
        plugins.push(createNodeVariablePlugin({}));
      }

      if (opts.history?.enable) {
        plugins.push(createHistoryNodePlugin({}));
      }
    }
    /**
     * 画布生命周期注册
     */
    plugins.push(
      createPlaygroundPlugin<CTX>({
        onInit: (ctx) => {
          if (opts.nodeRegistries) {
            ctx.document.registerFlowNodes(...opts.nodeRegistries);
          }
          // 自定义画布内部常量
          if (opts.constants) {
            ctx.document.options.constants = opts.constants;
          }
          if (opts.getNodeDefaultRegistry) {
            ctx.document.options.getNodeDefaultRegistry = opts.getNodeDefaultRegistry;
          }
          // TODO
          // if (opts.onContentChange) {
          //   ctx.document.onContentChange(event => opts.onContentChange!(ctx, event));
          // }
          // TODO 这个会触发组件注册，后续要废弃这个，通过 materials 插件来做
          ctx.get<FlowRendererRegistry>(FlowRendererRegistry).init();
        },
        onReady(ctx) {
          if (opts.initialData) {
            ctx.document.fromJSON(opts.initialData);
          }
          if (opts.readonly) {
            ctx.playground.config.readonly = opts.readonly;
          }
          ctx.document.load().then(() => {
            if (opts.onLoad) opts.onLoad(ctx);
          });
        },
        onDispose(ctx) {
          ctx.document.dispose();
        },
        containerModules: defaultContainerModules,
      })
    );

    return plugins;
  };
}
