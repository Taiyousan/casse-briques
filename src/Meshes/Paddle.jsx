import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import useMouseControl from "../Controls/useMouseControls";
import * as THREE from "three";
import { Html } from "@react-three/drei";

export default function Paddle({ direction, isPaused, isStarted }) {
  const [position, setPosition] = useState([0, 0, 0]);
  const mousePosition = useMouseControl();
  const paddleWidth = 15;
  const segmentWidth = paddleWidth / 11;

  const randomColor = () =>
    new THREE.Color(Math.random(), Math.random(), Math.random());

  const [colors, setColors] = useState({
    color1: randomColor(),
    color2: randomColor(),
    color3: randomColor(),
  });

  // useFrame(() => {
  //   if (direction !== 0) {
  //     setPosition((prev) => [prev[0] + direction * 0.5, prev[1], prev[2]]);
  //   }

  //   // console.log(mousePosition);
  // });

  useFrame(() => {
    if (mousePosition !== null && isStarted) {
      // Transformez mousePosition en une position relative par rapport à votre zone de jeu.
      const gameWidth = 100; // Modifiez cette valeur selon votre configuration.
      const relativePosition =
        (mousePosition / window.innerWidth) * gameWidth - gameWidth / 2;

      // Assurez-vous que le paddle reste à l'intérieur des limites
      const halfPaddleWidth = paddleWidth / 2;
      const clampedPosition = THREE.MathUtils.clamp(
        relativePosition,
        -gameWidth / 2 + halfPaddleWidth,
        gameWidth / 2 - halfPaddleWidth
      );

      setPosition([clampedPosition, position[1], position[2]]);
    } else if (!isStarted) {
      setPosition([0, 0, 0]);
    }
  });

  return (
    <>
      <group name={"paddle"}>
        {[...Array(10)].map((_, index) => (
          <RigidBody
            key={index}
            type="fixed"
            restitution={1}
            position={[
              position[0] - 5 + segmentWidth / 2 + index * segmentWidth,
              position[1],
              position[2],
            ]}
            friction={0}
            name={`${index}paddle`}
          >
            <Html>{`${index}`}</Html>
            <mesh receiveShadow position-y={-1.25}>
              <boxGeometry args={[segmentWidth, 0.5, 10]} />
              <meshStandardMaterial color={colors[`color${index + 1}`]} />
            </mesh>
          </RigidBody>
        ))}
      </group>
    </>
  );
}
