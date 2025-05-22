import { nanoid } from 'nanoid';
import { Field, FieldArray } from '@flowgram.ai/free-layout-editor';
import { IFlowValue, VariableSelector } from '@flowgram.ai/form-materials';
import { Button } from '@douyinfe/semi-ui';
import { IconPlus, IconCrossCircleStroked } from '@douyinfe/semi-icons';

import { useIsSidebar } from '../../../hooks';
import { FormItem } from '../../../form-components';
import { Feedback } from '../../../form-components';
import { ConditionPort } from './styles';

interface ConditionValue {
  key: string;
  value: IFlowValue;
}

export function ConditionInputs() {
  const readonly = !useIsSidebar();
  return (
    <FieldArray name="conditions">
      {({ field }) => (
        <>
          {field.map((child, index) => (
            <Field<ConditionValue> key={child.name} name={child.name}>
              {({ field: childField, fieldState: childState }) => (
                <FormItem name="if" type="boolean" required={true} labelWidth={40}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <VariableSelector
                      style={{ width: '100%' }}
                      value={childField.value?.value?.content as string[]}
                      onChange={(v) =>
                        childField.onChange({
                          key: childField.value.key,
                          value: { type: 'ref', content: v },
                        })
                      }
                      hasError={Object.keys(childState?.errors || {}).length > 0}
                      readonly={readonly}
                    />

                    <Button
                      theme="borderless"
                      icon={<IconCrossCircleStroked />}
                      onClick={() => field.delete(index)}
                    />
                  </div>

                  <Feedback errors={childState?.errors} invalid={childState?.invalid} />
                  <ConditionPort data-port-id={childField.value.key} data-port-type="output" />
                </FormItem>
              )}
            </Field>
          ))}
          {!readonly && (
            <div>
              <Button
                theme="borderless"
                icon={<IconPlus />}
                onClick={() =>
                  field.append({
                    key: `if_${nanoid(6)}`,
                    value: { type: 'expression', content: '' },
                  })
                }
              >
                Add
              </Button>
            </div>
          )}
        </>
      )}
    </FieldArray>
  );
}
