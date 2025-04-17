import React from "react";
import ChevronIcon from "@/icons/chevron.svg";
import CrossIcon from "@/icons/cross.svg";
import "./automation-card-header.scss";

type AutomationCardHeaderProps = {
  name: string;
  count: number;
};

export const AutomationCardHeader = ({
  name,
  count,
}: AutomationCardHeaderProps) => {
  return (
    <div className="automation-card-header">
      <ChevronIcon />
      <p>
        {name}: <span>{count} звонков</span>
      </p>
      <button type="button">
        <CrossIcon />
      </button>
    </div>
  );
};
