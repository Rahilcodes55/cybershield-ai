import { useState, useEffect } from 'react';
import { BarChart2, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, low: 0, medium: 0, high: 0 });

  useEffect(() => {
    fetch('http://localhost:3001/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BarChart2 /> System Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-navy-800 p-6 rounded-xl border border-slate-700 text-center">
          <p className="text-slate-400 text-sm font-medium mb-1">Total Scans</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-green-900/20 p-6 rounded-xl border border-green-900/50 text-center">
          <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-green-400/80 text-sm font-medium mb-1">Low Risk</p>
          <p className="text-3xl font-bold text-green-400">{stats.low}</p>
        </div>
        <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-900/50 text-center">
          <AlertTriangle className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-yellow-400/80 text-sm font-medium mb-1">Medium Risk</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.medium}</p>
        </div>
        <div className="bg-red-900/20 p-6 rounded-xl border border-red-900/50 text-center">
          <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <p className="text-red-400/80 text-sm font-medium mb-1">High Risk</p>
          <p className="text-3xl font-bold text-red-400">{stats.high}</p>
        </div>
      </div>
    </div>
  );
}