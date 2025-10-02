import { useGame } from "../context/GameContext";
import Speedometer from "./Speedometer";

export default function HUD() {
  const { time, checkpoints, carVelocity, maxSpeed } = useGame();

  const collectedCount = checkpoints.filter(cp => cp.collected).length;

    // Convert time in seconds to minutes:seconds
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0"); // always two digits


  // Safe values if undefined
  const safeVelocity = typeof carVelocity === "number" ? carVelocity : 0;
  const safeMaxSpeed = typeof maxSpeed === "number" ? maxSpeed : 0.3;

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        color: "white",
        fontFamily: "Arial",
        fontSize: "18px",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      <div>Time: {minutes}:{seconds}</div>
      <div>Checkpoints: {collectedCount} / {checkpoints.length}</div>

      <Speedometer speed={Math.abs(safeVelocity)} maxSpeed={safeMaxSpeed} />
    </div>
  );
}
