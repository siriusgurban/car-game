import { useEffect, useRef } from "react";

export default function CarSound(velocity) {
  const engineStart = useRef(new Audio("/sounds/engine_start.mp3"));
  const engineIdle = useRef(new Audio("/sounds/engine_idle.mp3"));
  const engineDrive = useRef(new Audio("/sounds/engine_drive.mp3"));
  const brake = useRef(new Audio("/sounds/brake.mp3"));

  useEffect(() => {
    engineStart.current.play();
    engineIdle.current.loop = true;
    engineIdle.current.play();
  }, []);

  useEffect(() => {
    if (Math.abs(velocity.current) > 0.01) {
      engineIdle.current.pause();
      engineDrive.current.loop = true;
      engineDrive.current.play();
    } else {
      engineDrive.current.pause();
      engineIdle.current.play();
    }
  }, [velocity.current]);
}
