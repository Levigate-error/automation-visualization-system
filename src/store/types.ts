import { TAutomationState } from "./automation/types";

export type TStore = never;

export type TState = {
  automation: TAutomationState;
};
