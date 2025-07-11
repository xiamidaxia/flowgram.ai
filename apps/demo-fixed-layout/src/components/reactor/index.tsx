import { IFormMeta } from '@flow-ide-editor/form-core';
import { createFixedReactorPlugin } from '@flow-ide-editor/fixed-reactor-plugin';

import ReactorPort from './reactor-port';
import { ReactorCollapse } from './reactor-collapse';

export const createReactorPlugin = () =>
  createFixedReactorPlugin({
    shrink: true,
    renderReactorCollapse: ReactorCollapse,
    renderReactorPort: ReactorPort,
    extendReactorPortRegistry: {
      formMeta: {
        root: {
          name: 'root',
          type: 'object',
          children: [
            {
              name: 'slot',
              type: 'object',
            },
          ],
        },
      } as IFormMeta,
    },
  });
