import { Html } from "@react-three/drei";
import styles from "./CountDisplay.module.css";

export default function LifeDisplay({ lifeCount }) {
  return (
    <>
      <Html position={[40, 50, 0]}>
        <div className={styles.countDisplay}>
          <p> {lifeCount}</p>
        </div>
      </Html>
    </>
  );
}
