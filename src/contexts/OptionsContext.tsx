import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

export interface OptionsState {
  trace: boolean;
  direction: string;
  horizontalDir: string;
  paused: boolean;
}
interface OptionsContextType {
  options: OptionsState;
  handleToggleTrace: () => void;
  handlePause: () => void;
  handleChangeDirection: (direction: string) => void;
  handleChangeHorizontalDirection: (direction: string) => void;
}

export const OptionsContext = createContext({} as OptionsContextType);

interface OptionsContextProviderProps {
  children: ReactNode;
}

export function OptionsContextProvider({
  children,
}: OptionsContextProviderProps) {
  const [options, setOptions] = useState({
    trace: false,
    direction: "foward",
    horizontalDir: "down",
    paused: false,
  });

  function handleToggleTrace() {
    setOptions((option) => ({ ...option, trace: !option.trace }));
  }

  function handlePause() {
    setOptions((option) => ({ ...option, paused: !option.paused }));
  }

  function handleChangeDirection(direction: string) {
    if (direction === "toggle") {
      setOptions((option) => ({
        ...option,
        direction: option.direction === "foward" ? "back" : "foward",
      }));
    } else {
      setOptions((option) => ({
        ...option,
        direction,
      }));
    }
  }

  function handleChangeHorizontalDirection(horizontalDir: string) {
    if (horizontalDir === "toggle") {
      setOptions((option) => ({
        ...option,
        horizontalDir: option.horizontalDir === "down" ? "up" : "down",
      }));
    } else {
      setOptions((option) => ({
        ...option,
        horizontalDir,
      }));
    }
  }
  return (
    <OptionsContext.Provider
      value={{
        options,
        handlePause,
        handleToggleTrace,
        handleChangeDirection,
        handleChangeHorizontalDirection,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
}
