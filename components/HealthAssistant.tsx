
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types.ts';
import { streamHealthAdvice } from '../services/ai.ts';
import { Send, Mic, User, Bot, Loader2, Sparkles } from 'lucide-react';

const HealthAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Namaste! I am Swasthya Saathi. 🙏\n\nI can help you with health tips, understanding symptoms, or finding generic medicine alternatives. \n\n**How can I help you today?**",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMessage: Message = { role: 'user', text: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botMessage: Message = { 
      role: 'model', 
      text: '', 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, botMessage]);

    let accumulatedText = "";
    await streamHealthAdvice(userText, (chunk) => {
      setIsLoading(false);
      accumulatedText += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'model') {
          return [...prev.slice(0, -1), { ...last, text: accumulatedText }];
        }
        return prev;
      });
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-slate-50 relative">
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <Sparkles size={300} className="text-emerald-500" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar z-10" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600 border border-emerald-100'
              }`}>
                {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none prose prose-slate max-w-none'
              }`}>
                <div className="whitespace-pre-wrap">
                  {m.text || (isLoading && i === messages.length - 1 ? "..." : "")}
                </div>
                <div className={`text-[10px] mt-2 opacity-50 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-2 items-center bg-white border border-slate-100 px-4 py-3 rounded-3xl rounded-tl-none shadow-sm text-slate-400">
              <Loader2 className="animate-spin text-emerald-500" size={16} />
              <span className="text-xs font-medium">Reading medical notes...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 pb-16 z-20">
        <div className="flex gap-2 items-center bg-slate-100/80 p-2 rounded-2xl border border-white shadow-inner">
          <button className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors active:scale-90">
            <Mic size={24} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type in Hindi or English..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 py-2 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl transition-all ${
              !input.trim() || isLoading 
                ? 'text-slate-300' 
                : 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 active:scale-95 hover:bg-emerald-700'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-slate-400">
          Swasthya Saathi can provide health info but is not a doctor. In emergencies, call 108.
        </p>
      </div>
    </div>
  );
};

export default HealthAssistant;
