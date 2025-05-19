import { FixedLayoutEditorProvider, EditorRenderer } from '@flowgram.ai/fixed-layout-editor';

import '@flowgram.ai/fixed-layout-editor/index.css';
import './index.css';

import { nodeRegistries } from './node-registries';
import { initialData } from './initial-data';
import { useEditorProps } from './hooks/use-editor-props';
import { Tools } from './components/tools';
import { Minimap } from './components/minimap';
import { FlowSelect } from './components/flow-select';

export const Editor = () => {
  const editorProps = useEditorProps(initialData, nodeRegistries);
  return (
    <FixedLayoutEditorProvider {...editorProps}>
      <div className="demo-fixed-container">
        <EditorRenderer>{/* add child panel here */}</EditorRenderer>
      </div>
      <Tools />
      <FlowSelect />
      <Minimap />
    </FixedLayoutEditorProvider>
  );
};
