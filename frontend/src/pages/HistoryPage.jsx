import { useState, useEffect } from 'react';
import { History, Trash2 } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    fetch('http://localhost:3001/api/history')
      .then(res => res.json())
      .then(data => setHistory(data));
  };

  const deleteRecord = async (id) => {
    if(!window.confirm("Delete this record?")) return;
    await fetch(`http://localhost:3001/api/history/${id}`, { method: 'DELETE' });
    fetchHistory();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold flex items-center gap-2"><History /> Analysis History</h2>
         <p className="text-sm text-slate-400">Data stored locally for demonstration</p>
      </div>
      
      {history.length === 0 ? (
        <div className="text-center p-12 bg-navy-800 rounded-xl border border-slate-700">
           <p className="text-slate-400">No analysis history found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <div key={item.id} className="bg-navy-800 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                    item.risk_level === 'High' ? 'bg-red-900/50 text-red-400' :
                    item.risk_level === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-green-900/50 text-green-400'
                  }`}>{item.risk_level} RISK</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{item.input_type}</span>
                  <span className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString()}</span>
                </div>
                <p className="text-sm text-slate-300 italic mb-1">"{item.input_preview}"</p>
                <p className="text-sm font-medium text-slate-200">{item.category}</p>
              </div>
              <button onClick={() => deleteRecord(item.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}