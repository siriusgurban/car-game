import { useEffect, useState } from "react";
import { Sky } from "@react-three/drei";

export default function AnimatedSky() {
  const [time, setTime] = useState(12); // noon start

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => (t + 0.01) % 24); // 24-hour cycle
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const angle = (time / 24) * Math.PI * 2;
  const sunX = Math.sin(angle) * 100;
  const sunY = Math.cos(angle) * 100;

  return (
    <Sky
      distance={450000}
      sunPosition={[sunX, sunY, 100]}
      turbidity={8}
      rayleigh={3}
      mieCoefficient={0.005}
      mieDirectionalG={0.8}
    />
  );
}
