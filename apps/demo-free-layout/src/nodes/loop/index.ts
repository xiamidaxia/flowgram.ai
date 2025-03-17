import { nanoid } from 'nanoid';
import { ContainerNodeRenderKey } from '@flowgram.ai/free-container-plugin';

import { FlowNodeRegistry } from '../../typings';
import iconLoop from '../../assets/icon-loop.jpg';

let index = 0;
export const LoopNodeRegistry: FlowNodeRegistry = {
  type: 'loop',
  info: {
    icon: iconLoop,
    description:
      'Used to repeatedly execute a series of tasks by setting the number of iterations and logic.',
  },
  meta: {
    renderKey: ContainerNodeRenderKey,
    isContainer: true,
    size: {
      width: 560,
      height: 400,
    },
    padding: () => ({
      top: 205,
      bottom: 50,
      left: 100,
      right: 100,
    }),
  },
  onAdd() {
    return {
      id: `loop_${nanoid(5)}`,
      type: 'loop',
      data: {
        title: `Loop_${++index}`,
        inputsValues: {},
        inputs: {
          type: 'object',
          required: ['loopTimes'],
          properties: {
            loopTimes: {
              type: 'number',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: { type: 'string' },
          },
        },
      },
    };
  },
  onCreate() {
    // NOTICE: 这个函数是为了避免触发固定布局 flowDocument.addBlocksAsChildren
  },
};
