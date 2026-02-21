import React, { useState } from 'react';
import { View } from './types.ts';
import HealthAssistant from './components/HealthAssistant.tsx';
import SymptomChecker from './components/SymptomChecker.tsx';
import FacilityFinder from './components/FacilityFinder.tsx';
import MedicineHub from './components/MedicineHub.tsx';
import SchemeNavigator from './components/SchemeNavigator.tsx';
import EmergencySOS from './components/EmergencySOS.tsx';
import { 
  Home, 
  MessageSquare, 
  Activity, 
  MapPin, 
  Pill, 
  ShieldCheck, 
  PhoneCall, 
  Menu, 
  X, 
  Heart, 
  Bell, 
  UserCircle 
} from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Home);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setIsMenuOpen(false);
      }}
      className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-200 ${
        activeView === view 
          ? 'bg-emerald-600 text-white shadow-md' 
          : 'hover:bg-emerald-50 text-slate-600 active:scale-95'
      }`}
    >
      <div className={`p-2 rounded-xl ${activeView === view ? 'bg-white/20' : 'bg-slate-100'}`}>
        <Icon size={20} />
      </div>
      <span className="font-bold">{label}</span>
    </button>
  );

  const HomeView = () => (
    <div className="space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="bg-gradient-to-br from-emerald-600 to-teal-800 p-8 rounded-b-[3rem] shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Namaste! 🙏</h1>
            <p className="opacity-80 text-base font-medium">Your Health, Our Mission.</p>
          </div>
          <div className="flex gap-2">
             <button className="p-2 bg-white/20 rounded-full backdrop-blur-md active:scale-90 transition-transform">
               <Bell size={20} />
             </button>
             <button className="p-2 bg-white/20 rounded-full backdrop-blur-md active:scale-90 transition-transform">
               <UserCircle size={20} />
             </button>
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-2 gap-4 relative z-10">
          <button 
            onClick={() => setActiveView(View.Emergency)}
            className="bg-white/15 backdrop-blur-lg p-5 rounded-[2rem] border border-white/20 text-left hover:bg-white/20 transition-colors"
          >
            <div className="text-2xl font-black mb-1">108</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-70">Ambulance</div>
          </button>
          <button 
             onClick={() => setActiveView(View.Emergency)}
             className="bg-white/15 backdrop-blur-lg p-5 rounded-[2rem] border border-white/20 text-left hover:bg-white/20 transition-colors"
          >
            <div className="text-2xl font-black mb-1">104</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-70">Helpline</div>
          </button>
        </div>
      </header>

      <div className="px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800">Quick Services</h2>
          <button className="text-emerald-600 text-xs font-bold uppercase tracking-widest">See All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { v: View.Assistant, i: MessageSquare, l: "Ask Health AI", c: "bg-blue-50 text-blue-600" },
            { v: View.SymptomChecker, i: Activity, l: "Symptom Checker", c: "bg-rose-50 text-rose-600" },
            { v: View.FacilityFinder, i: MapPin, l: "Find Clinic", c: "bg-amber-50 text-amber-600" },
            { v: View.MedicineHub, i: Pill, l: "Medicine Info", c: "bg-purple-50 text-purple-600" },
            { v: View.Schemes, i: ShieldCheck, l: "Govt Schemes", c: "bg-emerald-50 text-emerald-600" },
            { v: View.Emergency, i: PhoneCall, l: "Emergency", c: "bg-red-50 text-red-600" }
          ].map((item) => (
            <button
              key={item.v}
              onClick={() => setActiveView(item.v)}
              className={`flex flex-col items-center justify-center p-6 rounded-[2.5rem] shadow-sm border border-white transition-all hover:shadow-md active:scale-95 ${item.c}`}
            >
              <div className="mb-3 p-3 rounded-2xl bg-white shadow-sm">
                <item.i size={28} />
              </div>
              <span className="text-xs font-black text-center leading-tight uppercase tracking-wide opacity-80">{item.l}</span>
            </button>
          ))}
        </div>
        
        <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 mt-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Heart size={80} className="text-emerald-600" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-100 rounded-2xl shadow-inner">
              <Heart className="text-emerald-600" size={24} />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800 leading-none">Health Tip</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Daily Wellness</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Keep your hands clean! Washing hands with soap for 20 seconds protects you from 80% of common rural infections like Diarrhea.
          </p>
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch (activeView) {
      case View.Home: return <HomeView />;
      case View.Assistant: return <HealthAssistant />;
      case View.SymptomChecker: return <SymptomChecker />;
      case View.FacilityFinder: return <FacilityFinder />;
      case View.MedicineHub: return <MedicineHub />;
      case View.Schemes: return <SchemeNavigator />;
      case View.Emergency: return <EmergencySOS />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative overflow-hidden flex flex-col shadow-2xl">
      {activeView !== View.Home && (
        <header className="bg-white/80 backdrop-blur-lg border-b border-slate-100 p-5 sticky top-0 z-30 flex items-center justify-between">
          <button 
            onClick={() => setActiveView(View.Home)} 
            className="p-2 -ml-2 text-slate-600 bg-slate-100 rounded-xl active:scale-90 transition-transform"
          >
            <X size={20} />
          </button>
          <h1 className="font-black text-slate-800 text-lg tracking-tight capitalize">
            {activeView.replace('-', ' ')}
          </h1>
          <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Heart size={18} fill="currentColor" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 pt-4 pb-8 flex justify-between items-end shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-40">
        <button 
          onClick={() => setActiveView(View.Home)} 
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeView === View.Home ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <div className={activeView === View.Home ? 'p-2 bg-emerald-50 rounded-2xl' : ''}>
            <Home size={22} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </button>

        <button 
          onClick={() => setActiveView(View.Assistant)} 
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeView === View.Assistant ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <div className={activeView === View.Assistant ? 'p-2 bg-emerald-50 rounded-2xl' : ''}>
            <MessageSquare size={22} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">AI Saathi</span>
        </button>

        <button 
          onClick={() => setActiveView(View.Emergency)} 
          className="relative -top-8 bg-red-600 text-white p-5 rounded-[2rem] shadow-2xl shadow-red-300 active:scale-90 transition-transform hover:bg-red-700"
        >
          <PhoneCall size={28} />
          <div className="absolute inset-0 rounded-[2rem] bg-red-600 animate-ping opacity-20 -z-10"></div>
        </button>

        <button 
          onClick={() => setActiveView(View.SymptomChecker)} 
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeView === View.SymptomChecker ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <div className={activeView === View.SymptomChecker ? 'p-2 bg-emerald-50 rounded-2xl' : ''}>
            <Activity size={22} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Checker</span>
        </button>

        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-emerald-600 transition-colors"
        >
          <div className="p-2">
            <Menu size={22} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">More</span>
        </button>
      </nav>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] transition-opacity duration-300" 
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute left-0 top-0 bottom-0 w-[85%] bg-white p-8 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300 rounded-r-[3rem]" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <Heart size={24} fill="white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-none">Swasthya</h2>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1">Saathi</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="p-2 bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-3">
              <NavItem view={View.Home} icon={Home} label="Dashboard" />
              <NavItem view={View.Assistant} icon={MessageSquare} label="AI Assistant" />
              <NavItem view={View.SymptomChecker} icon={Activity} label="Symptom Checker" />
              <NavItem view={View.FacilityFinder} icon={MapPin} label="Facility Finder" />
              <NavItem view={View.MedicineHub} icon={Pill} label="Medicine Hub" />
              <NavItem view={View.Schemes} icon={ShieldCheck} label="Govt Schemes" />
              <div className="h-px bg-slate-100 my-6"></div>
              <NavItem view={View.Emergency} icon={PhoneCall} label="Emergency SOS" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;