import { Html } from "@react-three/drei";
import styles from "./CountDisplay.module.css";

export default function ScoreDisplay({ score, isCombo }) {
  return (
    <>
      <Html position={[30, 50, 0]}>
        <div className={styles.countDisplay}>
          <p> {score}</p>
        </div>
      </Html>
      {isCombo && (
        <Html position={[30, 50, 0]}>
          <div className={styles.combo}>
            <p className={styles.comboTexte}>x2</p>
          </div>
        </Html>
      )}
    </>
  );
}
