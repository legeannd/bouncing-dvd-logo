import { useContext, useEffect, useRef, useState } from "react";
import { BouncingLogo } from "../../components/BouncingLogo";
import { Menu } from "../../components/Menu";
import {
  OptionsContext,
  OptionsContextProvider,
} from "../../contexts/OptionsContext";
import { Container } from "./styles";
import { generateColor } from "../../utils";

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { options } = useContext(OptionsContext);
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [logoProps, setLogoProps] = useState({ lastSide: "", color: "" });
  const [maxSize, setMaxSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function handleGetBackgroundColorOnChangeLastSide(
    lastSide: string,
    color: string
  ) {
    setLogoProps({ lastSide, color });
  }

  useEffect(() => {
    if (options.randomBackground) {
      const newBackgroundColor = generateColor();
      if (newBackgroundColor !== logoProps.color) {
        setBackgroundColor(newBackgroundColor);
      } else {
        setBackgroundColor(generateColor());
      }
    }
  }, [options.randomBackground, logoProps]);

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
    <Container ref={containerRef} backgroundColor={backgroundColor}>
      <Menu />
      <BouncingLogo
        maxSize={maxSize}
        getLastSide={handleGetBackgroundColorOnChangeLastSide}
      />
    </Container>
  );
}
