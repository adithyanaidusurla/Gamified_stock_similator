export default function Home() {
  return (
    <div className="mt-20 max-w-5xl mx-auto text-center px-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to TradeSim 🚀
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Learn trading strategies, make predictions, and level up your investing skills — 
        one trade at a time.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">📈 Practice Trades</h3>
          <p className="text-gray-500 text-sm">Simulate real trades without any risk.</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">🧠 AI Feedback</h3>
          <p className="text-gray-500 text-sm">Get instant feedback on your trade reasoning.</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">🏅 Level Up</h3>
          <p className="text-gray-500 text-sm">Unlock new strategies as you improve.</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">💼 Track Portfolio</h3>
          <p className="text-gray-500 text-sm">Monitor your progress and learn from past moves.</p>
        </div>
      </div>
    </div>
  );
}
