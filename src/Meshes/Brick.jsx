import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";

export default function Borders({ position = [0, 0, 0], brickId }) {
  const topLeft = useRef();
  const topRight = useRef();
  const bottomLeft = useRef();
  const bottomRight = useRef();

  // obtenir la largeur de l'écran
  const brickWidth = 5;
  const brickHeight = 1;

  return (
    <>
      <group
        position={position}
        userData={{ brickId: brickId }}
        name={"brick"}
        onClick={() => onClick(id)}
      >
        {/* TOP-LEFT */}
        <RigidBody
          ref={topLeft}
          type="fixed"
          friction={0}
          restitution={1}
          name={"topLeft"}
        >
          <mesh position={[0, brickHeight, 0]}>
            <boxGeometry args={[brickWidth, brickHeight, 5]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </RigidBody>

        {/* TOP-RIGHT */}
        <RigidBody
          ref={topRight}
          type="fixed"
          friction={0}
          restitution={1}
          name={"topRight"}
        >
          <mesh position={[5, brickHeight, 0]}>
            <boxGeometry args={[brickWidth, brickHeight, 5]} />
            <meshStandardMaterial color="pink" />
          </mesh>
        </RigidBody>

        {/* BOTTOM-LEFT */}
        <RigidBody
          ref={bottomLeft}
          type="fixed"
          friction={0}
          restitution={1}
          name={"bottomLeft"}
        >
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[brickWidth, brickHeight, 5]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>

        {/* BOTTOM-RIGHT */}
        <RigidBody
          ref={bottomRight}
          type="fixed"
          friction={0}
          restitution={1}
          name={"bottomRight"}
        >
          <mesh position={[5, 0, 0]}>
            <boxGeometry args={[brickWidth, brickHeight, 5]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
        </RigidBody>
      </group>
    </>
  );
}
