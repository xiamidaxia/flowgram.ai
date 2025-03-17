import { useCallback, useState, type MouseEvent } from 'react';

import {
  Command,
  Field,
  FieldRenderProps,
  useClientContext,
  useNodeRender,
  useService,
} from '@flowgram.ai/free-layout-editor';
import { NodeIntoContainerService } from '@flowgram.ai/free-container-plugin';
import { IconButton, Dropdown, Typography } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';

import { Feedback } from '../feedback';
import { FlowNodeRegistry } from '../../typings';
import { getIcon } from './utils';
import { Header, Operators, Title } from './styles';

const { Text } = Typography;

function DropdownButton() {
  const [key, setKey] = useState(0);
  const { node, deleteNode } = useNodeRender();
  const clientContext = useClientContext();
  const registry = node.getNodeRegistry<FlowNodeRegistry>();
  const nodeIntoContainerService = useService<NodeIntoContainerService>(NodeIntoContainerService);
  const canMoveOut = nodeIntoContainerService.canMoveOutContainer(node);

  const rerenderMenu = useCallback(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);

  const handleMoveOut = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      nodeIntoContainerService.moveOutContainer({ node });
      nodeIntoContainerService.removeNodeLines(node);
      requestAnimationFrame(rerenderMenu);
    },
    [nodeIntoContainerService, node, rerenderMenu]
  );

  const handleCopy = useCallback(() => {
    clientContext.playground.commandService.executeCommand(Command.Default.COPY, node);
  }, [clientContext, node]);
  return (
    <Dropdown
      trigger="hover"
      position="bottomRight"
      onVisibleChange={rerenderMenu}
      render={
        <Dropdown.Menu key={key}>
          {canMoveOut && <Dropdown.Item onClick={handleMoveOut}>Move out</Dropdown.Item>}
          <Dropdown.Item onClick={handleCopy} disabled={registry.meta!.copyDisable === true}>
            Copy
          </Dropdown.Item>
          <Dropdown.Item
            onClick={deleteNode}
            disabled={!!(registry.canDelete?.(clientContext, node) || registry.meta!.deleteDisable)}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <IconButton
        color="secondary"
        size="small"
        theme="borderless"
        icon={<IconMore />}
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );
}

export function FormHeader() {
  const { node, readonly } = useNodeRender();

  return (
    <Header>
      {getIcon(node)}
      <Title>
        <Field name="title">
          {({ field: { value, onChange }, fieldState }: FieldRenderProps<string>) => (
            <div style={{ height: 24 }}>
              <Text ellipsis={{ showTooltip: true }}>{value}</Text>
              <Feedback errors={fieldState?.errors} />
            </div>
          )}
        </Field>
      </Title>
      {readonly ? undefined : (
        <Operators>
          <DropdownButton />
        </Operators>
      )}
    </Header>
  );
}
