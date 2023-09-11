import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import Ball from "./Meshes/Ball";
import Paddle from "./Meshes/Paddle";
import Borders from "./Meshes/Borders";
import Brick from "./Meshes/Brick";
import { useKeyboardPaddleControls } from "./Controls/useKeyboardPaddleControls";
import { useEffect, useRef, useState } from "react";
import Level1 from "./Meshes/Level/Level1";

export default function Experience() {
  // const [position, setPosition] = useState([0, 0, 0]);
  const levelsNumberOfBricks = [70];
  const { direction, mousePosition } = useKeyboardPaddleControls();

  const [bricks, setBricks] = useState(
    Array.from({ length: levelsNumberOfBricks[0] }, (_, index) => index + 1)
  );

  const removeBrick = (id) => {
    setBricks((prev) => prev.filter((brick) => brick !== id));
  };

  useEffect(() => {
    console.log(mousePosition);
  }, []);

  const { orbitLookAtX, orbitLookAtY, orbitLookAtZ } = useControls({
    orbitLookAtX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.01,
    },
    orbitLookAtY: {
      value: 22.4,
      min: -100,
      max: 100,
      step: 0.01,
    },
    orbitLookAtZ: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.01,
    },
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls
        makeDefault
        target={[orbitLookAtX, 22.4, orbitLookAtZ]}
        // enableZoom={false}
        // enablePan={false}
        // enableRotate={false}
      />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics debug gravity={[0, 0, 0]}>
        <Level1 bricks={bricks} />

        <Borders />
        <Ball removeBrick={removeBrick} />

        <Paddle direction={(direction, mousePosition)} />
      </Physics>
    </>
  );
}
