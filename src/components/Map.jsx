import { useGLTF } from "@react-three/drei";

export default function Map() {
  const gltf = useGLTF("/models/map.glb");
  return <primitive object={gltf.scene} />;
}
