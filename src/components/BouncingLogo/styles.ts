import styled from "styled-components";

interface LogoContainerProps {
  position: {
    top: number;
    left: number;
  };
}

export const LogoContainer = styled.div.attrs<LogoContainerProps>(
  (props: LogoContainerProps) => ({
    style: {
      top: `${props.position.top}px`,
      left: `${props.position.left}px`,
    },
  })
)<LogoContainerProps>`
  position: absolute;
`;
