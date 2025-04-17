import React, { ChangeEvent } from "react";
import { templateLabels } from "@/consts";
import { TNodeData } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { Input, Tooltip } from "antd";
import { useMutateNodeData } from "@/hooks/use-mutate-node-data";
import { ENodeType } from "@/types/enums";

export type CallDurationProps = {
  data: TNodeData;
};

export const CallDuration = ({ data }: CallDurationProps) => {
  const { handleToggleEditor, handleChange, editorOpen } = useMutateNodeData();

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (/^\d{0,3}(:\d{0,2})?$/.test(newValue)) {
      handleChange(data.id)(newValue);
    }
  };

  return (
    <div className="node-type">
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{ background: "#555" }}
      />
      <Tooltip
        title={
          data.value
            ? `Условие: Длительность звонка ${
                data.type === ENodeType.CALL_DURATION_GTE ? "≥" : "≤"
              } ${data.value}`
            : undefined
        }
      >
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
        <Input
          value={data.value as string}
          onInput={onInput}
          placeholder="00:00"
          maxLength={6}
        />
      ) : null}
    </div>
  );
};
