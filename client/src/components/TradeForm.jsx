import { useState } from 'react';

export default function TradeForm({ onSubmit }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("buy");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol || !quantity) return;
    onSubmit({ symbol, quantity, type, price });
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <input
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Price (optional)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
      >
        Submit Trade
      </button>
    </form>
  );
}

