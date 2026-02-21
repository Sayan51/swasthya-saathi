
import React, { useState, useEffect } from 'react';
import { Activity, ChevronRight, CheckCircle2, AlertCircle, RefreshCcw, Stethoscope } from 'lucide-react';

const SymptomChecker: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedArea, setSelectedArea] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState('');

  // Handle the transition from the "Analyzing" step to the "Results" step safely
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setStep(4);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const bodyAreas = ['Head/Face', 'Chest/Respiratory', 'Stomach/Digestive', 'Muscles/Joints', 'Other'];
  const symptomOptions: Record<string, string[]> = {
    'Head/Face': ['Headache', 'Fever', 'Dizziness', 'Sore Throat', 'Ear Pain'],
    'Chest/Respiratory': ['Cough', 'Shortness of Breath', 'Chest Tightness', 'Wheezing'],
    'Stomach/Digestive': ['Nausea', 'Stomach Pain', 'Diarrhea', 'Bloating'],
    'Muscles/Joints': ['Body Ache', 'Joint Pain', 'Back Pain', 'Stiffness'],
    'Other': ['Fatigue', 'Skin Rash', 'Loss of Appetite']
  };

  const toggleSymptom = (s: string) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s]);
  };

  const reset = () => {
    setStep(0);
    setSelectedArea('');
    setSymptoms([]);
    setDuration('');
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen pb-32">
      {step < 4 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Progress</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step {step + 1} of 4</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner p-0.5">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out shadow-sm" 
              style={{ width: `${(step + 1) * 25}%` }}
            />
          </div>
        </div>
      )}

      {step === 0 && (
        <div className="animate-in slide-in-from-right duration-500 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800 leading-tight">Where is the discomfort?</h2>
            <p className="text-slate-500 font-medium">Please select the primary area that feels unwell.</p>
          </div>
          <div className="grid gap-4">
            {bodyAreas.map(area => (
              <button
                key={area}
                onClick={() => { setSelectedArea(area); setStep(1); }}
                className="group flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md active:scale-95 transition-all text-slate-700 font-bold"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Stethoscope size={20} />
                  </div>
                  {area}
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-in slide-in-from-right duration-500 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800 leading-tight">Describe symptoms</h2>
            <p className="text-slate-500 font-medium">Select all that apply for <span className="text-emerald-600 font-bold">{selectedArea}</span>.</p>
          </div>
          <div className="grid gap-3 mb-4">
            {symptomOptions[selectedArea]?.map(s => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                  symptoms.includes(s) 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' 
                    : 'bg-white border-slate-100 text-slate-700 hover:border-emerald-100 shadow-sm'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${symptoms.includes(s) ? 'bg-white border-white text-emerald-600' : 'border-slate-200'}`}>
                  {/* Fixed: Removed invalid 'weight' prop and used 'strokeWidth' for Lucide icon */}
                  {symptoms.includes(s) && <CheckCircle2 size={16} strokeWidth={3} />}
                </div>
                <span className="font-bold">{s}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={symptoms.length === 0}
            className="w-full bg-emerald-600 text-white p-5 rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-200 disabled:bg-slate-300 disabled:shadow-none active:scale-95 transition-all"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in slide-in-from-right duration-500 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800 leading-tight">How long?</h2>
            <p className="text-slate-500 font-medium">When did these symptoms start appearing?</p>
          </div>
          <div className="grid gap-3 mb-4">
            {['Less than 24 hours', '1-2 days', '3-5 days', 'More than a week'].map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                  duration === d 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' 
                    : 'bg-white border-slate-100 text-slate-700 hover:border-emerald-100 shadow-sm'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${duration === d ? 'bg-white border-white text-emerald-600' : 'border-slate-200'}`}>
                  {duration === d && <div className="w-3 h-3 bg-emerald-600 rounded-full" />}
                </div>
                <span className="font-bold">{d}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={!duration}
            className="w-full bg-emerald-600 text-white p-5 rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-200 disabled:bg-slate-300 disabled:shadow-none active:scale-95 transition-all"
          >
            Get Assessment
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center justify-center py-24 space-y-6 animate-pulse">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center relative">
            <Activity size={48} className="text-emerald-600" />
            <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-slate-800">Analyzing Symptoms</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Matching with Health DB</p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-in zoom-in duration-500 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
            
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={40} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-800">Health Alert</h2>
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-50 text-amber-700 text-xs font-black rounded-full border border-amber-200 uppercase tracking-widest">
                Severity: Moderate
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              Based on your report of <span className="font-bold text-slate-800">{symptoms.join(', ')}</span> for <span className="font-bold text-slate-800">{duration}</span>, medical attention is advised.
            </p>
          </div>

          <div className="bg-emerald-600 p-8 rounded-[2.5rem] shadow-xl shadow-emerald-100 text-white relative group overflow-hidden">
             <div className="absolute top-0 left-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <Stethoscope size={60} />
             </div>
             <h3 className="font-black text-xl mb-4 relative z-10">Care Path</h3>
             <ul className="space-y-4 text-emerald-50 font-medium relative z-10">
               <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                 <span>Visit <span className="font-black">PHC Rampur</span> (2.3 km away) today for a professional checkup.</span>
               </li>
               <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                 <span>Rest and keep your body hydrated with clean water.</span>
               </li>
               <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                 <span>Carry your Aadhar card for potential scheme benefits.</span>
               </li>
             </ul>
          </div>

          <button 
            onClick={reset}
            className="w-full bg-slate-100 text-slate-600 p-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-200 transition-colors"
          >
            <RefreshCcw size={20} />
            Start New Check
          </button>
          
          <div className="p-6 bg-white border border-slate-100 rounded-[2rem] text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              This tool is for awareness. It is NOT a professional medical diagnosis. Always consult a real doctor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
