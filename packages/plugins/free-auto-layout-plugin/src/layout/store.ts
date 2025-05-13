import { WorkflowLineEntity, WorkflowNodeEntity } from '@flowgram.ai/free-layout-core';
import { FlowNodeBaseType, FlowNodeTransformData } from '@flowgram.ai/document';

import { LayoutEdge, LayoutNode, LayoutParams } from './type';

interface LayoutStoreData {
  nodes: Map<string, LayoutNode>;
  edges: Map<string, LayoutEdge>;
}

export class LayoutStore {
  private indexMap: Map<string, string>;

  private init: boolean = false;

  private store: LayoutStoreData;

  public get initialized(): boolean {
    return this.init;
  }

  public getNode(id: string): LayoutNode | undefined {
    return this.store.nodes.get(id);
  }

  public getNodeByIndex(index: string): LayoutNode | undefined {
    const id = this.indexMap.get(index);
    return id ? this.getNode(id) : undefined;
  }

  public getEdge(id: string): LayoutEdge | undefined {
    return this.store.edges.get(id);
  }

  public get nodes(): LayoutNode[] {
    return Array.from(this.store.nodes.values());
  }

  public get edges(): LayoutEdge[] {
    return Array.from(this.store.edges.values());
  }

  public create(params: LayoutParams): void {
    this.store = this.createStore(params);
    this.indexMap = this.createIndexMap();
    this.init = true;
  }

  /** 创建布局数据 */
  private createStore(params: {
    nodes: WorkflowNodeEntity[];
    edges: WorkflowLineEntity[];
  }): LayoutStoreData {
    const { nodes, edges } = params;
    const layoutNodes = this.createLayoutNodes(nodes);
    const layoutEdges = this.createEdgesStore(edges);
    const virtualEdges = this.createVirtualEdges(params);
    const store = {
      nodes: new Map(),
      edges: new Map(),
    };
    layoutNodes.forEach((node) => store.nodes.set(node.id, node));
    layoutEdges.concat(virtualEdges).forEach((edge) => store.edges.set(edge.id, edge));
    return store;
  }

  /** 创建节点布局数据 */
  private createLayoutNodes(nodes: WorkflowNodeEntity[]): LayoutNode[] {
    const layoutNodes = nodes.map((node, index) => {
      const { bounds } = node.getData(FlowNodeTransformData);
      const layoutNode: LayoutNode = {
        id: node.id,
        entity: node,
        index: '', // 初始化时，index 未计算
        rank: -1, // 初始化时，节点还未布局，层级为-1
        order: -1, // 初始化时，节点还未布局，顺序为-1
        position: { x: bounds.center.x, y: bounds.center.y },
        offset: { x: 0, y: 0 },
        size: { width: bounds.width, height: bounds.height },
        hasChildren: node.collapsedChildren?.length > 0,
      };
      return layoutNode;
    });
    return layoutNodes;
  }

  /** 创建线条布局数据 */
  private createEdgesStore(edges: WorkflowLineEntity[]): LayoutEdge[] {
    const layoutEdges = edges
      .map((edge) => {
        const { from, to } = edge.info;
        if (!from || !to || edge.vertical) {
          return;
        }
        const layoutEdge: LayoutEdge = {
          id: edge.id,
          entity: edge,
          from,
          to,
          fromIndex: '', // 初始化时，index 未计算
          toIndex: '', // 初始化时，index 未计算
          name: edge.id,
        };
        return layoutEdge;
      })
      .filter(Boolean) as LayoutEdge[];
    return layoutEdges;
  }

