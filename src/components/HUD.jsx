// src/components/HUD.jsx
import { useGame } from "../context/GameContext";
import Speedometer from "./Speedometer";

export default function HUD() {
  const { time, checkpoints, carVelocity, maxSpeed, raceFinished, resetGame, raceStarted } = useGame();

  if (!raceStarted) return null; // hide HUD before game starts

  const collectedCount = checkpoints.filter((cp) => cp.collected).length;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");

  const safeVelocity = typeof carVelocity === "number" ? carVelocity : 0;
  const safeMaxSpeed = typeof maxSpeed === "number" ? maxSpeed : 0.3;

  return (
    <>
      {/* Stats */}
      <div style={{ position: "absolute", top: 10, left: 10, color: "white", zIndex: 1000, fontSize: 24, fontWeight: "bold", lineHeight: 1.5, padding: 12, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 8 }}>
        <div>Time: {minutes}:{seconds}</div>
        <div>Checkpoints: {collectedCount} / {checkpoints.length}</div>
      </div>

      {/* Speedometer */}
      <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 1000 }}>
        <Speedometer speed={Math.abs(carVelocity)} maxSpeed={maxSpeed} />
      </div>

      {/* Finish overlay */}
      {raceFinished && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 9999,
          }}
        >
          <div style={{ background: "#111", borderRadius: 12, padding: 28, textAlign: "center", color: "#FFD700" }}>
            <h1>🎉 Congratulations! 🎉</h1>
            <p>Your time: {minutes}:{seconds}</p>
            <button onClick={resetGame} style={{ padding: "10px 20px", fontSize: 16, borderRadius: 8 }}>
              Reset Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}
