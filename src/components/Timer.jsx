// src/components/Timer.jsx
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import { useRef, useEffect } from "react";

export default function Timer() {
  const { time, setTime, raceFinished } = useGame();
  const last = useRef(performance.now());

  // Ensure last is reset when raceFinished toggles (so delta isn't huge after reset)
  useEffect(() => {
    last.current = performance.now();
  }, [raceFinished]);

  useFrame(() => {
    if (raceFinished) return; // don't advance time after finish

    const now = performance.now();
    const delta = (now - last.current) / 1000; // seconds
    last.current = now;
    setTime((prev) => prev + delta);
  });

  return null;
}
