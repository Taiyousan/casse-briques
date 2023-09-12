import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import { PauseProvider } from "./Utils/PauseContext";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <PauseProvider>
    <Canvas
      className="canvas"
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 20, 80],
      }}
    >
      <Experience />
    </Canvas>
  </PauseProvider>
);
