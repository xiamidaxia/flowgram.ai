import type { IWorkflowRuntimeModel } from './type';

export class WorkflowRuntimeModel implements IWorkflowRuntimeModel {
  private static _instance?: WorkflowRuntimeModel;

  public static get instance(): WorkflowRuntimeModel {
    if (!this._instance) {
      this._instance = new WorkflowRuntimeModel();
    }
    return this._instance;
  }

  public async run(): Promise<void> {}
}
