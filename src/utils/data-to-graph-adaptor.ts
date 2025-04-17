import { Edge, Node } from "@/types";
import { TAutomationNodeResponse } from "@/types/automation-response";
import { ENodeType } from "@/types/enums";

export const adaptComponentsToGraph = (
  components: TAutomationNodeResponse[] | undefined
) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  if (!components) {
    return { nodes, edges };
  }

  const spacingX = 300;
  const spacingY = 150;
  const nodeMap = new Map<string, TAutomationNodeResponse>();

  components.forEach((component) => nodeMap.set(component.id, component));

  const roots = components.filter((c) => !c.target);
  const visited = new Set<string>();
  let column = 0;

  const placeNode = (
    node: TAutomationNodeResponse,
    level: number,
    col: number
  ) => {
    if (node.type_object === ENodeType.SELECTED_MARKER)
      if (visited.has(node.id)) return;
    visited.add(node.id);
    let nodeValue:
      | { name?: string; description?: string }
      | string
      | number
      | undefined;
    let options: { id: string; label: string }[] | undefined | null;

    switch (node.type_object) {
      case ENodeType.AUTOMATION_AGENT:
        nodeValue = {
          name: node.content.find((item) => item.id === "name")?.value,
          description: node.content.find((item) => item.id === "description")
            ?.value,
        };
        break;
      case ENodeType.SELECTED_MARKER:
        const itemNode = node.content.find((item) => item.id === "Маркер");
        nodeValue = itemNode?.value;
        options = itemNode?.options;
        break;
      default:
        nodeValue = node.content.find(
          (item) => item.id === "duration_minutes"
        )?.value;
    }

    nodes.push({
      id: node.id,
      type: node.type_object,
      data: { id: node.id, type: node.type_object, value: nodeValue, options },
      position: {
        x: col * spacingX,
        y: level * spacingY,
      },
    });

    const children = components.filter((c) => c.target === node.id);
    children.forEach((child, i) => {
      edges.push({
        id: `${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
      });

      placeNode(child, level + 1, col + i); // Разносим немного по колонкам
    });
  };

  roots.forEach((root) => {
    placeNode(root, 0, column);
    column += 1;
  });

  return { nodes, edges };
};
