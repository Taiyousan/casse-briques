import { useKeyboardControls, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { RigidBody, Physics } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

export default function Experience() {
  const [position, setPosition] = useState([0, 0, 0]);
  const [direction, setDirection] = useState(0); // -1 pour gauche, 1 pour droite, 0 pour arrêt

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

  useFrame(() => {
    if (direction !== 0) {
      setPosition((prev) => [prev[0] + direction * 0.5, prev[1], prev[2]]);
    }
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics debug>
        <RigidBody colliders="ball" restitution={1} friction={0.7}>
          <mesh castShadow position={[0, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* <RigidBody>
          <mesh castShadow position={[2, 2, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody colliders="trimesh">
          <mesh
            castShadow
            position={[0, 1, -0.25]}
            rotation={[Math.PI * 0.1, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          type="fixed"
          restitution={1}
          position={position}
          friction={0.7}
        >
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
