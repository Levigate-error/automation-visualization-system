import { ENodeContentItemTypes, ENodeType } from "./enums";

export type TAutomationContentResponse = {
  id: string;
  label: string;
  type: ENodeContentItemTypes;
  value: string;
  read_only: boolean;
  options:
    | {
        id: string;
        label: string;
      }[]
    | null;
};

export type TAutomationNodeResponse = {
  id: string;
  id_uuid: string;
  type_object: ENodeType;
  handler_type: boolean;
  folded: boolean;
  hidden: boolean;
  content: TAutomationContentResponse[];
  target: string;
  description: string | null;
};

export type TAutomationResponse = {
  id: string;
  target: string;
  id_uuid: string;
  type_object: string;
  handler_type: boolean;
  folded: boolean;
  hidden: boolean;
  content: TAutomationContentResponse[];
  components: TAutomationNodeResponse[];
};
