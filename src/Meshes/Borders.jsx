import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";

export default function Borders() {
  const topBorderRef = useRef();
  const rightBorderRef = useRef();
  const bottomBorderRef = useRef();
  const leftBorderRef = useRef();

  // obtenir la largeur de l'écran
  const screenWidth = 100;
  const screenHeight = 150;

  return (
    <>
      <group name={"borders"}>
        {/* TOP */}
        <RigidBody
          ref={topBorderRef}
          type="fixed"
          restitution={1}
          name={"topBorder"}
        >
          <mesh position={[0, 50, 0]}>
            <boxGeometry args={[screenWidth, 5, 5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* RIGHT */}
        <RigidBody
          ref={rightBorderRef}
          type="fixed"
          restitution={1}
          name={"rightBorder"}
        >
          <mesh position={[50, 50, 0]}>
            <boxGeometry args={[5, screenHeight, 5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* BOTTOM */}
        <RigidBody
          ref={bottomBorderRef}
          type="fixed"
          restitution={1}
          name={"bottomBorder"}
        >
          <mesh position={[0, -8, 0]}>
            <boxGeometry args={[screenWidth, 5, 5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* LEFT */}
        <RigidBody
          ref={leftBorderRef}
          type="fixed"
          restitution={1}
          name={"leftBorder"}
        >
          <mesh position={[-50, 50, 0]}>
            <boxGeometry args={[5, screenHeight, 5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
      </group>
    </>
  );
}
