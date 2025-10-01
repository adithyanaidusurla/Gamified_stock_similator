export default function Level() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Level 1: Trend Following 📈</h1>
      <p className="text-gray-700 text-lg sm:text-xl max-w-2xl text-center mb-6">
        Learn how to identify trends in stock prices. The goal is to buy in an uptrend and sell in a downtrend.
      </p>
      <div className="bg-white shadow-md rounded p-6 w-full max-w-xl text-center">
        <p className="mb-4">Example: Stock XYZ has been rising for 5 days. You decide to buy 10 shares.</p>
        <p className="font-semibold text-gray-800">Now go to the Trade page and make your prediction!</p>
      </div>
    </div>
  );
}
