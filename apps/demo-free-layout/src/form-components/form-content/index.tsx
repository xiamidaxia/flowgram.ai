import React from 'react';

import { FlowNodeRegistry, useNodeRender } from '@flowgram.ai/free-layout-editor';

import { FormTitleDescription, FormWrapper } from './styles';

/**
 * @param props
 * @constructor
 */
export function FormContent(props: { children?: React.ReactNode }) {
  const { expanded, node } = useNodeRender();
  const registry = node.getNodeRegistry<FlowNodeRegistry>();
  return (
    <FormWrapper>
      {expanded ? (
        <>
          <FormTitleDescription>{registry.info?.description}</FormTitleDescription>
          {props.children}
        </>
      ) : undefined}
    </FormWrapper>
  );
}
