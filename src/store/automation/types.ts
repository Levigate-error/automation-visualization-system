import { Automation } from "@/requests/automation";

export type TAutomationState = {
  automations: Automation[];
  past: Automation[][];
  future: Automation[][];
};
