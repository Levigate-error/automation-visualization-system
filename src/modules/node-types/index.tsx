import { ENodeType } from "@/types/enums";
import { SelectedMarker } from "@/modules/node-types/selected-marker/selected-marker";
import { AutomationAgent } from "@/modules/node-types/automation-agent/automation-agent";
import { DialogueDate } from "@/modules/node-types/dialogue-date/dialogue-date";
import { CallDuration } from "@/modules/node-types/call-duration/call-duration";
import { NodeTypes } from "@xyflow/react/dist/esm/types";

export const nodeTypes: NodeTypes = {
  [ENodeType.SELECTED_MARKER]: SelectedMarker,
  [ENodeType.AUTOMATION_AGENT]: AutomationAgent,
  [ENodeType.DIALOGUE_DATE_LTE]: DialogueDate,
  [ENodeType.DIALOGUE_DATE_GTE]: DialogueDate,
  [ENodeType.CALL_DURATION_LTE]: CallDuration,
  [ENodeType.CALL_DURATION_GTE]: CallDuration,
};
