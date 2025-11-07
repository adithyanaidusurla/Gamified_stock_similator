export default function Portfolio() {
  const mockPortfolio = [
    { symbol: "AAPL", quantity: 10, avgPrice: 172.3, currentPrice: 175.2 },
    { symbol: "TSLA", quantity: 5, avgPrice: 240.5, currentPrice: 245.8 },
  ];

  return (
    <div className="mt-20 max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        My Portfolio 💼
      </h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3">Symbol</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Avg. Price ($)</th>
              <th className="p-3">Current Price ($)</th>
              <th className="p-3">P/L ($)</th>
            </tr>
          </thead>
          <tbody>
            {mockPortfolio.map((stock, idx) => {
              const profit =
                (stock.currentPrice - stock.avgPrice) * stock.quantity;
              const profitColor =
                profit >= 0 ? "text-green-600" : "text-red-500";
              return (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800">
                    {stock.symbol}
                  </td>
                  <td className="p-3">{stock.quantity}</td>
                  <td className="p-3">${stock.avgPrice.toFixed(2)}</td>
                  <td className="p-3">${stock.currentPrice.toFixed(2)}</td>
                  <td className={`p-3 font-semibold ${profitColor}`}>
                    {profit.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}