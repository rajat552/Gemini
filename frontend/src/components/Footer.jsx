import React from 'react';
import { Bot, Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-border-subtle bg-card-bg/50 backdrop-blur-2xl transition-colors duration-300 relative overflow-hidden">
            {/* Soft top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <Bot size={22} />
                            </div>
                            <div>
                                <span className="text-xl font-black tracking-tight gradient-text">GEMINI</span>
                                <span className="text-[10px] block font-bold text-text-muted tracking-[0.2em] -mt-1 ml-1 uppercase">Copilot</span>
                            </div>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            Orchestrating the future of agentic workflows. Automate your digital workspace with intelligent AI agents.
                        </p>
                        <div className="flex items-center gap-4 text-text-muted mt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1">
                                <Github size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-text-main mb-6 uppercase tracking-wider">Product</h4>
                        <ul className="flex flex-col gap-4 text-sm text-text-muted">
                            <li><Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Copilot Dashboard</Link></li>
                            <li><Link to="/tasks" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Task Manager</Link></li>
                            <li><Link to="/documents" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Document Intel</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-bold text-text-main mb-6 uppercase tracking-wider">Resources</h4>
                        <ul className="flex flex-col gap-4 text-sm text-text-muted">
                            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Community Forum</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-xs">
                        &copy; {new Date().getFullYear()} GEMINI Technologies. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-text-muted">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
