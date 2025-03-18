import React from 'react';

import { NodeRenderReturnType } from './typings';

export const NodeRenderContext = React.createContext<NodeRenderReturnType>({} as any);
