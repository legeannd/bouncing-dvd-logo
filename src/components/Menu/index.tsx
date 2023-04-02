import { useContext, useEffect, useState } from "react";
import { MenuIcon } from "../../assets/menu-icon";
import { OptionsContext } from "../../contexts/OptionsContext";
import { MenuContainer, OptionsContainer } from "./styles";

export function Menu() {
  const { handleToggleTrace, isTraceEnabled } = useContext(OptionsContext);
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
        <button onClick={handleToggleTrace}>
          {isTraceEnabled ? "Desativar rastro" : "Ativar rastro"}
        </button>
      </OptionsContainer>
    </>
  );
}
