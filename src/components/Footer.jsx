import React from 'react';
import { motion } from 'framer-motion';

function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-blue-900/50 font-mono text-gray-400 relative z-10 pt-16 pb-8 overflow-hidden">

            {/* SUBTLE GLOW EFFECT AT THE TOP OF THE FOOTER */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[20px] bg-blue-600/10 blur-xl"></div>

            <div className="max-w-7xl mx-auto px-6">

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* BRANDING & STATUS */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">
                            GRID<span className="text-blue-600">_STORE</span>
                        </h2>
                        <p className="text-xs text-gray-500 leading-relaxed max-w-xs border-l-2 border-blue-900/50 pl-3">
                            Global decentralized asset registry. Providing unrestricted access to verified digital experiences.
                        </p>
                        <div className="inline-flex items-center gap-2 border border-blue-900/30 bg-blue-900/10 px-3 py-1.5 mt-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Servers: Optimal</span>
                        </div>
                    </div>

                    {/* DIRECTORIES */}
                    <div>
                        <h3 className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mb-4">:: Directories</h3>
                        <ul className="space-y-3 text-xs">
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                ALL_ASSETS
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                TOP_SELLERS
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                NEW_UPLOADS
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                UPCOMING_RELEASES
                            </li>
                        </ul>
                    </div>

                    {/* SUPPORT & PROTOCOLS */}
                    <div>
                        <h3 className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mb-4">:: Protocols</h3>
                        <ul className="space-y-3 text-xs">
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                DRIVER_SUPPORT
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                REFUND_POLICY
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                END_USER_AGREEMENT
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                                PRIVACY_DIRECTIVE
                            </li>
                        </ul>
                    </div>

                    {/* COMMS CHANNELS */}
                    <div>
                        <h3 className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mb-4">:: Comms_Link</h3>
                        <ul className="space-y-3 text-xs">
                            <li className="hover:text-blue-400 transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-800 group-hover:text-blue-400 transition-colors">[*]</span>
                                DISCORD_NODE
                            </li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-800 group-hover:text-blue-400 transition-colors">[*]</span>
                                X_FREQUENCY
                            </li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer group flex items-center gap-2">
                                <span className="text-blue-800 group-hover:text-blue-400 transition-colors">[*]</span>
                                GITHUB_REPO
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM SYSTEM BAR */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        © 2026 GRID_STORE. ALL SYSTEM RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
                        <span>SYS_VER: 4.0.2</span>
                        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                        <span>ENCRYPTION: AES-256</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;