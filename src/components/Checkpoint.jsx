// src/components/Checkpoint.jsx
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import * as THREE from "three";

/**
 * Props:
 *  - id
 *  - position: [x, z]
 *  - rotation: radians (optional)
 *  - radius: detection radius (optional) — increase it to match your map scale
 */
export default function Checkpoint({ id, position, rotation = 0, radius = 6 }) {
  const mesh = useRef();
  const { carPosition, collectCheckpoint, checkpoints, setRaceFinished } = useGame();
  const [visible, setVisible] = useState(true);

  const checkpointData = checkpoints.find((cp) => cp.id === id);

  useFrame(() => {
    // If already collected or missing, hide and skip
    if (!checkpointData || checkpointData.collected) {
      if (visible) setVisible(false);
      return;
    }

    // distance in XZ plane
    const dx = carPosition[0] - position[0];
    const dz = carPosition[1] - position[1];
    const distance = Math.sqrt(dx * dx + dz * dz);

    // adjust radius to your world scale; default 6 is bigger than before
    if (distance <= radius) {
      // mark collected
      collectCheckpoint(id);
      setVisible(false);

      // compute how many are collected _now_ (treat this one as collected)
      const collectedCount = checkpoints.filter((c) => c.collected).length + 1;
      if (collectedCount >= checkpoints.length) {
        setRaceFinished(true);
      }

      // debug log (remove in production)
      // console.log(`Collected checkpoint ${id} — ${collectedCount}/${checkpoints.length}`);
    }
  });

  if (!visible) return null;

  return (
    <group ref={mesh} position={[position[0], 1, position[1]]} rotation={[0, rotation, 0]}>
      {/* Golden arch: two pillars and top */}
      <mesh position={[-3.5, 0, 0]}>
        <boxGeometry args={[0.2, 8, 0.2]} />
        <meshStandardMaterial color="gold" emissive="yellow" emissiveIntensity={1} />
      </mesh>
      <mesh position={[3.5, 0, 0]}>
        <boxGeometry args={[0.2, 8, 0.2]} />
        <meshStandardMaterial color="gold" emissive="yellow" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[7, 0.2, 0.2]} />
        <meshStandardMaterial color="gold" emissive="yellow" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}
