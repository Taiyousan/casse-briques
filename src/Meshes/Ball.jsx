import { RigidBody } from "@react-three/rapier";
import { usePause } from "../Utils/PauseContext";
import { useRef, useState, useEffect } from "react";
export default function Ball({
  removeBrick,
  setIsCombo,
  lifeCount,
  setLifeCount,
  isStarted,
  setIsStarted,
  isPaused,
  setIsPaused,
}) {
  const ballRef = useRef();
  const ballMesh = useRef();
  // const isStartedRef = useRef(isStarted);
  // const { isPaused } = usePause();

  const veloX = 0;
  const veloY = 22.4;
  const veloZ = 0;

  const [ballPosition, setBallPosition] = useState([0, 0, 0]);
  const [isBall, setIsBall] = useState(true);

  // PAUSE ----------------------------------------------------------------------
  const [lastVelocity, setLastVelocity] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (isPaused) {
      // Enregistrez la vitesse actuelle de la balle pour pouvoir la restaurer plus tard
      const currentVelocity = ballRef.current.linvel();
      setLastVelocity(currentVelocity);

      // Définissez la vitesse de la balle à 0 pour la "geler"
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    } else if (!isPaused && isStarted) {
      // Restaurez la vitesse précédente de la balle lorsque le jeu est repris
      ballRef.current.setLinvel(lastVelocity, true);
    }
  }, [isPaused]);
  //--------------------------------------------------------------------------------

  // START BALL ---------------------------------------------------------------------
  function startBall() {
    console.log("Throwing ball");
    setIsPaused(true);
    setIsPaused(false);
    const impulseAmount = 10; // Ajustez cette valeur selon la force que vous voulez.
    // ballRef.current.applyImpulse({
    //   x: -impulseAmount,
    //   y: impulseAmount,
    //   z: 0,
    // });
    ballRef.current.setLinvel({ x: -impulseAmount, y: impulseAmount, z: 0 });
  }

  useEffect(() => {
    console.log("isStarted", isStarted);
    if (isStarted) {
      startBall();
    }
  }, [isStarted]);
  //  --------------------------------------------------------------------------------

  // GAME OVER ---------------------------------------------------------------------
  const handleGameOver = () => {
    console.log("Game Over");
    ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    setIsBall(false);
    setTimeout(() => {
      setIsBall(true);
      setIsStarted(false);
    }, 1000);
  };
  // --------------------------------------------------------------------------------

  // ?? ---------------------------------------------------------------------
  // useEffect(() => {
  //   console.log(veloX, veloY, veloZ);
  //   const { x, y, z } = ballRef.current.linvel();
  //   console.log(x, y, z);
  //   ballRef.current.setLinvel({ x: veloX, y: veloY, z: z }, true);
  // }, [veloX, veloY, veloZ]);
  // --------------------------------------------------------------------------------

  // COLLISIONS ---------------------------------------------------------------------
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
      setIsCombo(false);
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
                x: 0,
                y: 0,
                z: 0,
              },
              true
            );
            setLifeCount((prev) => prev - 1);
            handleGameOver();
            break;
        }
      }, 10);
    }
  }
  // --------------------------------------------------------------------------------

  // TEST STATES
  useEffect(() => {
    console.log("BALL : isPaused", isPaused);
  }, [isPaused]);
  //---------------------------------------------------------------------

  return (
    <>
      {isBall && (
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
          <mesh castShadow position={ballPosition} ref={ballMesh}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
      )}
    </>
  );
}
