'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { ChatSession } from '@/lib/hooks/useChatHistory';
import { Plus, MessageSquare, Trash2, X, Menu } from 'lucide-react';
import { useState } from 'react';

interface ChatSidebarProps {
    sessions: ChatSession[];
    currentSessionId: string | undefined;
    onSelectSession: (id: string) => void;
    onNewChat: () => void;
    onDeleteSession: (id: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function ChatSidebar({
    sessions,
    currentSessionId,
    onSelectSession,
    onNewChat,
    onDeleteSession,
    isOpen,
    onClose
}: ChatSidebarProps) {
    const { t, language } = useLanguage();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-50
                w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
                transform transition-transform duration-200 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col shadow-lg
            `}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                        {language === 'en' ? 'History' : 'इतिहास'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <button
                        onClick={() => {
                            onNewChat();
                            onClose();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                    >
                        <Plus size={20} />
                        <span>{language === 'en' ? 'New Chat' : 'नई चैट'}</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
                    {sessions.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-10 px-4">
                            <p className="text-sm">
                                {language === 'en' ? 'No saved chats yet' : 'कोई पुरानी चैट नहीं मिली'}
                            </p>
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session.id}
                                className={`
                                    group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                                    ${currentSessionId === session.id
                                        ? 'bg-gray-100 dark:bg-gray-800'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                                `}
                                onClick={() => {
                                    onSelectSession(session.id);
                                    onClose();
                                }}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <MessageSquare size={18} className="text-gray-500 shrink-0" />
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {session.title || (language === 'en' ? 'Untitled Chat' : 'बिना नाम की चैट')}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {session.date.toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteSession(session.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
