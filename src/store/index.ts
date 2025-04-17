import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import automationReducer from "./automation";

const store = configureStore({
  devTools: import.meta.env.DEV,
  reducer: {
    automation: automationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
