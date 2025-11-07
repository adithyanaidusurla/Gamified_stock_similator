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
    <div className="mt-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Make a Trade
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
        <TradeForm onSubmit={handleTradeSubmit} />
      </div>

      <div className="bg-gray-50 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Trades
        </h2>
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
