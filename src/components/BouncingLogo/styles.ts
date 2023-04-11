import styled from "styled-components";

interface LogoContainerProps {
  position: {
    top: number;
    left: number;
  };
  isRotationEnabled: boolean;
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
  animation: ${(props) =>
    props.isRotationEnabled ? "rotation 2s infinite linear" : ""};

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export const CustomImage = styled.img`
  max-width: 500px;
  max-height: 500px;
  background-color: red;
`;
