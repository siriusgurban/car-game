// src/components/StartMenu.jsx
import { useGame } from "../context/GameContext";

export default function StartMenu() {
  const { raceStarted, startGame } = useGame();

  if (raceStarted) return null;

  return (
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
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#111",
          padding: 40,
          borderRadius: 12,
          textAlign: "center",
          color: "white",
          minWidth: 300,
        }}
      >
        <h1 style={{ marginBottom: 20 }}>🏁 Racing Game</h1>
        <button
          onClick={startGame}
          style={{
            padding: "12px 28px",
            fontSize: 18,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
