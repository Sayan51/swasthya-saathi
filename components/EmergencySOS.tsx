
import React, { useState } from 'react';
import { PhoneCall, MapPin, HeartPulse, ShieldAlert, ChevronRight } from 'lucide-react';

const EmergencySOS: React.FC = () => {
  const [isCalling, setIsCalling] = useState(false);

  const handleCall = (num: string) => {
    setIsCalling(true);
    setTimeout(() => {
      window.location.href = `tel:${num}`;
      setIsCalling(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="bg-red-600 rounded-[2.5rem] p-8 text-white text-center shadow-2xl shadow-red-100 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <h2 className="text-2xl font-bold">In an Emergency?</h2>
        <p className="opacity-90 text-sm">Pressing these buttons will dial emergency services directly from your phone.</p>
        
        <div className="space-y-3 pt-4">
          <button 
            onClick={() => handleCall('108')}
            className="w-full bg-white text-red-600 py-4 rounded-2xl font-extrabold text-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            <PhoneCall size={24} /> Call 108 Ambulance
          </button>
          <button 
            onClick={() => handleCall('104')}
            className="w-full bg-red-700/50 text-white py-4 rounded-2xl font-extrabold text-xl flex items-center justify-center gap-3 border border-red-500/30 active:scale-95 transition-transform"
          >
            <PhoneCall size={24} /> 104 Health Helpline
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-lg px-2">Essential First Aid</h3>
        
        {[
          { icon: HeartPulse, title: "Heart Attack", desc: "Keep the person sitting and calm. Call 108 immediately." },
          { icon: ShieldAlert, title: "Heat Stroke", desc: "Move to a cool area, loosen clothes, and apply cool water." },
          { icon: MapPin, title: "Share Location", desc: "Tell the operator your village name and nearest landmark." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 active:bg-slate-50">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
              <item.icon size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">{item.title}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
        ))}
      </div>

      {isCalling && (
        <div className="fixed inset-0 bg-red-600 flex flex-col items-center justify-center z-[100] text-white animate-in fade-in duration-300">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-ping mb-8">
            <PhoneCall size={48} />
          </div>
          <h2 className="text-3xl font-bold">Calling 108...</h2>
          <p className="mt-4 opacity-80">Please stay on the line.</p>
        </div>
      )}
    </div>
  );
};

export default EmergencySOS;
