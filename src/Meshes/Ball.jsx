import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

import { useRef, useState, useEffect } from "react";
export default function Ball({ removeBrick }) {
  const ballRef = useRef();
  const ballMesh = useRef();

  const { veloX, veloY, veloZ } = useControls({
    veloX: {
      value: 0,
      min: -30,
      max: 30,
      step: 0.01,
    },
    veloY: {
      value: 22.4,
      min: -30,
      max: 30,
      step: 0.01,
    },
    veloZ: {
      value: 0,
      min: -30,
      max: 30,
      step: 0.01,
    },
  });

  useEffect(() => {
    console.log(veloX, veloY, veloZ);
    const { x, y, z } = ballRef.current.linvel();
    console.log(x, y, z);
    ballRef.current.setLinvel({ x: veloX, y: veloY, z: z }, true);
  }, [veloX, veloY, veloZ]);

  function handleCollision(event) {
    // BRICKS

    const touchedObject = event.other.colliderObject.name;
    const touchedObjectParentName =
      event.other.colliderObject.parent.parent.name;
    if (touchedObjectParentName === "brick") {
      let { x, y, z } = ballRef.current.linvel();
      setTimeout(() => {
        // destroy brick
        const brickId =
          event.other.colliderObject.parent.parent.userData.brickId;
        removeBrick(brickId);

        // change ball direction
        const minX = 5;
        if (x < minX && x > -minX) {
          x = 1;
        }
        ballRef.current.setLinvel({
          x: x,
          y: y > 0 ? -30 : 30,
          z: z,
        });
      }, 10);
    }

    // PADDLE
    if (touchedObjectParentName === "paddle") {
      setTimeout(() => {
        const { x, y, z } = ballRef.current.linvel();
        console.log(touchedObject);
        switch (touchedObject) {
          case "0paddle":
            ballRef.current.setLinvel(
              {
                x: -50,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "1paddle":
            ballRef.current.setLinvel(
              {
                x: -40,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "2paddle":
            ballRef.current.setLinvel(
              {
                x: -30,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "3paddle":
            ballRef.current.setLinvel(
              {
                x: -20,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "4paddle":
            ballRef.current.setLinvel(
              {
                x: -10,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "5paddle":
            ballRef.current.setLinvel(
              {
                x: 0,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "6paddle":
            ballRef.current.setLinvel(
              {
                x: 10,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "7paddle":
            ballRef.current.setLinvel(
              {
                x: 20,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "8paddle":
            ballRef.current.setLinvel(
              {
                x: 30,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "9paddle":
            ballRef.current.setLinvel(
              {
                x: 40,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "10paddle":
            ballRef.current.setLinvel(
              {
                x: 50,
                y: y,
                z: z,
              },
              true
            );
            break;
        }
      }, 10);
    }

    // BORDERS
    if (touchedObjectParentName === "borders") {
      let { x, y, z } = ballRef.current.linvel();
      setTimeout(() => {
        y = y >= 0 ? 30 : -30; // Force y à être soit 30, soit -30

        switch (touchedObject) {
          case "topBorder":
            ballRef.current.setLinvel(
              {
                x: x > 0 ? x : -x,
                y: y,
                z: z,
              },
              true
            );
            break;
          case "rightBorder":
          case "leftBorder":
            ballRef.current.setLinvel(
              {
                x: x,
                y: y, // Pas besoin de condition ici, car y est déjà soit 30, soit -30
                z: z,
              },
              true
            );
            break;
          case "bottomBorder":
            ballRef.current.setLinvel(
              {
                x: x > 0 ? x : -x,
                y: y,
                z: z,
              },
              true
            );
            break;
        }
      }, 10);
    }

    setTimeout(() => {
      // console.log(ballRef.current.linvel());
    }, 100);
  }

  function startBall() {
    console.log("Throwing ball");
    const impulseAmount = 100; // Ajustez cette valeur selon la force que vous voulez.
    ballRef.current.applyImpulse({
      x: -impulseAmount,
      y: impulseAmount,
      z: 0,
    });

    window.removeEventListener("click", startBall);
  }

  function clickTest() {
    // console.log(ballRef.current.linvel());
  }

  useEffect(() => {
    window.addEventListener("click", clickTest);
  }, []);

  return (
    <>
      <RigidBody
        ref={ballRef}
        colliders="ball"
        restitution={1}
        friction={0}
        gravityScale={10}
        onCollisionEnter={handleCollision}
        lockRotations={true}
        scale={[0.5, 0.5, 0.5]}
      >
        <mesh castShadow position={[0, 0, 0]} ref={ballMesh}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
