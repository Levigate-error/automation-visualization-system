import React from "react";
import { templateLabels } from "@/consts";
import { TNodeData } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { useMutateNodeData } from "@/hooks/use-mutate-node-data";
import { DatePicker, DatePickerProps, Tooltip } from "antd";
import dayjs from "dayjs";
import { ENodeType } from "@/types/enums";

type DialogueDateProps = {
  data: TNodeData;
};

export const DialogueDate = ({ data }: DialogueDateProps) => {
  const { handleToggleEditor, handleChange, editorOpen } = useMutateNodeData();

  const onChange: DatePickerProps["onChange"] = (date) =>
    handleChange(data.id)(date.format("DD.MM.YYYY"));
  return (
    <div className="node-type dialogue-date">
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{ background: "#555" }}
      />
      <Tooltip
        title={
          data.value
            ? `Условие: Дата диалога ${
                data.type === ENodeType.DIALOGUE_DATE_GTE ? "≥" : "≤"
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
        <DatePicker
          value={data.value ? dayjs(data.value as string, "DD.MM.YYYY") : null}
          onChange={onChange}
        />
      ) : null}
    </div>
  );
};
