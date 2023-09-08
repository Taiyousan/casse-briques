import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export default function Paddle({ direction }) {
  const [position, setPosition] = useState([0, 0, 0]);
  const paddleWidth = 10;
  const segmentWidth = paddleWidth / 3;

  const randomColor = () =>
    new THREE.Color(Math.random(), Math.random(), Math.random());

  const [colors, setColors] = useState({
    color1: randomColor(),
    color2: randomColor(),
    color3: randomColor(),
  });

  useFrame(() => {
    if (direction !== 0) {
      setPosition((prev) => [prev[0] + direction * 0.5, prev[1], prev[2]]);
    }
  });

  return (
    <>
      {[...Array(3)].map((_, index) => (
        <RigidBody
          key={index}
          type="fixed"
          restitution={0}
          position={[
            position[0] - 5 + segmentWidth / 2 + index * segmentWidth,
            position[1],
            position[2],
          ]}
          friction={0.7}
          name={`${index}paddle`}
        >
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[segmentWidth, 0.5, 10]} />
            <meshStandardMaterial color={colors[`color${index + 1}`]} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}
