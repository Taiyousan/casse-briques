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
    console.log("Collision détectéess !");

    const randomNumber = Math.random() * 50 - 50;
    ballRef.current.setLinvel({ x: 20, y: 20, z: 0 }, true);
    console.log(ballRef.current.linvel());
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
        linvel={[veloX, veloY, veloZ]}
      >
        <mesh castShadow position={[0, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
