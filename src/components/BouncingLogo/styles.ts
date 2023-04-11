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

export const CustomImage = styled.img`
  max-width: 500px;
  max-height: 500px;
  background-color: red;
`;
