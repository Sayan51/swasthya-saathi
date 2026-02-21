
import React, { useState } from 'react';
import { MOCK_SCHEMES } from '../constants.tsx';
import { ShieldCheck, ArrowRight, CheckCircle2, Search, FileText } from 'lucide-react';

const SchemeNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'check'>('browse');

  return (
    <div className="p-6 space-y-6">
      <div className="flex p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('browse')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'browse' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          Browse Schemes
        </button>
        <button
          onClick={() => setActiveTab('check')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'check' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          Eligibility Check
        </button>
      </div>

      {activeTab === 'browse' ? (
        <div className="space-y-4">
          {MOCK_SCHEMES.map(s => (
            <div key={s.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">{s.name}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6 text-center py-10">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Check Eligibility</h2>
          <p className="text-slate-500 max-w-xs mx-auto">Find which government health schemes you qualify for in seconds.</p>
        </div>
      )}
    </div>
  );
};

export default SchemeNavigator;
