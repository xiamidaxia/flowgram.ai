import {
  ASTKind,
  definePluginCreator,
  FlowNodeVariableData,
  getNodeForm,
  PluginCreator,
  FreeLayoutPluginContext,
} from '@flowgram.ai/free-layout-editor';

import { createASTFromJSONSchema } from './utils';

export interface VariablePluginOptions {}

export const createVariablePlugin: PluginCreator<VariablePluginOptions> = definePluginCreator<
  VariablePluginOptions,
  FreeLayoutPluginContext
>({
  onInit(ctx, options) {
    const flowDocument = ctx.document;

    /**
     * Listens to the creation of nodes and synchronizes outputs data to the variable engine
     * 监听节点的创建，并将 outputs 数据同步给变量引擎
     */
    flowDocument.onNodeCreate(({ node }) => {
      const form = getNodeForm(node);
      const variableData = node.getData<FlowNodeVariableData>(FlowNodeVariableData);

      const syncOutputs = (value: any) => {
        if (!value) {
          variableData.public.ast.remove('outputs');
          return;
        }

        const typeAST = createASTFromJSONSchema(value);

        if (typeAST) {
          const title = form?.getValueIn('title') || node.id;
          variableData.public.ast.set('outputs', {
            kind: ASTKind.VariableDeclaration,
            meta: {
              title: `${title}.outputs`,
            },
            key: `${node.id}.outputs`,
            type: typeAST,
          });
          return;
        } else {
          variableData.public.ast.remove('outputs');
        }
      };
      if (form) {
        syncOutputs(form.getValueIn('outputs'));
        // Listen outputs change
        form.onFormValuesChange(props => {
          if (props.name.match(/^outputs/)) {
            syncOutputs(form.getValueIn('outputs'));
          }
        });
      }
    });
  },
});
