
import React, { useState } from 'react';
import { MOCK_MEDICINES } from '../constants.tsx';
import { Pill, Search, Info, TrendingDown, ExternalLink } from 'lucide-react';

const MedicineHub: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = MOCK_MEDICINES.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.genericName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search medicine or illness..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <TrendingDown size={24} />
          </div>
          <h3 className="font-bold text-lg">Save with Generics</h3>
        </div>
        <p className="text-emerald-50 text-sm opacity-90 leading-relaxed">
          Generic medicines have the same active ingredients but cost up to 80% less. Ask your doctor for generic prescriptions.
        </p>
      </div>

      <div className="space-y-4">
        {filtered.map(m => (
          <div key={m.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {m.category}
                  </span>
                  <h4 className="font-bold text-lg text-slate-800">{m.name}</h4>
                  <p className="text-slate-500 text-sm italic">Generic: {m.genericName}</p>
                </div>
                <Pill className="text-slate-200" size={32} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Branded Price</div>
                  <div className="text-lg font-bold text-slate-700">₹{m.brandPrice.toFixed(2)}</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                  <div className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Generic Price</div>
                  <div className="text-lg font-bold text-emerald-700">₹{m.genericPrice.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineHub;
