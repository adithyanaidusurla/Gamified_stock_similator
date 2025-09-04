import { useState } from 'react';

export default function TradeForm({ onSubmit }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState('buy');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol || quantity <= 0) return;
    onSubmit({ symbol: symbol.toUpperCase(), quantity, type });
    setSymbol('');
    setQuantity(0);
    setType('buy');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-md mx-auto mt-6">
      <div>
        <label className="block font-medium mb-1">Stock Symbol</label>
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g. AAPL"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Quantity</label>
        <input
          className="w-full border px-3 py-2 rounded"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Type</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Trade
      </button>
    </form>
  );
}
