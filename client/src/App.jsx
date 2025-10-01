import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Trades from "./pages/Trades";
import History from "./pages/History";
import Level from "./pages/Level";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 text-xl font-bold">StockSim 🚀</div>
              <div className="hidden md:flex space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
                  }
                >
                  Portfolio
                </NavLink>
                <NavLink
                  to="/trade"
                  className={({ isActive }) =>
                    `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
                  }
                >
                  Trade
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
                  }
                >
                  History
                </NavLink>
                <NavLink
                  to="/level"
                  className={({ isActive }) =>
                    `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
                  }
                >
                  Level
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/trade" element={<Trades />} />
            <Route path="/history" element={<History />} />
            <Route path="/level" element={<Level />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
