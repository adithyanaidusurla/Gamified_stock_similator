// src/Portfolio.jsx
import React from 'react';

function computePortfolio(trades) {
  const portfolio = {};

  for (const trade of trades) {
    const { symbol, quantity, price, type } = trade;
    const qty = Number(quantity);
    const cost = price * qty;

    if (!portfolio[symbol]) {
      portfolio[symbol] = { quantity: 0, cost: 0 };
    }

    if (type === 'buy') {
      portfolio[symbol].quantity += qty;
      portfolio[symbol].cost += cost;
    } else if (type === 'sell') {
      portfolio[symbol].quantity -= qty;
      portfolio[symbol].cost -= (portfolio[symbol].cost / portfolio[symbol].quantity) * qty;
    }
  }

  return portfolio;
}

export default function Portfolio({ trades }) {
  const portfolio = computePortfolio(trades);

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">📊 Portfolio</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Shares</th>
            <th className="px-4 py-2 text-left">Avg Price</th>
            <th className="px-4 py-2 text-left">Invested</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(portfolio).map(([symbol, { quantity, cost }]) => {
            const avgPrice = quantity > 0 ? (cost / quantity).toFixed(2) : '—';
            return (
              <tr key={symbol}>
                <td className="border px-4 py-2">{symbol}</td>
                <td className="border px-4 py-2">{quantity}</td>
                <td className="border px-4 py-2">${avgPrice}</td>
                <td className="border px-4 py-2">${cost.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
