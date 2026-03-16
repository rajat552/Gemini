import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Plus, Filter, SortAsc, LayoutGrid, CheckSquare, X, List } from 'lucide-react';
import { getTasks, createTask, toggleTaskStatus, deleteTask } from '../services/api';
import { motion } from 'framer-motion';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [filter, setFilter] = useState('all');
    const [isGridView, setIsGridView] = useState(true);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        if (!newTitle.trim()) return;
        await createTask({ title: newTitle.trim(), description: newDescription.trim() });
        setNewTitle('');
        setNewDescription('');
        setShowModal(false);
        fetchTasks();
    };

    const handleToggle = async (id) => {
        await toggleTaskStatus(id);
        fetchTasks();
    };

    const handleDeleteClick = (id) => {
        setTaskToDelete(id);
    };

    const confirmDelete = async () => {
        if (!taskToDelete) return;
        await deleteTask(taskToDelete);
        setTaskToDelete(null);
        fetchTasks();
    };

    const handleFilterToggle = () => {
        setFilter(prev => prev === 'all' ? 'pending' : prev === 'pending' ? 'completed' : 'all');
    };

    const filteredTasks = tasks.filter(task => {
        const isCompleted = task.status === 'completed' || task.status === 'done';
        if (filter === 'completed') return isCompleted;
        if (filter === 'pending') return !isCompleted;
        return true;
    });

    return (
        <div className="pt-32 max-w-6xl mx-auto px-6 pb-20">
            <header className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                        <CheckSquare size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">Task Manager</h1>
                        <p className="text-gray-500 text-sm">Orchestrate your AI-generated productivity pipeline.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleFilterToggle}
                        className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest"
                    >
                        <Filter size={16} /> {filter === 'all' ? 'Filter' : filter}
                    </button>
                    <button 
                        onClick={() => setIsGridView(!isGridView)}
                        className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest"
                    >
                        {isGridView ? <><List size={16} /> List</> : <><LayoutGrid size={16} /> Grid</>}
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
                    >
                        <Plus size={20} /> Create Task
                    </button>
                </div>
            </header>

            <div className={`grid ${isGridView ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredTasks.map((task, idx) => (
                    <motion.div
                        key={task.id || idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <TaskCard {...task} onToggle={handleToggle} onDelete={handleDeleteClick} />
                    </motion.div>
                ))}

                {/* Placeholder Card */}
                <button
                    onClick={() => setShowModal(true)}
                    className="p-8 rounded-3xl border border-white/10 border-dashed bg-white/[0.01] hover:bg-white/[0.03] flex flex-col items-center justify-center text-gray-600 hover:text-gray-400 transition-all group"
                >
                    <Plus size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-xs uppercase tracking-[0.2em]">Add Workflow Step</span>
                </button>
            </div>

            {/* Create Task Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-card-bg border border-border-subtle rounded-3xl p-8 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black">Create New Task</h2>
                            <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-main transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Task title"
                            className="w-full px-4 py-3 bg-app-bg border border-border-subtle rounded-xl text-text-main placeholder:text-text-muted/50 mb-4 focus:outline-none focus:border-primary/50"
                        />
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Task description (optional)"
                            className="w-full px-4 py-3 bg-app-bg border border-border-subtle rounded-xl text-text-main placeholder:text-text-muted/50 mb-6 focus:outline-none focus:border-primary/50 resize-none"
                            rows={3}
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateTask}
                                disabled={!newTitle.trim()}
                                className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

export default TaskManager;
