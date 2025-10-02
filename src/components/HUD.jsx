import { useGame } from "../context/GameContext";

export default function HUD() {
  const { time, checkpoints } = useGame();
  const collectedCount = checkpoints.filter(cp => cp.collected).length;

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
      <div>Time: {time.toFixed(2)}</div>
      <div>Checkpoints: {collectedCount} / {checkpoints.length}</div>
    </div>
  );
}
