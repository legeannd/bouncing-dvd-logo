import { createContext, ReactNode, useEffect, useState } from "react";

export interface OptionsState {
  trace: boolean;
  direction: string;
  horizontalDir: string;
  paused: boolean;
  randomBackground: boolean;
  rotation: boolean;
  customImage: boolean;
  fileUrl: string;
}
interface OptionsContextType {
  options: OptionsState;
  imageFile: File | undefined;
  handleToggleTrace: () => void;
  handleToggleRotation: () => void;
  handleChangeImageFile: (file: File) => void;
  handleToggleCustomImage: () => void;
  handleToggleRandomBackground: () => void;
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
  const [imageFile, setImageFile] = useState<File>();
  const [options, setOptions] = useState({
    trace: false,
    direction: "foward",
    horizontalDir: "down",
    paused: false,
    randomBackground: false,
    customImage: false,
    rotation: false,
    fileUrl: "",
  });

  function handleToggleTrace() {
    setOptions((option) => ({ ...option, trace: !option.trace }));
  }

  function handleToggleRandomBackground() {
    setOptions((option) => ({
      ...option,
      randomBackground: !option.randomBackground,
    }));
  }

  function handleToggleCustomImage() {
    setOptions((option) => ({
      ...option,
      customImage: !option.customImage,
    }));
  }

  function handleToggleRotation() {
    setOptions((option) => ({
      ...option,
      rotation: !option.rotation,
    }));
  }

  function handleChangeImageFile(file: File) {
    setImageFile(file);
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

  useEffect(() => {
    let isCancel = false;
    const fileReader = new FileReader();
    if (imageFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = fileReader;
        if (result && !isCancel) {
          setOptions((option) => ({
            ...option,
            fileUrl: result.toString(),
          }));
        }
      };
      fileReader.readAsDataURL(imageFile);
    }
    return () => {
      isCancel = true;
      if (imageFile && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [imageFile]);

  return (
    <OptionsContext.Provider
      value={{
        options,
        imageFile,
        handlePause,
        handleToggleTrace,
        handleToggleRotation,
        handleChangeImageFile,
        handleChangeDirection,
        handleToggleCustomImage,
        handleToggleRandomBackground,
        handleChangeHorizontalDirection,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
}
