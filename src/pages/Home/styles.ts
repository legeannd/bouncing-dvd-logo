import styled from "styled-components";

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: ${(props) => props.backgroundColor || "#000"};

  :hover {
    [class*="menu-container"] {
      opacity: 1;
    }
  }
`;
