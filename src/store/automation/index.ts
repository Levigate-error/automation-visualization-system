import { createSlice } from "@reduxjs/toolkit";
import { TAutomationState } from "./types";
import reducers from "./reducers";

const initialState: TAutomationState = {
  automations: [],
  past: [],
  future: [],
};

export const automationSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export default automationSlice.reducer;

export const {
  setAutomations,
  updateAutomationEdges,
  updateAutomationNodes,
  addAutomationNode,
  undo,
  redo,
} = automationSlice.actions;
