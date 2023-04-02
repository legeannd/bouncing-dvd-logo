import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000;

  :hover {
    [class*="menu-container"] {
      opacity: 1;
    }
  }
`;
