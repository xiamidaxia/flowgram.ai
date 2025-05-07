import { inject, injectable } from 'inversify';
import {
  WorkflowDocument,
  WorkflowNodeEntity,
  WorkflowNodeLinesData,
} from '@flowgram.ai/free-layout-core';
import { FlowNodeBaseType } from '@flowgram.ai/document';

import { Layout, type LayoutOptions } from './layout';

@injectable()
export class AutoLayoutService {
  @inject(WorkflowDocument) private readonly document: WorkflowDocument;

  public async layout(options: LayoutOptions = {}): Promise<void> {
    await this.layoutNode(this.document.root, options);
  }

  private async layoutNode(node: WorkflowNodeEntity, options: LayoutOptions): Promise<void> {
    // 获取子节点
    const nodes = this.getAvailableBlocks(node);
    if (!nodes || !Array.isArray(nodes) || !nodes.length) {
      return;
    }

    // 获取子线条
    const edges = node.blocks
      .map((child) => {
        const childLinesData = child.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData);
        return childLinesData.outputLines.filter(Boolean);
      })
      .flat();

    // 先递归执行子节点 autoLayout
    await Promise.all(nodes.map(async (child) => this.layoutNode(child, options)));

    const layout = new Layout();
    layout.init({ nodes, edges }, options);
    layout.layout();
    await layout.position();
  }

  private getAvailableBlocks(node: WorkflowNodeEntity): WorkflowNodeEntity[] {
    const commonNodes = node.blocks.filter((n) => !this.shouldFlatNode(n));
    const flatNodes = node.blocks
      .filter((n) => this.shouldFlatNode(n))
      .map((flatNode) => flatNode.blocks)
      .flat();
    return [...commonNodes, ...flatNodes];
  }

  private shouldFlatNode(node: WorkflowNodeEntity): boolean {
    // Group 节点不参与自动布局
    return node.flowNodeType === FlowNodeBaseType.GROUP;
  }
}
