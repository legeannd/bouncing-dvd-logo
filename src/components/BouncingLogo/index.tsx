import { useContext, useEffect, useRef, useState } from "react";
import { DVDLogo } from "../../assets/logo";
import { OptionsContext } from "../../contexts/OptionsContext";
import { LogoContainer } from "./styles";

interface BouncingLogoProps {
  maxSize: {
    width: number;
    height: number;
  };
}

interface PositionProps {
  top: number;
  left: number;
}

interface PositionWithColorProps extends PositionProps {
  color: string;
}

export function BouncingLogo({ maxSize }: BouncingLogoProps) {
  const { options, handleChangeDirection, handleChangeHorizontalDirection } =
    useContext(OptionsContext);

  const logoRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PositionProps>({ top: 0, left: 0 });
  const [positionsTrace, setPositionsTrace] = useState<
    PositionWithColorProps[]
  >([]);
  const [traceCount, setTraceCount] = useState(0);
  const [lastSide, setLastSide] = useState("");
  const [secondLastSide, setSecondLastSide] = useState("");
  const [color, setColor] = useState("");

  function generateColor() {
    return `#${Math.random().toString(16).slice(-6)}`;
  }

  useEffect(() => {
    setColor(generateColor());
  }, [lastSide]);

  function handleSetPosition(position: PositionProps) {
    setPosition(position);
    if (options.trace) {
      if (traceCount === 10) {
        if (positionsTrace.length >= 10) {
          positionsTrace.pop();
          setPositionsTrace([{ ...position, color: color }, ...positionsTrace]);
        } else if (positionsTrace.length > 0) {
          setPositionsTrace([{ ...position, color: color }, ...positionsTrace]);
        } else {
          setPositionsTrace([{ ...position, color: color }]);
        }
        setTraceCount(0);
      } else {
        setTraceCount(traceCount + 1);
      }
    } else {
      setPositionsTrace([]);
    }
  }

  useEffect(() => {
    setPosition({
      top: Math.random() * maxSize.height,
      left: Math.random() * maxSize.width,
    });
  }, [maxSize.height, maxSize.width]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (logoRef.current) {
        if (maxSize.height - logoRef.current.offsetHeight <= position.top) {
          if (lastSide !== "" && lastSide !== "bottom") {
            handleChangeHorizontalDirection("up");
            if (secondLastSide !== "") {
              setSecondLastSide(lastSide);
              setLastSide("bottom");
            } else {
              setSecondLastSide(lastSide);
              setLastSide("bottom");
            }
          } else {
            setLastSide("bottom");
          }
        } else if (
          maxSize.width - logoRef.current.offsetWidth <=
          position.left
        ) {
          if (lastSide !== "" && lastSide !== "right") {
            handleChangeDirection("back");
            if (secondLastSide !== "") {
              setSecondLastSide(lastSide);
              setLastSide("right");
            } else {
              setSecondLastSide(lastSide);
              setLastSide("right");
            }
          } else {
            setLastSide("right");
          }
        } else if (position.top <= 0) {
          if (lastSide !== "" && lastSide !== "top") {
            handleChangeHorizontalDirection("down");
            if (secondLastSide !== "") {
              setSecondLastSide(lastSide);
              setLastSide("top");
            } else {
              setSecondLastSide(lastSide);
              setLastSide("top");
            }
          } else {
            setLastSide("top");
          }
        } else if (position.left <= 0) {
          handleChangeDirection("foward");
          if (lastSide !== "" && lastSide !== "left") {
            if (secondLastSide !== "") {
              setSecondLastSide(lastSide);
              setLastSide("left");
            } else {
              setSecondLastSide(lastSide);
              setLastSide("left");
            }
          } else {
            setLastSide("left");
          }
        }

        if (lastSide === "bottom") {
          if (options.direction === "back") {
            handleSetPosition({
              top: position.top - 1,
              left: position.left - 1,
            });
          } else {
            handleSetPosition({
              top: position.top - 1,
              left: position.left + 1,
            });
          }
        } else if (lastSide === "right") {
          if (options.horizontalDir === "down") {
            handleSetPosition({
              top: position.top + 1,
              left: position.left - 1,
            });
          } else {
            handleSetPosition({
              top: position.top - 1,
              left: position.left - 1,
            });
          }
        } else if (lastSide === "top") {
          if (options.direction === "back") {
            handleSetPosition({
              top: position.top + 1,
              left: position.left - 1,
            });
          } else {
            handleSetPosition({
              top: position.top + 1,
              left: position.left + 1,
            });
          }
        } else if (lastSide === "left") {
          if (options.horizontalDir === "up") {
            handleSetPosition({
              top: position.top - 1,
              left: position.left + 1,
            });
          } else {
            handleSetPosition({
              top: position.top + 1,
              left: position.left + 1,
            });
          }
        } else {
          const newPosition = {
            top: position.top + 1,
            left: position.left + 1,
          };
          handleSetPosition(newPosition);
        }
      }
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [
    options.direction,
    options.horizontalDir,
    lastSide,
    maxSize.height,
    maxSize.width,
    position.left,
    position.top,
    secondLastSide,
  ]);

  return (
    <>
      <LogoContainer ref={logoRef} position={position} style={{ zIndex: 1 }}>
        <DVDLogo color={color} />
      </LogoContainer>
      {positionsTrace.length > 0 &&
        positionsTrace.map((position, index) => (
          <LogoContainer
            key={index}
            position={position}
            style={{ opacity: 0.1 }}
          >
            <DVDLogo color={position.color} />
          </LogoContainer>
        ))}
    </>
  );
}
