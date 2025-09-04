import { useState } from 'react';
import TradeForm from '../components/TradeForm';

export default function Trades() {
  const [trades, setTrades] = useState([]);

  const handleTradeSubmit = (trade) => {
    setTrades((prev) => [...prev, { ...trade, time: new Date().toLocaleString() }]);
  };

  return (
    <div className="p-6">
      <TradeForm onSubmit={handleTradeSubmit} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Trade History</h2>
        <ul className="space-y-2">
          {trades.map((t, i) => (
            <li key={i} className="bg-white p-4 rounded shadow">
              {t.time} - {t.type.toUpperCase()} {t.quantity} shares of {t.symbol}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
