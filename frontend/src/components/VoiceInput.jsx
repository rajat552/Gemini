import React from 'react';
import { Mic, MicOff, Waves } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput';

const VoiceInput = ({ onResult }) => {
    const { isListening, toggleListening, isSupported, error } = useVoiceInput(onResult);

    if (!isSupported && !error) return null;

    return (
        <div className="relative group">
            <button
                onClick={toggleListening}
                className={`p-3 rounded-xl transition-all relative z-10 ${isListening
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                        : 'text-gray-400 hover:text-primary hover:bg-white/5'
                    }`}
                title={isListening ? 'Stop Listening' : 'Voice Input'}
            >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {isListening && (
                <div className="absolute -inset-1 bg-red-500/30 rounded-xl animate-ping" />
            )}

            {isListening && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                    <Waves size={14} className="text-red-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-red-500">Listening...</span>
                </div>
            )}

            {error && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-12 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl z-50">
                    {error}
                    <div className="absolute w-2 h-2 bg-red-500 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
            )}
        </div>
    );
};

export default VoiceInput;
