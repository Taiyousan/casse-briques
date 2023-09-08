import { RigidBody } from "@react-three/rapier";
// importer THREE
import * as THREE from "three";

import { useRef, useState, useEffect } from "react";
export default function Ball() {
  const ballRef = useRef();

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
    const impulseAmount = 50; // Ajustez cette valeur selon la force que vous voulez.
    ballRef.current.applyImpulse({
      x: impulseAmount,
      y: impulseAmount,
      z: 0,
    });

    window.removeEventListener("click", startBall);
  }

  function throwBall(event) {
    console.log("Collision détectée !");
    console.log(event.other.colliderObject.name);

    let normal;

    // Supposons que la normale dépende de l'objet touché
    switch (event.other.colliderObject.name) {
      case "topBorder":
        normal = new THREE.Vector3(0, -1, 0);
        break;
      case "bottomBorder":
        normal = new THREE.Vector3(0, 1, 0);
        break;
      case "leftBorder":
        normal = new THREE.Vector3(1, 0, 0);
        break;
      case "rightBorder":
        normal = new THREE.Vector3(-1, 0, 0);
        break;
      default:
        normal = new THREE.Vector3(0, 1, 0);
    }

    // Obtenez la vitesse actuelle de la balle (ne la normalisez pas cette fois)
    const currentVelocity = ballRef.current.linvel.clone();

    // Calculez la nouvelle vitesse reflétée
    const reflectedVelocity = currentVelocity.sub(
      normal.multiplyScalar(2 * currentVelocity.dot(normal))
    );

    // Appliquez l'impulsion à la balle
    ballRef.current.applyImpulse(reflectedVelocity);
  }

  useEffect(() => {
    window.addEventListener("click", startBall);
  }, []);

  return (
    <>
      <RigidBody
        ref={ballRef}
        colliders="ball"
        restitution={0}
        friction={0.7}
        gravityScale={10}
        onCollisionEnter={throwBall}
      >
        <mesh castShadow position={[0, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
