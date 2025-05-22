import { VarJSONSchema } from '@flowgram.ai/editor';

export interface Strategy<Value = any> {
  hit: (schema: VarJSONSchema.ISchema) => boolean;
  Renderer: React.FC<RendererProps<Value>>;
}

export interface RendererProps<Value = any> {
  value?: Value;
  onChange?: (value: Value) => void;
  readonly?: boolean;
}

export interface PropsType extends RendererProps {
  schema: VarJSONSchema.ISchema;
  strategies?: Strategy[];
  [key: string]: any;
}
