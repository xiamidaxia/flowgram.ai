import { FlowNodeRegistry } from '../../typings';
import iconCase from '../../assets/icon-case.png';
import { formMeta } from './form-meta';

export const CaseDefaultNodeRegistry: FlowNodeRegistry = {
  type: 'caseDefault',
  /**
   * 分支节点需要继承自 block
   * Branch nodes need to inherit from 'block'
   */
  extend: 'case',
  meta: {
    copyDisable: true,
    addDisable: true,
    deleteDisable: true,
    style: {
      width: 240,
    },
  },
  info: {
    icon: iconCase,
    description: 'Condition default branch',
  },
  canDelete: (ctx, node) => false,
  formMeta,
};
