import { Html } from "@react-three/drei";
import styles from "./button.module.css";

export default function StartButton({ isStarted, setIsStarted, lifeCount }) {
  const restartGame = () => {
    console.log("plk");
    window.location.reload();
  };
  return (
    <>
      <Html position={[0, 10, 0]}>
        {lifeCount != 0 ? (
          <div
            className={styles.startButton}
            onClick={() => {
              setIsStarted(true);
            }}
          >
            <p>Lancer</p>
          </div>
        ) : (
          <div
            className={styles.startButton}
            onClick={() => {
              restartGame();
            }}
          >
            <p>Recommencer </p>
          </div>
        )}
      </Html>
    </>
  );
}
