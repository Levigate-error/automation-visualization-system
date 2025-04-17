import { TAutomationResponse } from "@/types/automation-response";
import { Edge, Node } from "@/types";
import { adaptComponentsToGraph } from "@/utils/data-to-graph-adaptor";

export class Automation {
  id: string;
  name: string;
  description: string;
  count: number;
  nodes: Node[] = [];
  edges: Edge[] = [];

  constructor(data: Partial<TAutomationResponse>) {
    this.id = data.id || "";
    this.name = data.content?.find(({ id }) => id === "name")?.value || "";
    this.description =
      data.content?.find(({ id }) => id === "description")?.value || "";

    const localCount = data.content?.find(
      ({ id }) => id === "count_files"
    )?.value;
    this.count = localCount ? Number(localCount) : 0;
    const { nodes: localNodes, edges: localEdges } = adaptComponentsToGraph(
      data.components
    );
    this.nodes = localNodes;
    this.edges = localEdges;
  }
}
