import { useEffect, useRef, useState } from "react";
import { BouncingLogo } from "../../components/BouncingLogo";
import { Menu } from "../../components/Menu";
import { OptionsContextProvider } from "../../contexts/OptionsContext";
import { Container } from "./styles";

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxSize, setMaxSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setMaxSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <OptionsContextProvider>
      <Container ref={containerRef}>
        <Menu />
        <BouncingLogo maxSize={maxSize} />
      </Container>
    </OptionsContextProvider>
  );
}
