import { useContext, useEffect, useRef, useState } from "react";
import { DVDLogo } from "../../assets/logo";
import { OptionsContext } from "../../contexts/OptionsContext";
import { CustomImage, LogoContainer } from "./styles";
import { generateColor } from "../../utils";

interface BouncingLogoProps {
  maxSize: {
    width: number;
    height: number;
  };
  getLastSide: (lastSide: string, currentColor: string) => void;
}

interface PositionProps {
  top: number;
  left: number;
}

interface PositionWithColorProps extends PositionProps {
  color: string;
}

export function BouncingLogo({ maxSize, getLastSide }: BouncingLogoProps) {
  const { options, handleChangeDirection, handleChangeHorizontalDirection } =
    useContext(OptionsContext);

  const logoRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PositionProps>({ top: 0, left: 0 });
  const [positionsTrace, setPositionsTrace] = useState<
    PositionWithColorProps[]
  >([]);
  const [traceCount, setTraceCount] = useState(0);
  const [lastSide, setLastSide] = useState("left");
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(generateColor());
    getLastSide(lastSide, color);
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
    if (logoRef.current) {
      if (
        maxSize.height + 1.5 * logoRef.current.offsetHeight < position.top ||
        maxSize.width + 1.5 * logoRef.current.offsetWidth < position.left ||
        position.left < -(1.5 * logoRef.current.offsetWidth) ||
        position.top < -1.5 * logoRef.current.offsetHeight
      ) {
        setPosition({
          top: Math.random() * maxSize.height,
          left: Math.random() * maxSize.width,
        });
        handleChangeHorizontalDirection("up");
        handleChangeDirection("foward");
      }
    }
  }, [maxSize.height, position.top]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (logoRef.current && !options.paused) {
        if (maxSize.height - logoRef.current.offsetHeight <= position.top) {
          if (lastSide !== "" && lastSide !== "bottom") {
            handleChangeHorizontalDirection("up");
            setLastSide("bottom");
          }
        } else if (
          maxSize.width - logoRef.current.offsetWidth <=
          position.left
        ) {
          if (lastSide !== "" && lastSide !== "right") {
            handleChangeDirection("back");
            setLastSide("right");
          }
        } else if (position.top <= 0) {
          if (lastSide !== "" && lastSide !== "top") {
            handleChangeHorizontalDirection("down");
            setLastSide("top");
          }
        } else if (position.left <= 0) {
          if (lastSide !== "" && lastSide !== "left") {
            handleChangeDirection("foward");
            setLastSide("left");
          }
        }

        if (lastSide === "bottom") {
          if (options.direction === "back") {
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
          } else {
            if (options.horizontalDir === "down") {
              handleSetPosition({
                top: position.top + 1,
                left: position.left + 1,
              });
            } else {
              handleSetPosition({
                top: position.top - 1,
                left: position.left + 1,
              });
            }
          }
        } else if (lastSide === "right") {
          if (options.horizontalDir === "down") {
            if (options.direction === "foward") {
              handleSetPosition({
                top: position.top + 1,
                left: position.left + 1,
              });
            } else {
              handleSetPosition({
                top: position.top + 1,
                left: position.left - 1,
              });
            }
          } else {
            if (options.direction === "foward") {
              handleSetPosition({
                top: position.top - 1,
                left: position.left + 1,
              });
            } else {
              handleSetPosition({
                top: position.top - 1,
                left: position.left - 1,
              });
            }
          }
        } else if (lastSide === "top") {
          if (options.direction === "back") {
            if (options.horizontalDir === "up") {
              handleSetPosition({
                top: position.top - 1,
                left: position.left - 1,
              });
            } else {
              handleSetPosition({
                top: position.top + 1,
                left: position.left - 1,
              });
            }
          } else {
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
          }
        } else if (lastSide === "left") {
          if (options.horizontalDir === "up") {
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
          } else {
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
    options.paused,
    lastSide,
    maxSize.height,
    maxSize.width,
    position.left,
    position.top,
  ]);

  return (
    <>
      <LogoContainer
        ref={logoRef}
        position={position}
        style={{ zIndex: 1 }}
        isRotationEnabled={options.rotation}
      >
        {options.customImage && options.fileUrl !== "" ? (
          <CustomImage src={options.fileUrl} alt="" />
        ) : (
          <DVDLogo color={color} />
        )}
      </LogoContainer>
      {positionsTrace.length > 0 &&
        positionsTrace.map((position, index) => (
          <LogoContainer
            key={index}
            position={position}
            style={{ opacity: 0.1 }}
            isRotationEnabled={options.rotation}
          >
            {options.customImage && options.fileUrl !== "" ? (
              <CustomImage src={options.fileUrl} alt="" />
            ) : (
              <DVDLogo color={position.color} />
            )}
          </LogoContainer>
        ))}
    </>
  );
}
