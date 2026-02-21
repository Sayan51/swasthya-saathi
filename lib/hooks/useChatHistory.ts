'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ChatSession {
    id: string;
    title: string;
    date: Date;
    messages: Message[];
}

const STORAGE_KEY = 'swasthya_chat_history';

export function useChatHistory() {
    const [history, setHistory] = useState<ChatSession[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load history from local storage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    // Convert string dates back to Date objects
                    const hydrated = parsed.map((session: any) => ({
                        ...session,
                        date: new Date(session.date),
                        messages: session.messages.map((msg: any) => ({
                            ...msg,
                            timestamp: new Date(msg.timestamp)
                        }))
                    }));
                    setHistory(hydrated);
                } catch (e) {
                    console.error('Failed to parse chat history', e);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    // Save history to local storage whenever it changes
    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        }
    }, [history, isLoaded]);

    const saveChat = useCallback((messages: Message[], currentSessionId?: string): string => {
        if (messages.length === 0) return currentSessionId || '';

        const title = messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '');
        const now = new Date();
        let sessionId = currentSessionId;

        if (sessionId) {
            // Update existing session
            setHistory(prev => prev.map(session =>
                session.id === sessionId
                    ? { ...session, messages, date: now } // Update date on new message
                    : session
            ));
        } else {
            // Create new session
            sessionId = Date.now().toString();
            const newSession: ChatSession = {
                id: sessionId,
                title,
                date: now,
                messages
            };
            setHistory(prev => [newSession, ...prev]);
        }

        return sessionId!;
    }, [isLoaded]);

    const deleteChat = useCallback((id: string) => {
        setHistory(prev => prev.filter(session => session.id !== id));
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    return {
        history,
        saveChat,
        deleteChat,
        clearHistory,
        isLoaded
    };
}
