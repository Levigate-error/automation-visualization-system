import React, {
  DragEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AccordionItem } from "@szhsin/react-accordion";
import {
  addEdge,
  Background,
  Connection,
  getConnectedEdges,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
  useReactFlow,
} from "@xyflow/react";
import { useDnD } from "@/context/dnd-context";
import { Automation } from "@/requests/automation";
import { AutomationCardHeader } from "@/modules/automation-card-header/automation-card-header";
import { nodeTypes } from "@/modules/node-types";
import "./automation-card.scss";
import { Edge } from "@/types";
import { useAppDispatch } from "@/store";
import { addAutomationNode, updateAutomationEdges } from "@/store/automation";
import { AutomationProvider } from "@/context/automation-context";
import { ENodeType } from "@/types/enums";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

type AutomationCardProps = {
  automation: Automation;
};

let nodeId = 0;
const getNodeId = () => `dndnode_${nodeId++}`;

export const AutomationCard = (props: AutomationCardProps) => {
  const {
    automation: { id, count, name, edges: initialEdges, nodes: initialNodes },
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [highlightedEdges, setHighlightedEdges] = useState<string[]>([]);

  const validateConnection = (params: Connection) => {
    const targetNode = nodes.find((node) => node.id === params.target);
    const sourceNode = nodes.find((node) => node.id === params.source);
    if (!sourceNode || !targetNode) return false;
    if (
      targetNode.type === ENodeType.DIALOGUE_DATE_GTE &&
      sourceNode.type === ENodeType.DIALOGUE_DATE_GTE &&
      dayjs(sourceNode.data.value as string, "DD.MM.YYYY").isAfter(
        dayjs(targetNode.data.value as string, "DD.MM.YYYY")
      )
    ) {
      return false;
    }
    if (
      targetNode.type === ENodeType.DIALOGUE_DATE_LTE &&
      sourceNode.type === ENodeType.DIALOGUE_DATE_LTE &&
      dayjs(sourceNode.data.value as string, "DD.MM.YYYY").isBefore(
        dayjs(targetNode.data.value as string, "DD.MM.YYYY")
      )
    ) {
      return false;
    }
    if (
      targetNode.type === ENodeType.DIALOGUE_DATE_LTE &&
      sourceNode.type === ENodeType.DIALOGUE_DATE_GTE
    ) {
      return false;
    }

    return !dayjs(sourceNode.data.value as string, "DD.MM.YYYY").isBefore(
      dayjs(targetNode.data.value as string, "DD.MM.YYYY")
    );
  };

  const onConnect: OnConnect = useCallback(
    (params) =>
      validateConnection(params)
        ? setEdges((eds) => {
            const localEdges = addEdge(params, eds);
            dispatch(
              updateAutomationEdges({ automationId: id, edges: localEdges })
            );

            return localEdges;
          })
        : enqueueSnackbar("Произошла ошибка при построении связи", {
            variant: "error",
          }),
    [setEdges, addEdge, nodes]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeId = getNodeId();
      const newNode = {
        id: newNodeId,
        type,
        position,
        data: {
          id: newNodeId,
          type,
          value:
            type === ENodeType.AUTOMATION_AGENT
              ? {
                  name: "Агент возражений",
                  description: "Агент",
                }
              : undefined,
        },
      };
      setNodes((nds) => nds.concat(newNode));
      dispatch(addAutomationNode({ automationId: id, node: newNode }));
    },
    [screenToFlowPosition, type]
  );

  const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.effectAllowed = "move";
  };

  useOnSelectionChange({
    onChange: ({ nodes: localNodes }) => {
      const connectedEdges = localNodes.reduce(
        (acc, node) => [...acc, ...getConnectedEdges([node], edges)],
        [] as Edge[]
      );

      setHighlightedEdges(connectedEdges.map((e) => e.id));
    },
  });

  const edgesWithClasses = edges.map((edge) =>
    highlightedEdges.includes(edge.id)
      ? {
          ...edge,
          className: "highlighted",
        }
      : edge
  );

  useEffect(() => {
    const localNodes = initialNodes.map((node) => {
      const foundNode = nodes.find((item) => item.id === node.id);

      if (foundNode) {
        return {
          ...node,
          position: foundNode.position,
        };
      }

      return node;
    });
    setNodes(localNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  return (
    <AccordionItem header={<AutomationCardHeader name={name} count={count} />}>
      <AutomationProvider automationId={id}>
        <div style={{ width: "100%", height: "600px" }}>
          <ReactFlow
            fitView
            nodes={nodes}
            edges={edgesWithClasses}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            style={{ backgroundColor: "#F7F9FB" }}
            nodeTypes={nodeTypes}
          >
            <Background />
          </ReactFlow>
        </div>
      </AutomationProvider>
    </AccordionItem>
  );
};
