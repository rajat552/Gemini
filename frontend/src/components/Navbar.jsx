import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bot, Home, LayoutDashboard, FileText, CheckSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Toggle from './Toggle';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive
            ? 'bg-primary/20 text-primary border border-primary/30'
            : 'text-text-muted hover:text-text-main hover:bg-white/5'
        }`;

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-app-bg/80 backdrop-blur-xl border-b border-border-subtle z-50 flex items-center justify-between px-10 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Bot size={24} />
                </div>
                <div>
                    <span className="text-xl font-black tracking-tight gradient-text">GEMINI</span>
                    <span className="text-[10px] block font-bold text-text-muted tracking-[0.2em] -mt-1 ml-1 uppercase">Copilot</span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
                <NavLink to="/" className={linkClass}>
                    <Home size={18} />
                    <span className="text-sm font-semibold">Home</span>
                </NavLink>
                <NavLink to="/dashboard" className={linkClass}>
                    <LayoutDashboard size={18} />
                    <span className="text-sm font-semibold">Copilot</span>
                </NavLink>
                <NavLink to="/documents" className={linkClass}>
                    <FileText size={18} />
                    <span className="text-sm font-semibold">Docs</span>
                </NavLink>
                <NavLink to="/tasks" className={linkClass}>
                    <CheckSquare size={18} />
                    <span className="text-sm font-semibold">Tasks</span>
                </NavLink>
            </div>

            <div className="flex items-center gap-6">
                <Toggle isOn={isDarkMode} onToggle={toggleTheme} />


                <div className="w-10 h-10 rounded-full border-2 border-primary/50 p-0.5">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-bold text-white">
                        USER
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