  /** 创建虚拟线条数据 */
  private createVirtualEdges(params: {
    nodes: WorkflowNodeEntity[];
    edges: WorkflowLineEntity[];
  }): LayoutEdge[] {
    const { nodes, edges } = params;
    const groupNodes = nodes.filter((n) => n.flowNodeType === FlowNodeBaseType.GROUP);
    const virtualEdges = groupNodes
      .map((group) => {
        const { id: groupId, blocks = [] } = group;
        const blockIdSet = new Set(blocks.map((b) => b.id));
        const groupFromEdges = edges
          .filter((edge) => blockIdSet.has(edge.to?.id ?? ''))
          .map((edge) => {
            const { from, to } = edge.info;
            if (!from || !to || edge.vertical) {
              return;
            }
            const id = `virtual_${groupId}_${to}`;
            const layoutEdge: LayoutEdge = {
              id: id,
              entity: edge,
              from,
              to: groupId,
              fromIndex: '', // 初始化时，index 未计算
              toIndex: '', // 初始化时，index 未计算
              name: id,
            };
            return layoutEdge;
          })
          .filter(Boolean) as LayoutEdge[];
        const groupToEdges = edges
          .filter((edge) => blockIdSet.has(edge.from.id ?? ''))
          .map((edge) => {
            const { from, to } = edge.info;
            if (!from || !to || edge.vertical) {
              return;
            }
            const id = `virtual_${groupId}_${from}`;
            const layoutEdge: LayoutEdge = {
              id: id,
              entity: edge,
              from: groupId,
              to,
              fromIndex: '', // 初始化时，index 未计算
              toIndex: '', // 初始化时，index 未计算
              name: id,
            };
            return layoutEdge;
          })
          .filter(Boolean) as LayoutEdge[];
        return [...groupFromEdges, ...groupToEdges];
      })
      .flat();
    return virtualEdges;
  }

  /** 创建节点索引映射 */
  private createIndexMap(): Map<string, string> {
    const nodeIndexes = this.sortNodes();
    const nodeToIndex = new Map<string, string>();

    // 创建节点索引映射
    nodeIndexes.forEach((nodeId, nodeIndex) => {
      const node = this.getNode(nodeId);
      if (!node) {
        return;
      }
      const graphIndex = String(100000 + nodeIndex);
      nodeToIndex.set(node.id, graphIndex);
      node.index = graphIndex;
    });

    // 创建连线索引映射
    this.edges.forEach((edge) => {
      const fromIndex = nodeToIndex.get(edge.from);
      const toIndex = nodeToIndex.get(edge.to);
      if (!fromIndex || !toIndex) {
        this.store.edges.delete(edge.id);
        return;
      }
      edge.fromIndex = fromIndex;
      edge.toIndex = toIndex;
    });

    // 创建索引到节点的映射
    const indexToNode = new Map();
    nodeToIndex.forEach((index, id) => {
      indexToNode.set(index, id);
    });

    return indexToNode;
  }

  /** 节点排序 */
  private sortNodes(): Array<string> {
    // 节点 id 列表，id 可能重复
    const nodeIdList: string[] = [];

    // 第1级排序：按照 node 添加顺序排序
    this.nodes.forEach((node) => {
      nodeIdList.push(node.id);
    });

    const sameFromEdges = new Map<string, LayoutEdge[]>();
    // 第2级排序：被连线节点排序靠后
    this.edges.forEach((edge) => {
      nodeIdList.push(edge.to);
      if (edge.entity.info.fromPort) {
        const edgesForFrom = sameFromEdges.get(edge.from) || [];
        sameFromEdges.set(edge.from, [...edgesForFrom, edge]);
      }
    });

    // 第3级排序：相同 from 的节点的不同 port，根据 port y坐标排序
    sameFromEdges.forEach((edges, from) => {
      const sortedEdges = edges.sort((a, b) => {
        const aPort = a.entity.fromPort;
        const bPort = b.entity.fromPort;
        if (aPort && bPort) {
          return aPort.point.y - bPort.point.y;
        }
        return 0;
      });
      sortedEdges.forEach((edge) => {
        nodeIdList.push(edge.to);
      });
    });

    // 使用 reduceRight 去重并保留最后一个出现的节点 id
    const uniqueNodeIds: string[] = nodeIdList.reduceRight((acc: string[], nodeId: string) => {
      if (!acc.includes(nodeId)) {
        acc.unshift(nodeId);
      }
      return acc;
    }, []);

    return uniqueNodeIds;
  }
}
