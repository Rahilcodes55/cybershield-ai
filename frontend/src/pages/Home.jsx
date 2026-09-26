import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 py-12">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Stay Safe. <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Detect Scams with AI.
          </span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Analyze suspicious messages, emails, and URLs instantly. Powered by advanced AI to help you identify fraud, phishing links, and social engineering attacks.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
        <Link to="/message" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/20">
          Analyze Message
        </Link>
        <Link to="/url" className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-slate-600">
          Check URL
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full mt-12 text-left">
        <div className="bg-navy-800 p-6 rounded-xl border border-slate-700">
          <AlertTriangle className="text-yellow-500 mb-4 w-8 h-8" />
          <h3 className="font-bold text-lg mb-2">Identify Threats</h3>
          <p className="text-sm text-slate-400">Spot fake job offers, urgent payment requests, and lottery scams before they cause harm.</p>
        </div>
        <div className="bg-navy-800 p-6 rounded-xl border border-slate-700">
          <ShieldAlert className="text-purple-500 mb-4 w-8 h-8" />
          <h3 className="font-bold text-lg mb-2">Safe Link Checking</h3>
          <p className="text-sm text-slate-400">Verify URLs for deceptive patterns, typosquatting, and unsecured connections.</p>
        </div>
        <div className="bg-navy-800 p-6 rounded-xl border border-slate-700">
          <CheckCircle className="text-green-500 mb-4 w-8 h-8" />
          <h3 className="font-bold text-lg mb-2">Clear Explanations</h3>
          <p className="text-sm text-slate-400">Understand exactly why a message is risky with simple, plain-English AI breakdowns.</p>
        </div>
      </div>
    </div>
  );
}