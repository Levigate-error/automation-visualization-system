import { useReactFlow } from "@xyflow/react";
import { TNodeData, Node } from "@/types";
import { useState } from "react";
import { useAutomationContext } from "@/context/automation-context";
import { useAppDispatch } from "@/store";
import { updateAutomationNodes } from "@/store/automation";

export const useMutateNodeData = () => {
  const { setNodes } = useReactFlow();
  const { automationId } = useAutomationContext();
  const [editorOpen, setEditorOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (id: string) => (data: TNodeData["value"]) => {
    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                value: data,
              },
            }
          : node
      );

      dispatch(
        updateAutomationNodes({ automationId, nodes: updatedNodes as Node[] })
      );

      return updatedNodes;
    });
  };

  const handleToggleEditor = () => setEditorOpen((prevState) => !prevState);

  return { handleChange, handleToggleEditor, editorOpen };
};
