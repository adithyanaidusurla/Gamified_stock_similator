import { useState } from "react";

export default function TradeForm({ onSubmit }) {
  const [form, setForm] = useState({
    symbol: "",
    type: "buy",
    quantity: "",
    reasoning: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.symbol || !form.quantity || !form.reasoning) return;
    onSubmit(form);
    setForm({ symbol: "", type: "buy", quantity: "", reasoning: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="symbol"
          placeholder="Stock Symbol (e.g. AAPL)"
          value={form.symbol}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <textarea
        name="reasoning"
        placeholder="Enter your reasoning..."
        value={form.reasoning}
        onChange={handleChange}
        rows={3}
        className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg w-full sm:w-auto transition"
      >
        Submit Trade
      </button>
    </form>
  );
}
