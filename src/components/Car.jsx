import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import { useGLTF } from "@react-three/drei";
import { useCarControls } from "../hooks/useCarControls";
import * as THREE from "three";

export default function Car({ rotationRef }) {
  const mesh = useRef();
  const { carPosition, setCarPosition } = useGame();
  const { controls, speed, rotationSpeed } = useCarControls();

  const gltf = useGLTF("/models/car.glb");

  const rotation = rotationRef || useRef(0); // use external ref if provided

  useFrame(() => {
    let x = carPosition[0];
    let z = carPosition[1];

    // Rotate car
    if (controls.left) rotation.current += rotationSpeed;
    if (controls.right) rotation.current -= rotationSpeed;

    // Move car forward/backward based on rotation
    const direction = new THREE.Vector3(
      Math.sin(rotation.current),
      0,
      Math.cos(rotation.current)
    );

    if (controls.forward) {
      x += direction.x * speed;
      z += direction.z * speed;
    }
    if (controls.backward) {
      x -= direction.x * speed;
      z -= direction.z * speed;
    }

    // Update car position in context
    setCarPosition([x, z]);

    // Update mesh
    if (mesh.current) {
      mesh.current.position.set(x, 1.3, z);
      mesh.current.rotation.y = rotation.current;
    }
  });

  return <primitive ref={mesh} object={gltf.scene} scale={0.025} />;
}
