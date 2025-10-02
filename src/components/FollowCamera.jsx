import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FollowCamera({ carPosition, rotationRef, distance = 10, height = 5 }) {
  const { camera } = useThree();

  useFrame(() => {
    const carX = carPosition[0];
    const carZ = carPosition[1];
    const rotation = rotationRef.current;

    // Calculate camera position behind the car
    const offsetX = Math.sin(rotation) * distance;
    const offsetZ = Math.cos(rotation) * distance;

    const desiredPos = new THREE.Vector3(carX - offsetX, height, carZ - offsetZ);

    // Smooth camera movement
    camera.position.lerp(desiredPos, 0.1);

    // Look at car
    camera.lookAt(new THREE.Vector3(carX, 0.5, carZ));
  });

  return null;
}
