import { createContext, ReactNode, useEffect, useState } from "react";

interface OptionsContextType {
  isTraceEnabled: boolean;
  handleToggleTrace: () => void;
}

export const OptionsContext = createContext({} as OptionsContextType);

interface OptionsContextProviderProps {
  children: ReactNode;
}

export function OptionsContextProvider({
  children,
}: OptionsContextProviderProps) {
  const [isTraceEnabled, setIsTraceEnabled] = useState(false);

  function handleToggleTrace() {
    setIsTraceEnabled((trace) => !trace);
  }
  return (
    <OptionsContext.Provider value={{ isTraceEnabled, handleToggleTrace }}>
      {children}
    </OptionsContext.Provider>
  );
}
