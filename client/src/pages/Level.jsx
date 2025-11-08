import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Level() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);

  // Load currentLevel from localStorage
  useEffect(() => {
    const storedLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
    setCurrentLevel(storedLevel);
  }, []);

  const levels = [
    {
      name: "Level 1: Trend Following",
      desc: "Learn to identify uptrends and downtrends using moving averages.",
    },
    {
      name: "Level 2: RSI & Momentum",
      desc: "Spot overbought and oversold signals using RSI.",
    },
    {
      name: "Level 3: News & Sentiment",
      desc: "Analyze market psychology and sentiment-based trading.",
    },
  ];

  return (
    <div className="mt-20 max-w-5xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Learn & Progress 🧭
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((lvl, i) => {
          const unlocked = currentLevel >= i + 1;
          return (
            <div
              key={i}
              className={`p-6 rounded-2xl shadow-md border transition ${
                unlocked
                  ? "bg-white hover:shadow-lg"
                  : "bg-gray-100 opacity-70 cursor-not-allowed"
              }`}
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {lvl.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{lvl.desc}</p>
              {unlocked ? (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition"
                  onClick={() => navigate("/trade")}
                >
                  Start Level
                </button>
              ) : (
                <button
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg w-full cursor-not-allowed"
                  disabled
                >
                  Locked 🔒
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
