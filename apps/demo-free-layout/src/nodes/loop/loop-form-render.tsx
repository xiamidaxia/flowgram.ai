import { FormRenderProps, FlowNodeJSON } from '@flowgram.ai/free-layout-editor';
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';

import { FormHeader, FormContent, FormInputs, FormOutputs } from '../../form-components';

export const LoopFormRender = ({ form }: FormRenderProps<FlowNodeJSON>) => (
  <>
    <FormHeader />
    <FormContent>
      <FormInputs />
      <SubCanvasRender />
      <FormOutputs />
    </FormContent>
  </>
);
