import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { Sparkles, BrainCircuit, ListChecks, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DocumentUpload = () => {
    const [analysis, setAnalysis] = useState(null);

    return (
        <div className="pt-32 max-w-5xl mx-auto px-6 pb-20">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-black mb-4">Document Intelligence</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">
                    Upload project documents or notes and let Gemini extract architecture, action items, and hidden insights.
                </p>
            </header>

            <FileUpload onAnalysisComplete={(res) => setAnalysis(res)} />

            {analysis && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-16 bg-card-bg/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BrainCircuit className="text-secondary" />
                            <h2 className="text-2xl font-bold">Extraction Results</h2>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
                            <Sparkles size={14} className="text-secondary" />
                            <span className="text-[10px] uppercase font-black text-secondary">Advanced Reasoner</span>
                        </div>
                    </div>

                    <div className="p-10">
                        <div className="mb-10">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
                                Executive Summary <ArrowRight size={14} />
                            </h3>
                            <div className="bg-white/5 p-6 rounded-2xl text-gray-300 leading-relaxed italic border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                                {analysis}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <ListChecks size={20} /> Action Items
                                </h4>
                                <ul className="space-y-3 text-sm text-gray-400">
                                    <li className="flex gap-2"><span>-</span> Model integration verification</li>
                                    <li className="flex gap-2"><span>-</span> API latency optimization</li>
                                    <li className="flex gap-2"><span>-</span> Security audit for multimodal data</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10">
                                <h4 className="font-bold text-accent mb-4 flex items-center gap-2">
                                    <BrainCircuit size={20} /> Architecture Insights
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    The document emphasizes modularity and asynchronous processing. Suggesting a serverless approach for task handlers.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DocumentUpload;
