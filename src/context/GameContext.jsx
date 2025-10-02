import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [carPosition, setCarPosition] = useState([4, 136]);
    const [carRotation, setCarRotation] = useState(0);
    const [checkpoints, setCheckpoints] = useState([
        { id: 1, position: [-5, 126], rotation: Math.PI / -1.3, collected: false },
        { id: 2, position: [-150, -13], rotation: Math.PI / 0.9, collected: false },
        { id: 3, position: [67, -70], rotation: Math.PI / 0.8, collected: false },
        { id: 4, position: [-80, -69], rotation: -Math.PI / 0.71, collected: false },
        { id: 5, position: [60, 145], rotation: 0, collected: false },
    ]);

    const [time, setTime] = useState(0);

    const collectCheckpoint = (id) => {
        setCheckpoints((prev) =>
            prev.map((cp) => (cp.id === id ? { ...cp, collected: true } : cp))
        );
    };

    return (
        <GameContext.Provider value={{ carPosition, setCarPosition, checkpoints, collectCheckpoint, time, setTime, carRotation, setCarRotation }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
