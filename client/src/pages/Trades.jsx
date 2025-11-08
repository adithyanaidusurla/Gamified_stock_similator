import { useState, useEffect } from "react";
import TradeForm from "../components/TradeForm";

export default function Trades() {
  const [trades, setTrades] = useState([]);
  const [feedback, setFeedback] = useState("");

  // Load trades from localStorage
  useEffect(() => {
    const storedTrades = JSON.parse(localStorage.getItem("trades")) || [];
    setTrades(storedTrades);
  }, []);

  // Current Level from localStorage (default 1)
  const currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;

  const handleTradeSubmit = (trade) => {
    // Simple rule-based feedback logic
    let feedbackMsg = "Tip: Think about the strategy you’re practicing. Can you reference trends, moving averages, or momentum in your reasoning?";
    let correct = false;

    if (currentLevel === 1) {
      // Level 1: Trend Following keywords
      if (/trend|moving average|uptrend|downtrend/i.test(trade.reasoning)) {
        feedbackMsg = "✅ Good reasoning! You followed the Trend strategy.";
        correct = true;
      }
    } else if (currentLevel === 2) {
      // Level 2: RSI & Momentum keywords
      if (/RSI|momentum|overbought|oversold/i.test(trade.reasoning)) {
        feedbackMsg = "✅ Great! Your reasoning matches RSI & Momentum strategy.";
        correct = true;
      }
    } else if (currentLevel === 3) {
      // Level 3: News & Sentiment keywords
      if (/news|sentiment|market psychology/i.test(trade.reasoning)) {
        feedbackMsg = "✅ Excellent! You considered news & sentiment.";
        correct = true;
      }
    }

    setFeedback(feedbackMsg);

    // Save trade
    const newTrade = { ...trade, time: new Date().toLocaleString(), feedback: feedbackMsg };
    const updatedTrades = [...trades, newTrade];
    setTrades(updatedTrades);
    localStorage.setItem("trades", JSON.stringify(updatedTrades));

    // Unlock next level if correct
    if (correct) {
      const nextLevel = currentLevel + 1;
      localStorage.setItem("currentLevel", nextLevel);
    }
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Make a Trade</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-4">
        <TradeForm onSubmit={handleTradeSubmit} />
      </div>

      {feedback && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
          <p className="text-blue-700 font-medium">{feedback}</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Trades</h2>
        {trades.length === 0 ? (
          <p className="text-gray-500 text-center">No trades yet.</p>
        ) : (
          <ul className="space-y-3">
            {trades.map((t, i) => (
              <li
                key={i}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {t.type.toUpperCase()} {t.quantity} shares of{" "}
                    <span className="text-blue-600">{t.symbol}</span>
                  </p>
                  <p className="text-sm text-gray-500">{t.reasoning}</p>
                  <p className="text-sm text-green-600 mt-1">{t.feedback}</p>
                </div>
                <p className="text-sm text-gray-400 mt-2 sm:mt-0">{t.time}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
