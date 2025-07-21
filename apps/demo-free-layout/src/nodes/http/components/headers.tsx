/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Field } from '@flowgram.ai/free-layout-editor';
import { IFlowConstantRefValue, InputsValues } from '@flowgram.ai/form-materials';

import { useNodeRenderContext } from '../../../hooks';
import { FormItem } from '../../../form-components';

export function Headers() {
  const { readonly } = useNodeRenderContext();

  return (
    <FormItem name="headers" type="object" vertical>
      <Field<Record<string, IFlowConstantRefValue> | undefined> name="headersValues">
        {({ field }) => (
          <InputsValues
            value={field.value}
            onChange={(value) => field.onChange(value)}
            readonly={readonly}
          />
        )}
      </Field>
    </FormItem>
  );
}
