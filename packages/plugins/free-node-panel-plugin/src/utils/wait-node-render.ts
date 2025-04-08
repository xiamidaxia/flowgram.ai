import { delay } from '@flowgram.ai/free-layout-core';

export type IWaitNodeRender = () => Promise<void>;

export const waitNodeRender: IWaitNodeRender = async () => {
  await delay(20);
};
