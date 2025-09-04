import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Stock Trader</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/portfolio" className="text-gray-700 hover:text-blue-600">Portfolio</Link>
        <Link to="/trades" className="text-gray-700 hover:text-blue-600">Trades</Link>
      </div>
    </nav>
  );
}