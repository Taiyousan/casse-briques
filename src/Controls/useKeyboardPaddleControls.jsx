import { useState, useEffect } from "react";

export const useKeyboardPaddleControls = () => {
  const [direction, setDirection] = useState(0); // -1 pour gauche, 1 pour droite, 0 pour arrêt
  const [mousePosition, setMousePosition] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // setMousePosition(e.clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // console.log(mousePosition);
  }, [mousePosition]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          setDirection(-1);
          break;
        case "ArrowRight":
          setDirection(1);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowRight":
          setDirection(0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { direction, mousePosition };
};
