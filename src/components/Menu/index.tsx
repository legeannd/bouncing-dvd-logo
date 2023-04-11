import { useContext, useEffect, useState } from "react";
import { MenuIcon } from "../../assets/menu-icon";
import { OptionsContext } from "../../contexts/OptionsContext";
import { MenuContainer, OptionButton, OptionsContainer } from "./styles";

export function Menu() {
  const {
    options,
    handlePause,
    handleToggleTrace,
    handleChangeDirection,
    handleToggleRandomBackground,
    handleChangeHorizontalDirection,
  } = useContext(OptionsContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuContainer
        className="menu-container"
        isOpen={isOpen}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <MenuIcon />
      </MenuContainer>
      <OptionsContainer isOpen={isOpen}>
        <OptionButton onClick={handleToggleTrace}>
          {options.trace ? "Deactivate trace" : "Activate trace"}
        </OptionButton>
        <OptionButton onClick={handlePause}>
          {options.paused ? "Start" : "Stop"}
        </OptionButton>
        <OptionButton onClick={() => handleChangeDirection("toggle")}>
          Change vertical direction
        </OptionButton>
        <OptionButton onClick={() => handleChangeHorizontalDirection("toggle")}>
          Change horizontal direction
        </OptionButton>
        <OptionButton onClick={handleToggleRandomBackground}>
          {options.randomBackground
            ? "Deactivate random background color"
            : "Activate random background color"}
        </OptionButton>
      </OptionsContainer>
    </>
  );
}
