import { DataEvent, defineFormPluginCreator } from '@flowgram.ai/node';

export const createVariableProviderPlugin = defineFormPluginCreator({
  name: 'VariableProviderPlugin',
  onInit: (ctx, opts) => {
    // todo
    // console.log('>>> VariableProviderPlugin init', ctx, opts);
  },
  onSetupFormMeta({ mergeEffect }) {
    mergeEffect({
      arr: [
        {
          event: DataEvent.onValueInitOrChange,
          effect: () => {
            // todo
            // console.log('>>> VariableProviderPlugin effect triggered');
          },
        },
      ],
    });
  },
  onDispose: (ctx, opts) => {
    // todo
    // console.log('>>> VariableProviderPlugin dispose', ctx, opts);
  },
});
