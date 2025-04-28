import { runFreeLayoutTest } from '../__mocks__/run-free-layout-test';
import { freeLayout1 } from '../__mocks__/free-layout-specs';

runFreeLayoutTest('Variable Free Layout Enable Global Scope', freeLayout1, {
  enableGlobalScope: true,
});
