import styled from "styled-components";

interface MenuProps {
  isOpen: boolean;
}

export const MenuContainer = styled.div<MenuProps>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isOpen ? "rgba(0, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  z-index: 1;
  position: absolute;
  border-radius: 4px;
  top: 10px;
  left: 10px;
  cursor: pointer;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

export const OptionsContainer = styled.div<MenuProps>`
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  display: flex;
  position: absolute;
  top: 10px;
  left: 70px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  color: black;
  padding: 1rem;
  cursor: default;
`;
