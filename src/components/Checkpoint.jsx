import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";

export default function Checkpoint({ id, position }) {
  const mesh = useRef();
  const { carPosition, collectCheckpoint, checkpoints } = useGame();
  const collected = checkpoints.find(cp => cp.id === id)?.collected;

  useFrame(() => {
    if (!collected) {
      const dx = carPosition[0] - position[0];
      const dz = carPosition[1] - position[1];
      if (Math.sqrt(dx*dx + dz*dz) < 1) collectCheckpoint(id);
    }
  });

  if (collected) return null;

  return (
    <mesh ref={mesh} position={[position[0],0.5,position[1]]}>
      <cylinderGeometry args={[0.5,0.5,1,32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}
