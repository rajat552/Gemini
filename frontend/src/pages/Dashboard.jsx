import React, { useState, useEffect, useCallback } from 'react';
import ChatWindow from '../components/ChatWindow';
import TaskPanel from '../components/TaskPanel';
import ActivityFeed from '../components/ActivityFeed';
import { getTasks } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [intents, setIntents] = useState([]);
    const [logs, setLogs] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchTasks = useCallback(async () => {
        const data = await getTasks();
        setTasks(data);
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleWorkflowFinish = (result) => {
        setIsProcessing(false);
        if (result.tasks && result.tasks.length > 0) {
            fetchTasks();
        }
        if (result.workflowExecuted) {
            setIntents(result.workflowExecuted);
        }
        if (result.logs) {
            setLogs(prev => [...result.logs]);
        }
    };

    const handleWorkflowStart = () => {
        setIsProcessing(true);
        setIntents([]);
    };

    return (
        <div className="pt-24 flex-grow flex flex-col bg-app-bg transition-colors duration-300">
            <div className="max-w-[1800px] mx-auto grid lg:grid-cols-4 gap-8 flex-grow px-10 pb-10">

                {/* Chat - Main Interaction (Takes 2 cols) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div>
                                <h1 className="text-4xl font-black tracking-tight text-text-main">Gemini Copilot</h1>
                                <p className="text-text-muted text-sm font-medium">Orchestrating agentic workflows for your workspace.</p>
                            </div>

                            <AnimatePresence>
                                {intents.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-2xl"
                                    >
                                        <Target size={16} className="text-primary animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                            Focus: {intents.join(' + ').replace(/_/g, ' ')}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </header>
                    <ChatWindow
                        onWorkflowStart={handleWorkflowStart}
                        onWorkflowComplete={handleWorkflowFinish}
                    />
                </div>

                {/* Pipeline (Strategy/Tasks) */}
                <div className="lg:col-span-1 flex flex-col gap-6 h-full pb-10">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Zap size={20} className="text-primary" />
                            <h2 className="text-2xl font-black tracking-tight text-text-main">Strategy</h2>
                        </div>
                        <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{tasks.length} ACTIVE</span>
                        </div>
                    </header>
                    <TaskPanel tasks={tasks} onRefetch={fetchTasks} />
                </div>

                {/* Activity Feed (Workflow Logs) */}
                <div className="lg:col-span-1 flex flex-col gap-6 h-full pb-10">
                    <header className="flex items-center justify-between">
                        <h2 className="text-2xl font-black tracking-tight text-text-main">Execution</h2>
                    </header>
                    <ActivityFeed logs={logs} isRunning={isProcessing} />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
