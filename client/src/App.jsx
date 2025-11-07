import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Trades from "./pages/Trades";
import History from "./pages/History";
import Level from "./pages/Level";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1 p-6 md:p-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/trade" element={<Trades />} />
            <Route path="/history" element={<History />} />
            <Route path="/level" element={<Level />} />
          </Routes>
        </main>
        <footer className="text-center py-4 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} Stock Trading Simulator
        </footer>
      </div>
    </Router>
  );
}

export default App;
