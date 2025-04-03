import { EditorRenderer, FreeLayoutEditorProvider } from '@flowgram.ai/free-layout-editor';

import '@flowgram.ai/free-layout-editor/index.css';
import { useEditorProps } from '../hooks/use-editor-props';
import { Tools } from './tools';

export const Editor = () => {
  const editorProps = useEditorProps();
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <Tools />
      <EditorRenderer className="mastra-workflow-editor" />
    </FreeLayoutEditorProvider>
  );
};
