import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import { useRef } from "react";

export default function Timer() {
  const { time, setTime } = useGame();
  const last = useRef(performance.now());

  useFrame(() => {
    const now = performance.now();
    const delta = (now - last.current) / 1000; // seconds
    last.current = now;
    setTime((prev) => prev + delta);
  });

  return null; // no visible output, just updates context
}
