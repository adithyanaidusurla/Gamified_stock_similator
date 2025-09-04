// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import './index.css'; // Ensure Tailwind is applied

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
      portfolio[symbol].cost += cost;
      portfolio[symbol].quantity += qty;
    } else if (type === 'sell') {
      if (portfolio[symbol].quantity >= qty) {
        const avgPrice = portfolio[symbol].cost / portfolio[symbol].quantity;
        portfolio[symbol].quantity -= qty;
        portfolio[symbol].cost -= avgPrice * qty;
      }
    }
  }

  return portfolio;
}

function Portfolio({ trades }) {
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

function TradeForm({ onTrade }) {
  const [form, setForm] = useState({ symbol: '', quantity: '', price: '', type: 'buy' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.symbol || form.quantity <= 0 || form.price <= 0) return;

    onTrade({ ...form, quantity: Number(form.quantity), price: Number(form.price) });
    setForm({ symbol: '', quantity: '', price: '', type: 'buy' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex gap-4 items-center flex-wrap">
        <input
          className="border p-2 rounded w-24"
          placeholder="Symbol"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
        />
        <input
          className="border p-2 rounded w-24"
          type="number"
          placeholder="Qty"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <input
          className="border p-2 rounded w-24"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Trade
        </button>
      </div>
    </form>
  );
}

export default function App() {
  const [trades, setTrades] = useState([]);

  const handleTrade = (newTrade) => {
    setTrades((prev) => [...prev, newTrade]);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Stock Trading Simulator 🚀</h1>
      <TradeForm onTrade={handleTrade} />
      <Portfolio trades={trades} />
    </div>
  );
}
