import React from 'react';

import { PrivateScopeProvider, VarJSONSchema } from '@flowgram.ai/editor';

import { VariableSelector, VariableSelectorProps } from '../variable-selector';

const batchVariableSchema: VarJSONSchema.ISchema = {
  type: 'array',
  extra: { weak: true },
};

export function BatchVariableSelector(props: VariableSelectorProps) {
  return (
    <PrivateScopeProvider>
      <VariableSelector {...props} includeSchema={batchVariableSchema} />
    </PrivateScopeProvider>
  );
}
