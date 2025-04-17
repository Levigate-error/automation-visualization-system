import React, { useRef, useState } from "react";
import { TNodeData } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { templateLabels } from "@/consts";
import { useMutateNodeData } from "@/hooks/use-mutate-node-data";
import { Select, Tooltip } from "antd";
import { BaseSelectRef } from "rc-select";

type SelectedMarkerProps = {
  data: TNodeData;
};

const defaultOptions = [
  {
    value: "1/3",
    label: "1/3",
  },
  {
    value: "2/4",
    label: "2/4",
  },
];

export const SelectedMarker = ({ data }: SelectedMarkerProps) => {
  const { handleToggleEditor, handleChange, editorOpen } = useMutateNodeData();
  const options = data.options?.map(({ id, label }) => ({
    label,
    value: id,
  }));
  const selectRef = useRef<BaseSelectRef>(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prevState) => !prevState);

  return (
    <div className="node-type selected-market">
      <Handle
        type="target"
        position={Position.Top}
        id="input" // optional if only one handle of this type
        style={{ background: "#555" }}
      />
      <Tooltip title={data.value ? `Маркер: ${data.value}` : undefined}>
        <button type="button" onClick={handleToggleEditor}>
          {templateLabels[data.type]}
        </button>
      </Tooltip>
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{ background: "#555" }}
      />
      {editorOpen ? (
        <Select
          ref={selectRef}
          open={open}
          onClick={handleToggle}
          value={data.value}
          onSelect={handleChange(data.id)}
          options={options || defaultOptions}
          style={{ width: "100px" }}
        />
      ) : null}
    </div>
  );
};
