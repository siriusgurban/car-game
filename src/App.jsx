import { Canvas } from "@react-three/fiber";
import { GameProvider, useGame } from "./context/GameContext";
import Map from "./components/Map";
import Car from "./components/Car";
import Checkpoint from "./components/Checkpoint";
import HUD from "./components/HUD";
import FollowCamera from "./components/FollowCamera";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

// Preload models
useGLTF.preload("/models/car.glb");
useGLTF.preload("/models/map.glb");

// This component is INSIDE the provider, so useGame() works here
function GameCanvas() {
  const { carPosition } = useGame(); // ✅ now safe
const carRotation = useRef(Math.PI / -1.4);
  return (
    <Canvas
      shadows
      style={{ width: "100%", height: "100%" }}
      camera={{ fov: 75, position: [0, 5, -10] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

        <gridHelper args={[200, 200, "white", "gray"]} rotation={[0, 0, 0]} position={[25, 0, 50]} />

      <Map />
      <Car rotationRef={carRotation} />
      <Checkpoint id={1} position={[5, 0]} />
      <Checkpoint id={2} position={[10, 0]} />
      <FollowCamera carPosition={carPosition} rotationRef={carRotation} distance={10} height={5} />
    </Canvas>
  );
}

export default function App() {
  return (
    <GameProvider>
      <HUD />           {/* HUD can also use useGame() safely */}
      <GameCanvas />    {/* everything that uses useGame() */}
    </GameProvider>
  );
}
