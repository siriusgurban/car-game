// src/context/GameContext.jsx
import { createContext, useContext, useState, useCallback, useRef } from "react";

const GameContext = createContext();

const INITIAL_STATE = {
  carPosition: [4, 136],
  carRotation: 0,
  checkpoints: [
    { id: 1, position: [-5, 126], rotation: Math.PI / -1.3, collected: false },
    { id: 2, position: [-150, -13], rotation: Math.PI / 0.9, collected: false },
    { id: 3, position: [67, -70], rotation: Math.PI / 0.8, collected: false },
    { id: 4, position: [-80, -69], rotation: -Math.PI / 0.71, collected: false },
    { id: 5, position: [60, 145], rotation: 0, collected: false },
  ],
  time: 0,
  raceFinished: false,
  raceStarted: false,
  carVelocity: 0,
};

export const GameProvider = ({ children }) => {
  const [carPosition, setCarPosition] = useState(INITIAL_STATE.carPosition);
  const [carRotation, setCarRotation] = useState(INITIAL_STATE.carRotation);
  const [checkpoints, setCheckpoints] = useState(INITIAL_STATE.checkpoints);
  const [time, setTime] = useState(INITIAL_STATE.time);
  const [raceFinished, setRaceFinished] = useState(INITIAL_STATE.raceFinished);
  const [raceStarted, setRaceStarted] = useState(INITIAL_STATE.raceStarted);
  const [carVelocity, setCarVelocity] = useState(INITIAL_STATE.carVelocity);

  // Optional: track if reset happened (to prevent animation hiccups)
  const resetFlag = useRef(false);

  const collectCheckpoint = useCallback((id) => {
    setCheckpoints((prev) =>
      prev.map((cp) =>
        cp.id === id ? { ...cp, collected: true } : cp
      )
    );
  }, []);

  const startGame = useCallback(() => {
    setTime(0);
    setRaceFinished(false);
    setRaceStarted(true);
  }, []);

  const resetGame = useCallback(() => {
    resetFlag.current = true;
    setCarPosition([...INITIAL_STATE.carPosition]);
    setCarRotation(INITIAL_STATE.carRotation);
    setCheckpoints(INITIAL_STATE.checkpoints.map(cp => ({ ...cp })));
    setTime(0);
    setRaceFinished(false);
    setRaceStarted(false);
    setCarVelocity(0);

    // Optional: instead of reload, reset state properly
    // window.location.reload(); // You can still keep it if needed
  }, []);

  return (
    <GameContext.Provider
      value={{
        carPosition,
        setCarPosition,
        carRotation,
        setCarRotation,
        checkpoints,
        collectCheckpoint,
        time,
        setTime,
        raceFinished,
        setRaceFinished,
        resetGame,
        raceStarted,
        startGame,
        carVelocity,
        setCarVelocity,
        resetFlag,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
