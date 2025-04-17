import { ENodeContentItemTypes, ENodeType } from "./enums";

export type TNodeData = {
  id: string;
  type: ENodeType;
  value: { name?: string; description?: string } | string | number | undefined;
  options?: { id: string; label: string }[] | null | undefined;
};

export type Node = {
  id: string;
  type: string;
  data: TNodeData;
  position: { x: number; y: number };
};

export type Edge = {
  id: string;
  source: string;
  target: string;
};

export type BaseTemplateItemField = {
  id: string;
  label: string;
  type: ENodeContentItemTypes;
  read_only: boolean;
};

export type SelectTemplateItemField = BaseTemplateItemField & {
  type: ENodeContentItemTypes.SELECT;
  options: string[]; // or a more complex option type
};
export type TemplateItemField = SelectTemplateItemField | BaseTemplateItemField;

export type TemplateResponseItem = {
  description: string;
  fields: TemplateItemField[];
};

export type TemplateResponse = Record<ENodeType, TemplateResponseItem>;
