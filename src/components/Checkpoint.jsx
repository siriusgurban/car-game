import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import * as THREE from "three";

export default function Checkpoint({ id, position, rotation = 0 }) {
    const mesh = useRef();
    const { carPosition, collectCheckpoint, checkpoints } = useGame();
    const [visible, setVisible] = useState(true);

    const checkpointData = checkpoints.find((cp) => cp.id === id);

    useFrame(() => {
        if (!checkpointData || checkpointData.collected) {
            setVisible(false);
            return;
        }

        const dx = carPosition[0] - position[0];
        const dz = carPosition[1] - position[1];
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < 1.5) {
            collectCheckpoint(id);
            setVisible(false);
        }
    });

    if (!visible) return null;

    return (
        <group ref={mesh} position={[position[0], 1, position[1]]} rotation={[0, rotation, 0]}>
            {/* Golden arch: two pillars and top */}
            <mesh position={[-3.5, 0, 0]}>
                <boxGeometry args={[0.2, 8, 0.2]} />
                <meshStandardMaterial color="gold" />
            </mesh>
            <mesh position={[3.5, 0, 0]}>
                <boxGeometry args={[0.2, 8, 0.2]} />
                <meshStandardMaterial color="gold" />
            </mesh>
            <mesh position={[0, 4, 0]}>
                <boxGeometry args={[7, 0.2, 0.2]} />
                <meshStandardMaterial color="gold" />
            </mesh>
        </group>
    );
}

