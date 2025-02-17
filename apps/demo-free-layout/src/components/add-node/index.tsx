import { useState } from 'react';

import { Button } from '@douyinfe/semi-ui';
import { Popover } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';

import { NodeList } from './node-list';

export const AddNode = (props: { disabled: boolean }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      visible={visible}
      onVisibleChange={props.disabled ? () => {} : setVisible}
      content={!props.disabled && <NodeList />}
      placement="right"
      trigger="click"
      popupAlign={{ offset: [30, 0] }}
      overlayStyle={{
        padding: 0,
      }}
    >
      <Button icon={<IconPlus />} color="highlight" disabled={props.disabled}>
        Add Node
      </Button>
    </Popover>
  );
};
