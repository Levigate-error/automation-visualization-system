import React from "react";
import { Sidebar } from "@/modules/sidebar/sidebar";
import { Accordion } from "@szhsin/react-accordion";
import { AutomationCard } from "@/modules/automation-card/automation-card";
import { ReactFlowProvider } from "@xyflow/react";
import { useAutomations } from "@/hooks/use-automation";
import "./board.scss";
import { useSelector } from "react-redux";
import { TState } from "@/store/types";

const Board = () => {
  useAutomations();
  const { automations } = useSelector((state: TState) => state.automation);

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper">
        <Accordion allowMultiple>
          {automations.map((item) => (
            <ReactFlowProvider key={item.id}>
              <AutomationCard automation={item} />
            </ReactFlowProvider>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export { Board };
