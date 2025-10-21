// src/components/Timer.jsx
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import { useRef, useEffect } from "react";

export default function Timer() {
  const { setTime, raceFinished, raceStarted } = useGame();
  const last = useRef(performance.now());

  useEffect(() => {
    last.current = performance.now();
  }, [raceFinished, raceStarted]);

  useFrame(() => {
    if (!raceStarted || raceFinished) return;

    const now = performance.now();
    const delta = (now - last.current) / 1000;
    last.current = now;
    setTime((prev) => prev + delta);
  });

  return null;
}
