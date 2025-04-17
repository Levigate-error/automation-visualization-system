import React, { createContext, PropsWithChildren, useContext } from "react";

const AutomationContext = createContext<{ automationId: string }>({
  automationId: "",
});

type AutomationProviderProps = {
  automationId: string;
};

export const AutomationProvider = ({
  children,
  automationId,
}: PropsWithChildren<AutomationProviderProps>) => {
  return (
    <AutomationContext.Provider value={{ automationId }}>
      {children}
    </AutomationContext.Provider>
  );
};

export default AutomationContext;

export const useAutomationContext = () => {
  return useContext(AutomationContext);
};
