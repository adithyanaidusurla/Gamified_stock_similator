export default function History() {
  const mockHistory = [
    {
      symbol: "AAPL",
      type: "buy",
      quantity: 10,
      reasoning: "Expected strong earnings report",
      date: "2025-10-27",
      feedback: "Good reasoning aligned with fundamental data.",
    },
    {
      symbol: "TSLA",
      type: "sell",
      quantity: 5,
      reasoning: "Overbought after a strong rally",
      date: "2025-10-25",
      feedback: "Solid technical reasoning — well spotted!",
    },
  ];

  return (
    <div className="mt-20 max-w-5xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Trade History 🕒
      </h1>

      <div className="space-y-4">
        {mockHistory.map((trade, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <h2 className="font-semibold text-gray-800">
                {trade.type.toUpperCase()} {trade.quantity}x{" "}
                <span className="text-blue-600">{trade.symbol}</span>
              </h2>
              <span className="text-sm text-gray-500">{trade.date}</span>
            </div>
            <p className="text-gray-600 mb-1">
              <strong>Reasoning:</strong> {trade.reasoning}
            </p>
            <p className="text-gray-500 text-sm">
              <strong>AI Feedback:</strong> {trade.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
