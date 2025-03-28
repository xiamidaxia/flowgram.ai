import { nanoid } from 'nanoid';

import { FlowNodeRegistry } from '../../typings';
import iconTryCatch from '../../assets/icon-trycatch.svg';

export const TryCatchNodeRegistry: FlowNodeRegistry = {
  type: 'tryCatch',
  info: {
    icon: iconTryCatch,
    description: 'try catch.',
  },
  meta: {
    expandable: false, // disable expanded
  },
  onAdd() {
    return {
      id: `tryCatch${nanoid(5)}`,
      type: 'tryCatch',
      data: {
        title: 'TryCatch',
      },
    };
  },
};
