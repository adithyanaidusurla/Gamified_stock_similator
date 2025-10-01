import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-4 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-blue-600">Stock Simulator</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/portfolio" className="hover:text-blue-500">Portfolio</Link>
        <Link to="/trade" className="hover:text-blue-500">Trade</Link>
      </div>
    </nav>
  );
}
