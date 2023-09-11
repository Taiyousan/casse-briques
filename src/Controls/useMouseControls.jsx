import { useState, useEffect } from "react";

const useMouseControl = () => {
  const [mousePosition, setMousePosition] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition(e.clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
};

export default useMouseControl;
