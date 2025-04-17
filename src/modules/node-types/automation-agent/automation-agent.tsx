import React from "react";
import { TNodeData } from "@/types";
import { Handle, Position } from "@xyflow/react";
import SupportAgent from "@/icons/support-agent.svg";

export type AutomationAgentProps = {
  data: TNodeData;
};

export const AutomationAgent = ({ data }: AutomationAgentProps) => {
  return (
    <div className="node-type automation-agent">
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{ background: "#555" }}
      />
      <div className="automation-agent-content">
        <SupportAgent />

        <div className="automation-agent-content__naming">
          <h3>
            {(data.value as { name?: string; description?: string })?.name}
          </h3>
          <p>
            {
              (data.value as { name?: string; description?: string })
                ?.description
            }
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{ background: "#555" }}
      />
    </div>
  );
};
