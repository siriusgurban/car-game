import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import { useGLTF } from "@react-three/drei";
import { useCarControls } from "../hooks/useCarControls";
import * as THREE from "three";

export default function Car({ rotationRef }) {
  const mesh = useRef();
  const { carPosition, setCarPosition } = useGame();
  const { controls } = useCarControls();

  const gltf = useGLTF("/models/car.glb");
  const rotation = rotationRef || useRef(0);
  const velocity = useRef(0);

  const maxSpeed = 1; // units per frame
  const acceleration = 0.01;
  const friction = 0.02;
  const rotationSpeed = 0.03;

  useFrame(() => {
    let x = carPosition[0];
    let z = carPosition[1];

    // Accelerate or brake
    if (controls.forward) velocity.current += acceleration;
    else if (controls.backward) velocity.current -= acceleration;
    else velocity.current *= 1 - friction; // natural slow down

    // Clamp speed
    if (velocity.current > maxSpeed) velocity.current = maxSpeed;
    if (velocity.current < -maxSpeed / 2) velocity.current = -maxSpeed / 2; // backward slower

    // Rotate car
    if (controls.left) rotation.current += rotationSpeed * (velocity.current >= 0 ? 1 : -1);
    if (controls.right) rotation.current -= rotationSpeed * (velocity.current >= 0 ? 1 : -1);

    // Move car
    const direction = new THREE.Vector3(Math.sin(rotation.current), 0, Math.cos(rotation.current));
    x += direction.x * velocity.current;
    z += direction.z * velocity.current;

    setCarPosition([x, z]);

    // Update mesh
    if (mesh.current) {
      mesh.current.position.set(x, 1.3, z);
      mesh.current.rotation.y = rotation.current;
    }
  });

  return <primitive ref={mesh} object={gltf.scene} scale={0.025} />;
}
