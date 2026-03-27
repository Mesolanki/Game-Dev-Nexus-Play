import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Added mobile menu state

    // Note: In a real app, you'd want this to be reactive (e.g., from an AuthContext)
    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = ['Home', 'Library', 'Community'];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled || isMobileMenuOpen
                    ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-indigo-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'py-6 bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter italic uppercase">
                            NEXUS<span className="text-indigo-500">PLAY</span>
                        </span>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            return (
                                <Link
                                    key={item}
                                    to={path}
                                    className={`relative text-xs font-bold uppercase tracking-widest transition-all ${isActive(path) ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {item}
                                    {isActive(path) && (
                                        <motion.div
                                            layoutId="nav-glow"
                                            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                    {/* SEARCH BOX */}
                    <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 group focus-within:border-indigo-500/50 transition-all">
                        <FiSearch className="text-gray-500 group-focus-within:text-indigo-400" />
                        <input
                            type="text"
                            placeholder="SEARCH SYSTEM..."
                            className="bg-transparent border-none outline-none text-xs text-white ml-3 w-40 lg:w-64 placeholder:text-gray-600 font-mono"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 text-gray-400 hover:text-indigo-400 transition-colors">
                            <FiShoppingCart className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full animate-pulse">
                                3
                            </span>
                        </Link>

                        <div className="hidden sm:block h-8 w-[1px] bg-white/10 mx-2"></div>

                        <div className="hidden sm:flex items-center">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    <Link to="/profile" className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all">
                                        <div className="w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                                            <FiUser size={14} />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Profile</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <FiLogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link to="/login" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-md transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                                        Join Grid
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* MOBILE MENU TOGGLE */}
                        <button
                            className="lg:hidden text-gray-400 hover:text-white ml-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-black/95 border-b border-indigo-500/20 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {/* Mobile Search */}
                            <div className="flex md:hidden items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus-within:border-indigo-500/50 transition-all">
                                <FiSearch className="text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="SEARCH SYSTEM..."
                                    className="bg-transparent border-none outline-none text-xs text-white ml-3 w-full placeholder:text-gray-600 font-mono"
                                />
                            </div>

                            {/* Mobile Links */}
                            {navLinks.map((item) => {
                                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                                return (
                                    <Link
                                        key={item}
                                        to={path}
                                        className={`text-sm font-bold uppercase tracking-widest py-2 ${isActive(path) ? 'text-indigo-400' : 'text-gray-400'
                                            }`}
                                    >
                                        {item}
                                    </Link>
                                );
                            })}

                            <hr className="border-white/10 my-2" />

                            {/* Mobile Auth */}
                            <div className="sm:hidden flex flex-col gap-4">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/profile" className="text-sm font-bold text-gray-300 uppercase tracking-widest">
                                            Profile
                                        </Link>
                                        <button onClick={handleLogout} className="text-sm font-bold text-red-500 uppercase tracking-widest text-left">
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest">
                                            Login
                                        </Link>
                                        <Link to="/signup" className="text-center py-3 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-md">
                                            Join Grid
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;