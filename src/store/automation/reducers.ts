import { TAutomationState } from "@/store/automation/types";
import { Edge, Node } from "@/types";
import { cloneDeep } from "lodash";

const reducers = {
  setAutomations: (
    state: TAutomationState,
    action: { payload: TAutomationState["automations"] }
  ) => {
    state.automations = action.payload;
  },
  addAutomationNode: (
    state: TAutomationState,
    action: { payload: { automationId: string; node: Node } }
  ) => {
    state.past.push(cloneDeep(state.automations));
    if (state.past.length > 10) {
      state.past.pop();
    }
    state.future = [];

    state.automations = state.automations.map((automation) =>
      automation.id === action.payload.automationId
        ? {
            ...automation,
            nodes: [...automation.nodes, action.payload.node],
          }
        : automation
    );
  },
  updateAutomationEdges: (
    state: TAutomationState,
    action: { payload: { automationId: string; edges: Edge[] } }
  ) => {
    state.past.push(cloneDeep(state.automations));
    if (state.past.length > 10) {
      state.past.pop();
    }
    state.future = [];
    state.automations.map((automation) => {
      if (automation.id === action.payload.automationId) {
        return {
          ...automation,
          edges: action.payload.edges,
        };
      }

      return automation;
    });
  },
  updateAutomationNodes: (
    state: TAutomationState,
    action: { payload: { automationId: string; nodes: Node[] } }
  ) => {
    state.past.push(cloneDeep(state.automations));
    if (state.past.length > 10) {
      state.past.pop();
    }
    state.future = [];
    state.automations.map((automation) => {
      if (automation.id === action.payload.automationId) {
        return {
          ...automation,
          nodes: action.payload.nodes,
        };
      }

      return automation;
    });
  },
  undo: (state: TAutomationState) => {
    if (state.past.length === 0) return;
    const prev = state.past.pop()!;
    state.future.unshift(state.automations);
    state.automations = prev;
  },
  redo: (state: TAutomationState) => {
    if (state.future.length === 0) return;
    const next = state.future.shift()!;
    state.past.push(cloneDeep(state.automations));
    state.automations = next;
  },
};

export default reducers;
