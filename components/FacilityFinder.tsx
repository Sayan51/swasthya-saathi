
import React, { useState, useEffect } from 'react';
import { MOCK_FACILITIES } from '../constants.tsx';
import { MapPin, Phone, Navigation, Clock, Search } from 'lucide-react';

const FacilityFinder: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {}, 
        (err) => setLocationError('Please enable location for distance accuracy.')
      );
    }
  }, []);

  const filteredFacilities = MOCK_FACILITIES.filter(f => 
    (filter === 'All' || f.type === filter) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search hospital, PHC, pharmacy..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'PHC', 'CHC', 'Hospital', 'Pharmacy'].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-semibold text-sm transition-all ${
              filter === t ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-slate-100 text-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {locationError && (
        <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-xs text-amber-700 flex gap-2">
          <MapPin size={16} />
          {locationError}
        </div>
      )}

      <div className="space-y-4">
        {filteredFacilities.map(f => (
          <div key={f.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  f.type === 'Pharmacy' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  {f.type}
                </span>
                <h3 className="font-bold text-lg text-slate-800 leading-tight">{f.name}</h3>
                <p className="text-slate-500 text-xs flex items-center gap-1">
                  <MapPin size={12} /> {f.address}
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600">{f.distance}</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 justify-end">
                  <Clock size={10} /> {f.status}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-50 text-slate-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-slate-100">
                <Phone size={16} /> Call
              </button>
              <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                <Navigation size={16} /> Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityFinder;
