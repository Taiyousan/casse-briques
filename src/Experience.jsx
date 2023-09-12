import { OrbitControls, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import Ball from "./Meshes/Ball";
import Paddle from "./Meshes/Paddle";
import Borders from "./Meshes/Borders";
import Brick from "./Meshes/Brick";
import { useKeyboardPaddleControls } from "./Controls/useKeyboardPaddleControls";
import { usePause, PauseButton } from "./Utils/PauseContext";
import ScoreDisplay from "./Utils/ScoreDisplay";
import LifeDisplay from "./Utils/LifeDisplay";
import StartButton from "./Utils/StartButton";
import { useEffect, useRef, useState } from "react";
import Level1 from "./Meshes/Level/Level1";

export default function Experience() {
  // const [position, setPosition] = useState([0, 0, 0]);
  const levelsNumberOfBricks = [70];
  const { direction, mousePosition } = useKeyboardPaddleControls();
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [isCombo, setIsCombo] = useState(false);
  const [lifeCount, setLifeCount] = useState(3);
  const [isStarted, setIsStarted] = useState(false);

  const [bricks, setBricks] = useState(
    Array.from({ length: levelsNumberOfBricks[0] }, (_, index) => index + 1)
  );

  const removeBrick = (id) => {
    const point = isCombo ? 2 : 1;

    setBricks((prev) => prev.filter((brick) => brick !== id));
    setScore((prev) => prev + point);
    setIsCombo(true);
  };

  useEffect(() => {
    console.log("EXP : isPaused", isPaused);
  }, [isPaused]);

  const orbitLookAtX = 0;
  const orbitLookAtY = 22.4;
  const orbitLookAtZ = 0;

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls
        makeDefault
        target={[orbitLookAtX, 22.4, orbitLookAtZ]}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Physics debug gravity={[0, 0, 0]}>
        <Level1 bricks={bricks} />
        <PauseButton />
        <Borders />
        {!isStarted && (
          <StartButton
            isStarted={isStarted}
            setIsStarted={setIsStarted}
            lifeCount={lifeCount}
          />
        )}
        <Ball
          removeBrick={removeBrick}
          setScore={setScore}
          setIsCombo={setIsCombo}
          lifeCount={lifeCount}
          setLifeCount={setLifeCount}
          isStarted={isStarted}
          setIsStarted={setIsStarted}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
        <ScoreDisplay score={score} isCombo={isCombo} />
        <LifeDisplay lifeCount={lifeCount} />
        <Paddle direction={(direction, mousePosition)} />
      </Physics>
    </>
  );
}
