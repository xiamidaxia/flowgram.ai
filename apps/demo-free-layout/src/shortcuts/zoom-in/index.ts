import {
  FreeLayoutPluginContext,
  PlaygroundConfigEntity,
  ShortcutsHandler,
} from '@flowgram.ai/free-layout-editor';

import { FlowCommandId } from '../constants';

export class ZoomInShortcut implements ShortcutsHandler {
  public commandId = FlowCommandId.ZOOM_IN;

  public shortcuts = ['meta =', 'ctrl ='];

  private playgroundConfig: PlaygroundConfigEntity;

  constructor(context: FreeLayoutPluginContext) {
    this.playgroundConfig = context.get(PlaygroundConfigEntity);
  }

  public async execute(): Promise<void> {
    if (this.playgroundConfig.zoom > 1.9) {
      return;
    }
    this.playgroundConfig.zoomin();
  }
}
