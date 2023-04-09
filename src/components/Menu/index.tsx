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
          {options.trace ? "Desativar rastro" : "Ativar rastro"}
        </OptionButton>
        <OptionButton onClick={handlePause}>
          {options.paused ? "Iniciar" : "Parar"}
        </OptionButton>
        <OptionButton onClick={() => handleChangeDirection("toggle")}>
          Alterar direção vertical
        </OptionButton>
        <OptionButton onClick={() => handleChangeHorizontalDirection("toggle")}>
          Alterar direção horizontal
        </OptionButton>
      </OptionsContainer>
    </>
  );
}
