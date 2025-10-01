import { useState } from "react";
import TradeForm from "../components/TradeForm";

export default function Trades() {
  const [trades, setTrades] = useState([]);

  const handleTradeSubmit = (trade) => {
    setTrades((prev) => [
      ...prev,
      { ...trade, time: new Date().toLocaleString() },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Make a Trade 📈
      </h1>

      {/* Trade Form */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <TradeForm onSubmit={handleTradeSubmit} />
      </div>

      {/* Trade History */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Trade History
        </h2>
        <ul className="space-y-4">
          {trades.map((t, i) => (
            <li
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <span className="font-medium">
                {t.time} - {t.type.toUpperCase()} {t.quantity} shares of{" "}
                {t.symbol.toUpperCase()}
              </span>
              <span className="mt-2 sm:mt-0 text-gray-500 dark:text-gray-300">
                Price: ${t.price ?? "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
