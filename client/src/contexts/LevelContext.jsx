import { createContext, useContext, useState, useEffect } from "react";

const LevelContext = createContext();

export function LevelProvider({ children }) {
  const [currentLevel, setCurrentLevel] = useState(1);

  // Load level from localStorage on mount
  useEffect(() => {
    const storedLevel = localStorage.getItem("currentLevel");
    if (storedLevel) setCurrentLevel(parseInt(storedLevel));
  }, []);

  // Save level to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentLevel", currentLevel);
  }, [currentLevel]);

  const unlockNextLevel = () => setCurrentLevel((prev) => prev + 1);

  const resetLevels = () => {
    setCurrentLevel(1);
    localStorage.removeItem("currentLevel");
  };

  return (
    <LevelContext.Provider value={{ currentLevel, unlockNextLevel, resetLevels }}>
      {children}
    </LevelContext.Provider>
  );
}

export const useLevel = () => useContext(LevelContext);
