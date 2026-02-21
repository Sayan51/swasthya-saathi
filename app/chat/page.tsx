'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2, Home, Menu } from 'lucide-react';
import Link from 'next/link';
import ChatSidebar from './ChatSidebar';
import { useChatHistory } from '@/lib/hooks/useChatHistory';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function ChatPage() {
    const { t, language } = useLanguage();
    // History Hook
    const { history, saveChat, deleteChat, isLoaded } = useChatHistory();

    // State
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState<string | undefined>(undefined);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, [language]); // Re-run when language changes

    // Initial Welcome Message
    useEffect(() => {
        // Only set welcome message if starting a fresh session and no history loaded yet
        if (messages.length === 0 && !currentSessionId) {
            setMessages([{
                role: 'assistant',
                content: t('chatWelcome') + '\n\n' + t('chatSubtitle'),
                timestamp: new Date(),
            }]);
        }
    }, [t, currentSessionId]);

    // Auto-save effect
    useEffect(() => {
        if (messages.length > 1 && isLoaded) { // > 1 to ignore initial welcome message only
            // Don't save if it's just the default welcome message
            const isJustWelcome = messages.length === 1 && messages[0].role === 'assistant';
            if (!isJustWelcome) {
                const id = saveChat(messages, currentSessionId);
                if (id && id !== currentSessionId) {
                    setCurrentSessionId(id);
                }
            }
        }
    }, [messages, isLoaded, saveChat, currentSessionId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleVoice = () => {
        if (!recognitionRef.current) {
            alert(language === 'en' ? 'Voice input is not supported in your browser. Please use Chrome or Edge.' : 'आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, language, conversationHistory: messages }),
            });

            const data = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: language === 'en' ? 'Sorry, I encountered an error. Please try again.' : 'क्षमा करें, एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSelectSession = (id: string) => {
        const session = history.find(s => s.id === id);
        if (session) {
            setMessages(session.messages);
            setCurrentSessionId(session.id);
        }
    };

    const handleNewChat = () => {
        setMessages([{
            role: 'assistant',
            content: t('chatWelcome') + '\n\n' + t('chatSubtitle'),
            timestamp: new Date(),
        }]);
        setCurrentSessionId(undefined);
    };

    const suggestions = [t('chatSuggestion1'), t('chatSuggestion2'), t('chatSuggestion3')];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-black overflow-hidden">
            <ChatSidebar
                sessions={history}
                currentSessionId={currentSessionId}
                onSelectSession={handleSelectSession}
                onNewChat={handleNewChat}
                onDeleteSession={deleteChat}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                <header className="page-header shrink-0">
                    <div className="page-header-content">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                            >
                                <Menu size={24} />
                            </button>
                            <Link href="/" className="back-btn">
                                <Home style={{ width: 24, height: 24 }} />
                            </Link>
                        </div>
                        <div className="page-title-section">
                            <h1 className="page-title">{t('chat')}</h1>
                            <p className="page-subtitle">{language === 'en' ? 'AI-Powered Health Guidance' : 'AI-संचालित स्वास्थ्य मार्गदर्शन'}</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                    <div className="max-w-3xl mx-auto space-y-6 pb-4">
                        {messages.map((message, idx) => (
                            <div key={idx} className={`message message-${message.role}`}>
                                <div className="message-bubble">
                                    <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{message.content}</p>
                                    <p className="message-time">
                                        {message.timestamp.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message message-assistant">
                                <div className="message-bubble">
                                    <Loader2 style={{ width: 24, height: 24, animation: 'spin 1s linear infinite' }} />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length <= 1 && (
                        <div className="suggestions max-w-3xl mx-auto mt-8">
                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.75rem' }}>
                                {language === 'en' ? 'Try asking:' : 'पूछने की कोशिश करें:'}
                            </p>
                            <div className="suggestion-chips">
                                {suggestions.map((suggestion, idx) => (
                                    <button key={idx} onClick={() => setInput(suggestion)} className="suggestion-chip">
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 shrink-0">
                    <div className="max-w-3xl mx-auto flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={t('chatPlaceholder')}
                            className="chat-input flex-1"
                            disabled={isLoading}
                        />

                        <button onClick={toggleVoice} className={`icon-btn icon-btn-ghost ${isListening ? 'active' : ''}`} disabled={isLoading}>
                            {isListening ? <MicOff style={{ width: 20, height: 20 }} /> : <Mic style={{ width: 20, height: 20 }} />}
                        </button>

                        <button onClick={handleSend} className="icon-btn icon-btn-primary" disabled={!input.trim() || isLoading}>
                            {isLoading ? <Loader2 style={{ width: 20, height: 20 }} /> : <Send style={{ width: 20, height: 20 }} />}
                        </button>

                        {isListening && (
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-sm shadow-lg animate-pulse">
                                {t('chatVoicePrompt')}...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
