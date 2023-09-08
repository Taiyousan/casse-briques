import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";

export default function Borders() {
  const topBorderRef = useRef();
  const rightBorderRef = useRef();

  // obtenir la largeur de l'écran
  const screenWidth = 100;
  const screenHeight = 150;

  return (
    <>
      {/* TOP */}
      <RigidBody
        ref={topBorderRef}
        type="fixed"
        restitution={0}
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
        restitution={0}
        name={"rightBorder"}
      >
        <mesh position={[50, 50, 0]}>
          <boxGeometry args={[5, screenHeight, 5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      {/* BOTTOM */}
      <RigidBody
        ref={topBorderRef}
        type="fixed"
        restitution={0}
        name={"bottomBorder"}
      >
        <mesh position={[0, -8, 0]}>
          <boxGeometry args={[screenWidth, 5, 5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      {/* LEFT */}
      <RigidBody
        ref={rightBorderRef}
        type="fixed"
        restitution={0}
        name={"leftBorder"}
      >
        <mesh position={[-50, 50, 0]}>
          <boxGeometry args={[5, screenHeight, 5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
    </>
  );
}
