import { ENodeType } from "@/types/enums";

const enumValuesSet = new Set(Object.values(ENodeType));

export const isENodeResponseItemType = (value: string): value is ENodeType => {
  return enumValuesSet.has(value as ENodeType);
};
