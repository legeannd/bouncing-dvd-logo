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
  background: ${(props) => (props.isOpen ? "#8F3985" : "#25283D")};
  z-index: 10;
  position: absolute;
  border-radius: 4px;
  top: 10px;
  left: 10px;
  cursor: pointer;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

export const OptionsContainer = styled.div<MenuProps>`
  display: ${(props) => (props.isOpen ? "grid" : "none")};
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  position: absolute;
  top: 10px;
  left: 70px;
  background: #efd9ce;
  z-index: 10;
  border-radius: 4px;
  color: black;
  padding: 1rem;
  cursor: default;
`;

export const OptionButton = styled.button`
  border: 0;
  background: #a675a1;
  color: #fff;
  padding: 1rem;
  outline: 0;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  :hover {
    background: #8f3985;
  }
`;

export const UploadImageButtonContainer = styled.div`
  background: #a675a1;
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  text-align: center;

  label {
    cursor: pointer;
  }

  :hover {
    background: #8f3985;
  }

  input {
    display: none;
  }
`;
