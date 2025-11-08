import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all app data?")) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <nav className="bg-blue-600 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold">
          StockSim 📈
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/portfolio" className="hover:text-gray-200">
            Portfolio
          </Link>
          <Link to="/trade" className="hover:text-gray-200">
            Trade
          </Link>
          <Link to="/history" className="hover:text-gray-200">
            History
          </Link>
          <Link to="/level" className="hover:text-gray-200">
            Levels
          </Link>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
          >
            Reset App Data
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-700">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/portfolio"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            to="/trade"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setOpen(false)}
          >
            Trade
          </Link>
          <Link
            to="/history"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setOpen(false)}
          >
            History
          </Link>
          <Link
            to="/level"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setOpen(false)}
          >
            Levels
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              handleReset();
            }}
            className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600"
          >
            Reset App Data
          </button>
        </div>
      )}
    </nav>
  );
}
