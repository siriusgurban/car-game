import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import { useGLTF } from "@react-three/drei";
import { useCarControls } from "../hooks/useCarControls";
import * as THREE from "three";

export default function Car({ rotationRef }) {
  const mesh = useRef();
  const { carPosition, setCarPosition, setCarVelocity, carVelocity } = useGame();
  const { controls } = useCarControls();

  const gltf = useGLTF("/models/car.glb");
  const rotation = rotationRef || useRef(0);
  const velocity = useRef(0);
  const smoothPosition = useRef(new THREE.Vector3(carPosition[0], 1.3, carPosition[1]));
  const targetPosition = useRef(new THREE.Vector3(carPosition[0], 1.3, carPosition[1]));

  const maxSpeed = 1;
  const acceleration = 0.01;
  const friction = 0.02;
  const rotationSpeed = 0.03;


  useFrame((_, delta) => {

    setCarVelocity(velocity.current);

    let x = targetPosition.current.x;
    let z = targetPosition.current.z;

    // Accelerate or brake
    if (controls.forward) velocity.current += acceleration;
    else if (controls.backward) velocity.current -= acceleration;
    else velocity.current *= 1 - friction;

    // Clamp speed
    velocity.current = THREE.MathUtils.clamp(velocity.current, -maxSpeed / 2, maxSpeed);

    // Rotate car
    if (controls.left) rotation.current += rotationSpeed * (velocity.current >= 0 ? 1 : -1);
    if (controls.right) rotation.current -= rotationSpeed * (velocity.current >= 0 ? 1 : -1);

    // Move car
    const direction = new THREE.Vector3(Math.sin(rotation.current), 0, Math.cos(rotation.current));
    x += direction.x * velocity.current;
    z += direction.z * velocity.current;

    targetPosition.current.set(x, 1.3, z);

    // Smooth transition between frames (LERP)
    smoothPosition.current.lerp(targetPosition.current, 0.15);

    // Update mesh position
    if (mesh.current) {
      mesh.current.position.copy(smoothPosition.current);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, rotation.current, 0.2);
    }

    // Update game state position
    setCarPosition([targetPosition.current.x, targetPosition.current.z]);
  });

  return <primitive ref={mesh} object={gltf.scene} scale={0.025} />;
}
