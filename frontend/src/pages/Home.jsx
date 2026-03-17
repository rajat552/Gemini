import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Zap, Shield, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 transition-colors duration-300">
            {/* Background Orbs */}
            <div className="fixed top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card-bg border border-border-subtle mb-8 shadow-sm"
                    >
                        <Sparkles size={16} className="text-secondary" />
                        <span className="text-xs font-bold tracking-widest text-text-muted uppercase">Next Gen AI Productivity</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl font-black mb-8 leading-tight text-text-main"
                    >
                        Automate tasks with <br />
                        <span className="gradient-text tracking-tighter">AI-powered agents</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        The future of work is collaborative. Gemini Copilot understands your documents, follows your voice, and manages your workflow using high-performance Gemini models.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 hover:brightness-110 hover:-translate-y-1 transition-all flex items-center gap-3 group"
                        >
                            Open Copilot <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={() => window.open('https://www.youtube.com/watch?v=CCEqcZd7SkA', '_blank')}
                            className="px-10 py-5 bg-card-bg border border-border-subtle text-text-main rounded-2xl font-black text-lg hover:bg-white/10 transition-all shadow-sm"
                        >
                            Watch Demo
                        </button>
                    </motion.div>
                </header>

                <section className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Bot,
                            title: 'Multi-Step Actions',
                            desc: 'Our agents don’t just answer questions; they execute multi-step workflows across your data.',
                            color: 'text-primary',
                            bg: 'bg-primary/10'
                        },
                        {
                            icon: Zap,
                            title: 'Sonic Voice Control',
                            desc: 'Built-in real-time speech processing for hands-free productivity commands.',
                            color: 'text-secondary',
                            bg: 'bg-secondary/10'
                        },
                        {
                            icon: Shield,
                            title: 'Secure Processing',
                            desc: 'Your data stays private within your AWS environment using enterprise-grade security.',
                            color: 'text-accent',
                            bg: 'bg-accent/10'
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="glass-card p-10 hover:border-primary/20 transition-all group"
                        >
                            <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-text-main">{feature.title}</h3>
                            <p className="text-text-muted leading-relaxed italic">{feature.desc}</p>
                        </motion.div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Home;
