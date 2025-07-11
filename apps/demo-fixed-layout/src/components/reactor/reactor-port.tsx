import React from 'react';

import { nanoid } from 'nanoid';
import { Button, Dialog, InputNumber } from '@universe-design/react';
import { AddBoldOutlined } from '@universe-design/icons-react';
import { ReactorNodeType } from '@flow-ide-editor/fixed-reactor-plugin';
import { type FlowNodeEntity, FlowNodeRenderData, FlowDocument } from '@flow-ide-editor/document';
import { useService } from '@flow-ide-editor/core';

interface PropsType {
  port: FlowNodeEntity;
}

let portCount = 2;

export default function ReactorPort(props: PropsType) {
  const { port: node } = props;

  const nodeData = node.firstChild?.getData<FlowNodeRenderData>(FlowNodeRenderData);
  const document = useService(FlowDocument) as FlowDocument;

  async function addPort() {
    Dialog.info({
      title: 'Add Node In Port',
      content: (
        <div>
          ChildPortCount:{' '}
          <InputNumber defaultValue={portCount} onChange={(_num) => (portCount = _num || 0)} />
        </div>
      ),
      onOk: () => {
        const childBlocks = new Array(portCount).fill({}).map((_) => ({
          type: ReactorNodeType.ReactorPort,
          id: nanoid(5),
        }));

        document.addNode({
          type: ReactorNodeType.Reactor,
          id: nanoid(5),
          parent: node,
          blocks: childBlocks,
        });
      },
    });
  }

  // return null

  return (
    <div
      style={{
        display: 'flex',
        borderRadius: 9,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
      }}
      onMouseEnter={() => nodeData?.toggleMouseEnter()}
      onMouseLeave={() => nodeData?.toggleMouseLeave()}
    >
      <Button
        onClick={() => {
          addPort();
        }}
        size="extra-small"
        icon={<AddBoldOutlined />}
      />
    </div>
  );
}
