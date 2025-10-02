// src/components/HUD.jsx
import { useGame } from "../context/GameContext";
import Speedometer from "./Speedometer";

export default function HUD() {
  const { time, checkpoints, carVelocity, maxSpeed, raceFinished, resetGame } = useGame();

  const collectedCount = checkpoints.filter((cp) => cp.collected).length;

  // Convert seconds to mm:ss
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");

  const safeVelocity = typeof carVelocity === "number" ? carVelocity : 0;
  const safeMaxSpeed = typeof maxSpeed === "number" ? maxSpeed : 0.3;

  return (
    <>
      {/* Top-left stats */}
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
      </div>

      {/* Speedometer bottom-right */}
      <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 1000 }}>
        <Speedometer speed={Math.abs(safeVelocity)} maxSpeed={safeMaxSpeed} />
      </div>

      {/* Full-screen overlay on finish */}
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
          <div
            style={{
              background: "#111",
              borderRadius: 12,
              padding: 28,
              textAlign: "center",
              color: "#FFD700",
              minWidth: 300,
            }}
          >
            <h1 style={{ margin: 0 }}>🎉 Congratulations! 🎉</h1>
            <p style={{ fontSize: 20, margin: "12px 0" }}>Your time: {minutes}:{seconds}</p>
            <button
              onClick={resetGame}
              style={{
                marginTop: 10,
                padding: "10px 20px",
                fontSize: 16,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Reset Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}
