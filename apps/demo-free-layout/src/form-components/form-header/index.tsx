import {
  Command,
  Field,
  FieldRenderProps,
  useClientContext,
  useNodeRender,
} from '@flowgram.ai/free-layout-editor';
import { IconButton, Dropdown, Typography } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';

import { Feedback } from '../feedback';
import { FlowNodeRegistry } from '../../typings';
import { getIcon } from './utils';
import { Header, Operators, Title } from './styles';

const { Text } = Typography;

function DropdownContent() {
  const { node, deleteNode } = useNodeRender();
  const clientContext = useClientContext();
  const registry = node.getNodeRegistry<FlowNodeRegistry>();
  const handleCopy = () => {
    clientContext.playground.commandService.executeCommand(Command.Default.COPY, node);
  };
  return (
    <Dropdown.Menu>
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
  );
}

export function FormHeader() {
  const { node, expanded, toggleExpand, readonly } = useNodeRender();

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
          <Dropdown trigger="hover" position="bottomRight" render={<DropdownContent />}>
            <IconButton
              color="secondary"
              size="small"
              theme="borderless"
              icon={<IconMore />}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </Operators>
      )}
    </Header>
  );
}
