import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, AlertCircle, Bot } from 'lucide-react';

const ActivityFeed = ({ logs = [], isRunning }) => {
    return (
        <div className="flex flex-col h-full glass-card p-6 overflow-hidden transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shadow-sm">
                    <Bot size={22} strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-xl font-black tracking-tight text-text-main">Activity</h2>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest -mt-1">Gemini Act Live</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scroll-smooth">
                <AnimatePresence initial={false}>
                    {logs.map((log, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            className="flex items-start gap-4 p-4 bg-white/[0.03] border border-border-subtle rounded-2xl"
                        >
                            <div className="mt-0.5">
                                {log.status === 'success' ? (
                                    <CheckCircle size={14} className="text-green-500" />
                                ) : log.status === 'error' ? (
                                    <AlertCircle size={14} className="text-red-500" />
                                ) : (
                                    <Loader2 size={14} className="text-secondary animate-spin" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-text-main font-semibold leading-relaxed">
                                    {log.message}
                                </p>
                                <p className="text-[9px] text-text-muted mt-1 font-mono">
                                    {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : ''}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {isRunning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center py-4 gap-3 opacity-30"
                        >
                            <Loader2 size={16} className="animate-spin text-secondary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Analyzing next step...</span>
                        </motion.div>
                    )}

                    {logs.length === 0 && !isRunning && (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20 px-4">
                            <Bot size={48} className="mb-4" />
                            <p className="text-xs font-bold uppercase tracking-widest">Idle</p>
                            <p className="text-[10px] italic mt-2">The agent is waiting for your next command.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ActivityFeed;
