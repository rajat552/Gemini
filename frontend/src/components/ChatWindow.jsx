import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import VoiceInput from './VoiceInput';
import { useChat } from '../hooks/useChat';

const ChatWindow = ({ onWorkflowStart, onWorkflowComplete }) => {
    const { messages, loading, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        if (onWorkflowStart) onWorkflowStart();
        const result = await sendMessage(input);

        if (result && onWorkflowComplete) {
            onWorkflowComplete(result);
        }
        setInput('');
    };

    const handleVoiceSend = async (transcript) => {
        if (!transcript.trim()) return;
        
        if (onWorkflowStart) onWorkflowStart();
        const result = await sendMessage(transcript);

        if (result && onWorkflowComplete) {
            onWorkflowComplete(result);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] glass-card overflow-hidden transition-all duration-300">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-8 scroll-smooth space-y-2">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} {...msg} />
                ))}
                {loading && (
                    <div className="flex justify-start mb-6">
                        <div className="flex items-center gap-4 p-5 bg-card-bg border border-border-subtle rounded-3xl shadow-xl border-l-primary border-l-4">
                            <Loader2 className="animate-spin text-primary" size={24} />
                            <div className="flex flex-col">
                                <span className="text-sm text-text-main font-black uppercase tracking-widest">Gemini is reasoning...</span>
                                <span className="text-[10px] text-text-muted italic">Identifying intent & calculating multimodal execution plan.</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-6 bg-app-bg/80 backdrop-blur-md border-t border-border-subtle transition-colors duration-300">
                <div className="flex items-center gap-4 bg-card-bg border border-border-subtle rounded-[2rem] p-3 focus-within:border-primary/50 transition-all shadow-xl shadow-black/5 hover:shadow-black/10">
                    <div className="px-2">
                        <VoiceInput onResult={handleVoiceSend} />
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Summarize this and create tasks..."
                        className="flex-1 bg-transparent border-none focus:outline-none px-2 text-text-main text-base font-medium resize-none py-3 max-h-40 min-h-[44px] placeholder:text-text-muted/40"
                        rows={1}
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                    >
                        <Send size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
