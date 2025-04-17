import React, { DragEvent } from "react";
import { useDnD } from "@/context/dnd-context";
import { useContentTemplates } from "@/hooks/use-content-templates";
import { ENodeType } from "@/types/enums";
import "./sidebar.scss";

const Sidebar = () => {
  const [, setType] = useDnD();

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: ENodeType
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const { data } = useContentTemplates();

  const handleDrag = (type?: ENodeType) => (event: DragEvent<HTMLDivElement>) =>
    type ? onDragStart(event, type) : undefined;

  return (
    <aside>
      {data.map((item) => (
        <div
          className="dndnode component-templates"
          key={`dnd-node-${item.type}`}
          onDragStart={handleDrag(item.type)}
          draggable
        >
          <p>{item.label}</p>
        </div>
      ))}
    </aside>
  );
};

export { Sidebar };
