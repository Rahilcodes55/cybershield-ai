import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, MessageSquare, Link as LinkIcon, History, BarChart2, Info } from 'lucide-react';
import Home from './pages/Home';
import Detector from './pages/Detector';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-navy-800 border-b border-slate-700 p-4 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-blue-400 font-bold text-xl">
              <Shield className="w-6 h-6" />
              CyberShield AI
            </Link>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/message" className="hover:text-blue-400 transition-colors flex items-center gap-1"><MessageSquare className="w-4 h-4"/> Message</Link>
              <Link to="/url" className="hover:text-blue-400 transition-colors flex items-center gap-1"><LinkIcon className="w-4 h-4"/> URL</Link>
              <Link to="/dashboard" className="hover:text-blue-400 transition-colors flex items-center gap-1"><BarChart2 className="w-4 h-4"/> Dashboard</Link>
              <Link to="/history" className="hover:text-blue-400 transition-colors flex items-center gap-1"><History className="w-4 h-4"/> History</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Detector type="message" />} />
            <Route path="/url" element={<Detector type="url" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-navy-800 border-t border-slate-700 p-6 text-center text-sm text-slate-400 mt-auto">
          <p>CyberShield AI - BSc Computer Science Project</p>
          <p className="mt-2 text-xs text-slate-500">
            Disclaimer: AI results are advisory and may be inaccurate. Never share personal information, OTPs, or financial details based on web analysis alone.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;