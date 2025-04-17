import { ENodeType } from "@/types/enums";

export const templateLabels = {
  [ENodeType.CALL_DURATION_GTE]: "Длина звонка больше, мин",
  [ENodeType.CALL_DURATION_LTE]: "Длина звонка меньше, мин",
  [ENodeType.DIALOGUE_DATE_GTE]: "Дата диалога от",
  [ENodeType.DIALOGUE_DATE_LTE]: "Дата диалога до",
  [ENodeType.AUTOMATION_AGENT]: "Агент автоматизации",
  [ENodeType.SELECTED_MARKER]: "Маркер",
};
