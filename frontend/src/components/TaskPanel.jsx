import React, { useState } from 'react';
import { Sparkles, LayoutList, Target, X } from 'lucide-react';
import TaskCard from './TaskCard';
import { toggleTaskStatus, deleteTask } from '../services/api';

const TaskPanel = ({ tasks = [], onRefetch }) => {
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleToggle = async (id) => {
        try {
            await toggleTaskStatus(id);
            if (onRefetch) onRefetch();
        } catch (error) {
            console.error("Failed to toggle task", error);
        }
    };

    const handleDeleteClick = (id) => {
        setTaskToDelete(id);
    };

    const confirmDelete = async () => {
        if (!taskToDelete) return;
        try {
            await deleteTask(taskToDelete);
            setTaskToDelete(null);
            if (onRefetch) onRefetch();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    return (
        <div className="flex flex-col h-full glass-card p-8 overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-sm">
                        <LayoutList size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-text-main">Strategy</h2>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest -mt-1">Pipeline</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-2xl">
                    <Sparkles size={14} className="text-primary animate-pulse" />
                    <span className="text-[10px] items-center gap-1 uppercase tracking-[0.2em] font-black text-primary flex">
                        Active
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth">
                {tasks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 border-2 border-dashed border-border-subtle rounded-3xl group hover:opacity-50 transition-all">
                        <Target size={56} className="mb-6 stroke-[1.5px] scale-110 group-hover:rotate-12 transition-transform" />
                        <h3 className="text-sm font-black text-text-main uppercase tracking-widest mb-2">No active strategy</h3>
                        <p className="text-[11px] leading-relaxed italic">Ask Gemini to analyze your documents or plan your next workflow steps logic.</p>
                    </div>
                ) : (
                    tasks.map((task, idx) => (
                        <TaskCard key={task._id || idx} {...task} onToggle={handleToggle} onDelete={handleDeleteClick} />
                    ))
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {taskToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-card-bg border border-border-subtle rounded-3xl p-8 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-black text-red-500">Delete Task</h2>
                            <button onClick={() => setTaskToDelete(null)} className="text-text-muted hover:text-text-main transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-text-muted mb-8">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setTaskToDelete(null)} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-5 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded-xl text-sm font-bold shadow-lg shadow-red-500/10 hover:bg-red-500 hover:text-white active:scale-95 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPanel;
