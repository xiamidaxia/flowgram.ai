export interface IWorkflowRuntimeModel {
  run: () => Promise<void>;
}
