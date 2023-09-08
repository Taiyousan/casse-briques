import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import * as THREE from "three";

import { useRef, useState, useEffect } from "react";
export default function Ball() {
  const ballRef = useRef();

  const { veloX, veloY, veloZ } = useControls({
    veloX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.01,
    },
    veloY: {
      value: 22.4,
      min: -100,
      max: 100,
      step: 0.01,
    },
    veloZ: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.01,
    },
  });

  function handleCollision(event) {
    console.log("Collision détectée !");
    console.log(event.other.colliderObject.name);
    // const paddleTouched = event.other.colliderObject.name;
    // const throwAngle = 100;
    // if (paddleTouched === "0paddle") {
    //   ballRef.current.applyTorqueImpulse({
    //     x: 0,
    //     y: 0,
    //     z: throwAngle,
    //   });
    // } else if (paddleTouched === "1paddle") {
    //   ballRef.current.applyTorqueImpulse({
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   });
    // } else if (paddleTouched === "2paddle") {
    //   ballRef.current.applyTorqueImpulse({
    //     x: 0,
    //     y: 0,
    //     z: -throwAngle,
    //   });
    // }

    // setTimeout(() => {
    //   ballRef.current.setAngvel(new THREE.Vector3(0, 0, 0));
    // }, 100);
  }

  function startBall() {
    console.log("Throwing ball");
    const impulseAmount = 100; // Ajustez cette valeur selon la force que vous voulez.
    ballRef.current.applyImpulse({
      x: impulseAmount,
      y: impulseAmount,
      z: 0,
    });

    window.removeEventListener("click", startBall);
  }

  function clickTest() {
    console.log(ballRef.current.linvel());
  }

  function throwBall(event) {
    console.log("Collision détectées !");

    // Obtenez la vitesse actuelle de la balle.
    const currentVelocity = ballRef.current.linvel();
    // const minYVelocity = 1; // Ajustez selon votre jeu
    // if (Math.abs(currentVelocity.y) < minYVelocity) {
    //   currentVelocity.y = minYVelocity * (currentVelocity.y < 0 ? -1 : 1);
    // }
    console.log(currentVelocity);

    // Détectez quel objet a été touché.
    const touchedObject = event.other.colliderObject.name;

    switch (touchedObject) {
      case "topBorder":
        ballRef.current.setLinvel(
          { x: currentVelocity.x, y: -currentVelocity.y, z: currentVelocity.z },
          true
        );
        break;
      case "leftBorder":
      case "rightBorder":
        ballRef.current.setLinvel(
          { x: -currentVelocity.x, y: currentVelocity.y, z: currentVelocity.z },
          true
        );
        break;
      case "0paddle":
        ballRef.current.setLinvel(
          {
            x: -Math.abs(currentVelocity.x),
            y: -currentVelocity.y,
            z: currentVelocity.z,
          },
          true
        );
        break;
      case "1paddle":
        ballRef.current.setLinvel(
          { x: currentVelocity.x, y: -currentVelocity.y, z: currentVelocity.z },
          true
        );
        break;
      case "2paddle":
        ballRef.current.setLinvel(
          {
            x: Math.abs(currentVelocity.x),
            y: -currentVelocity.y,
            z: currentVelocity.z,
          },
          true
        );
        break;
      case "bottomBorder":
        console.log("Perdu !");
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("click", startBall);
    window.addEventListener("click", clickTest);
  }, []);

  return (
    <>
      <RigidBody
        ref={ballRef}
        colliders="ball"
        restitution={1}
        friction={0.7}
        gravityScale={10}
        onCollisionEnter={throwBall}
        lockRotations={true}
      >
        <mesh castShadow position={[0, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
