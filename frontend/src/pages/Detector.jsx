import { useState } from 'react';
import { AlertCircle, Shield, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function Detector({ type }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const isUrl = type === 'url';

  const handleAnalyze = async () => {
    if (!input.trim()) {
      setError(`Please enter a ${isUrl ? 'URL' : 'message'} to analyze.`);
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content: input })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to connect to AI server');
      
      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyles = (level) => {
    switch (level) {
      case 'High': return { color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-900', icon: <AlertCircle className="w-8 h-8 text-red-500" /> };
      case 'Medium': return { color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-900', icon: <AlertTriangle className="w-8 h-8 text-yellow-500" /> };
      case 'Low': return { color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-900', icon: <ShieldCheck className="w-8 h-8 text-green-500" /> };
      default: return { color: 'text-slate-400', bg: 'bg-slate-800', border: 'border-slate-700', icon: <Info className="w-8 h-8 text-slate-500" /> };
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-navy-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          {isUrl ? 'Suspicious URL Checker' : 'AI Message Scam Detector'}
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          {isUrl 
            ? 'Paste a suspicious website link below to check for phishing patterns and risks.' 
            : 'Paste an SMS, WhatsApp message, or email to analyze it for fraudulent patterns.'}
        </p>

        {isUrl ? (
          <input
            type="text"
            className="w-full bg-navy-900 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-4"
            placeholder="https://example.com/suspicious-link"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          <textarea
            className="w-full bg-navy-900 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 min-h-[160px] mb-4"
            placeholder="e.g., Congratulations! You have won ₹50,000. Click here to claim your prize and enter your UPI PIN..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}

        {error && <div className="text-red-400 text-sm mb-4 p-3 bg-red-900/20 rounded-lg">{error}</div>}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          {loading ? (
            <span className="animate-pulse">Analyzing securely with AI...</span>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Analyze {isUrl ? 'URL' : 'Message'}
            </>
          )}
        </button>
      </div>

      {result && (
        <div className={`p-6 rounded-xl border ${getRiskStyles(result.risk_level).bg} ${getRiskStyles(result.risk_level).border} shadow-lg animate-fade-in`}>
          <div className="flex items-start gap-4 mb-6">
            {getRiskStyles(result.risk_level).icon}
            <div>
              <h3 className={`text-2xl font-bold uppercase tracking-wider ${getRiskStyles(result.risk_level).color}`}>
                {result.risk_level} RISK
              </h3>
              <p className="text-slate-300 font-medium">{result.category}</p>
            </div>
          </div>

          <p className="text-slate-200 mb-6 text-lg">{result.summary}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-red-300 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Suspicious Signs</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                {result.suspicious_signs.map((sign, i) => <li key={i}>{sign}</li>)}
              </ul>
            </div>

            <div className="bg-navy-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Safety Advice</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                {result.safety_advice.map((advice, i) => <li key={i}>{advice}</li>)}
              </ul>
            </div>
          </div>

          {/* Sensitive Request Flags */}
          <div className="mt-6 border-t border-slate-700/50 pt-4">
            <h4 className="text-sm font-semibold text-slate-400 mb-3">Information Requested in Content:</h4>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              {Object.entries(result.sensitive_request_flags).map(([key, value]) => (
                 <span key={key} className={`px-2 py-1 rounded-full ${value ? 'bg-red-900/50 text-red-300 border border-red-800' : 'bg-slate-800 text-slate-500'}`}>
                   {key.replace('_', ' ').toUpperCase()}: {value ? 'YES' : 'NO'}
                 </span>
              ))}
            </div>
          </div>
          
          <p className="mt-6 text-xs text-slate-500 italic flex items-start gap-1">
            <Info className="w-4 h-4 flex-shrink-0" /> {result.limitations}
          </p>
        </div>
      )}
    </div>
  );
}