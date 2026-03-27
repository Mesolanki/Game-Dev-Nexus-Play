import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FiShoppingCart, FiMaximize, FiNavigation, FiWind,
    FiShield, FiTrendingUp, FiFlag, FiLayers, FiActivity,
    FiClock, FiCpu, FiAlertCircle, FiCrosshair, FiPlus
} from 'react-icons/fi';
import api from '../api/api';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function Home() {
    const containerRef = useRef(null);
    const heroBgRef = useRef(null);
    const heroTextRef = useRef(null);

    const [activeFilter, setActiveFilter] = useState("ALL");
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [newVehicle, setNewVehicle] = useState({
        id: "", title: "", genre: "STREET_ARCADE", price: "", image: ""
    });

    const fetchGameData = async () => {
        try {
            const response = await api.get('/api/games');
            setGameData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameData();
    }, []);



    const handleDownload = () => alert("Initiating APEX_ENGINE download sequence... 🚀");
    const handleTrailer = () => alert("Loading high-octane trailer... 🎬");
    const handleAddToCart = (itemTitle) => alert(`Adding [${itemTitle}] to your garage! 🛒`);

    useLayoutEffect(() => {
        if (!gameData || !gameData.upcomingReleases || gameData.upcomingReleases.length === 0) return;
let ctx = gsap.context(() => {
                gsap.to(heroBgRef.current, {
                yPercent: 30, scale: 1.1, ease: "none",
                scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
            });

            gsap.to(heroTextRef.current, {
                y: -100, opacity: 0, ease: "none",
                scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
            });

            gsap.fromTo(".hero-text > *",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 }
            );

            const animateSection = (triggerClass, targetClass) => {
                gsap.fromTo(targetClass,
                    { y: 60, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)",
                        scrollTrigger: { trigger: triggerClass, start: "top 85%", toggleActions: "play none none none" }
                    }
                );
            };

            animateSection(".features-section", ".feature-card");
            animateSection(".events-section", ".event-row");
            animateSection(".upcoming-section", ".upcoming-card");
            animateSection(".showroom-section", ".market-item");
            animateSection(".telemetry-section", ".stat-card");
            animateSection(".drivers-section", ".driver-card");

            setTimeout(() => { ScrollTrigger.refresh(); }, 500);

        }, containerRef);

        return () => ctx.revert();
    }, [gameData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-blue-500 font-mono">
                <div className="w-16 h-16 border-4 border-blue-900 border-t-blue-500 rounded-full animate-spin mb-4" />
                <span className="font-bold uppercase tracking-widest animate-pulse text-xs">INITIALIZING_APEX_ENGINE...</span>
            </div>
        );
    }

    if (!gameData) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono font-bold uppercase tracking-widest">
                NO DATA FOUND. RUN /api/games/seed VIA POSTMAN OR ATLAS.
            </div>
        );
    }

    console.log(">>> MAINFRAME DATA RECEIVED:", gameData);

    // Inside Home.jsx
    const filteredMarket = (gameData?.globalMarket || []).filter(game =>
        activeFilter === "ALL" ? true : game.genre === activeFilter
    );

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        try {
            // Changed from /api/games/add-vehicle to match AdminAddGame pattern
            await api.post('/games/add', newVehicle);
            alert("Vehicle Added!");
            fetchGameData();
            setNewVehicle({ id: "", title: "", genre: "STREET_ARCADE", price: "", image: "" });
        } catch (error) {
            alert("Transmission Failed: " + (error.response?.data?.message || "Check Console"));
        }
    };
    return (
        <div ref={containerRef} className="min-h-screen bg-black text-gray-200 font-mono overflow-x-hidden selection:bg-blue-600 selection:text-white">

            <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-20"></div>

            <header className="hero-section relative w-full h-screen flex items-center justify-center overflow-hidden border-b border-blue-900/30 bg-black">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div ref={heroBgRef} className="absolute inset-[-10%] bg-cover bg-center opacity-40 mix-blend-screen" style={{ backgroundImage: `url(${gameData.featuredAsset?.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
                </div>

                <div ref={heroTextRef} className="hero-text relative z-10 max-w-7xl w-full px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <FiActivity className="text-red-600 animate-pulse" />
                        <span className="text-red-500 text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase">FEATURED_CHASSIS</span>
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-300 to-blue-700 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                        {gameData.featuredAsset?.title}
                    </h1>
                    <p className="text-gray-400 max-w-xl text-base sm:text-lg mb-10 border-l-2 border-red-600 pl-6 py-1">
                        {gameData.featuredAsset?.tagline}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleDownload} className="group relative overflow-hidden bg-red-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 cursor-pointer">
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            <FiShoppingCart className="relative z-10 group-hover:scale-110 transition-transform" />
                            <span className="relative z-10">DOWNLOAD_NOW</span>
                        </button>
                        <button onClick={handleTrailer} className="group bg-[#0a0a0a]/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500 hover:bg-blue-900/20 hover:text-blue-400 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 cursor-pointer">
                            <FiMaximize className="group-hover:scale-125 transition-transform" /> VIEW_TRAILER
                        </button>
                    </div>
                </div>
            </header>

            <div className="bg-[#050505] border-b border-gray-900 py-2 overflow-hidden flex items-center">
                <div className="px-6 border-r border-gray-800 flex items-center gap-2">
                    <FiAlertCircle className="text-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest whitespace-nowrap">Track_Comms</span>
                </div>
                <div className="flex-1 overflow-hidden relative">
                    <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap flex gap-16 px-6">
                        {gameData.trackComms?.map((alert, i) => (
                            <span key={i} className="text-[10px] text-gray-500 uppercase tracking-widest">
                                <span className="text-blue-500 font-bold mr-2">[{alert.time}]</span>
                                {alert.msg}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <section className="features-section py-16 sm:py-24 bg-black relative z-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        { icon: FiNavigation, color: "text-blue-500", hoverColor: "group-hover:text-blue-400", title: "Global_Matchmaking", desc: "Race against drivers worldwide with zero-latency rollback netcode." },
                        { icon: FiWind, color: "text-red-500", hoverColor: "group-hover:text-red-400", title: "Aero_Dynamics", desc: "True-to-life physics engine. Feel every corner, draft, and drift." },
                        { icon: FiShield, color: "text-blue-500", hoverColor: "group-hover:text-blue-400", title: "Anti_Cheat_Core", desc: "Protected servers. Zero tolerance for memory injection or speed hacks." }
                    ].map((feat, i) => (
                        <div key={i} className="feature-card">
                            <div className="relative group p-8 rounded-xl bg-[#0a0a0a] border border-gray-900 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-500/50 hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_60%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
                                <div className="relative z-10 pointer-events-none">
                                    <feat.icon className={`text-3xl ${feat.color} mb-6 transition-colors duration-300 ${feat.hoverColor} group-hover:scale-110`} />
                                    <h4 className="text-lg font-bold uppercase mb-3 text-gray-100 group-hover:text-white transition-colors">{feat.title}</h4>
                                    <p className="text-[12px] text-gray-500 leading-relaxed uppercase tracking-wide group-hover:text-gray-300 transition-colors">{feat.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 sm:py-20 bg-[#050505] border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="events-section">
                        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-3 mb-8 text-gray-200">
                            <FiFlag className="text-red-600" /> Live_Events
                        </h2>
                        <div className="flex flex-col gap-4">
                            {gameData.liveEvents?.map((event, i) => (
                                <div key={i} className="event-row">
                                    <div className="relative group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-lg bg-[#0a0a0a] border border-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-red-600 hover:shadow-lg hover:shadow-red-900/20 before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08),transparent_70%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 cursor-pointer">
                                        <div className="relative z-10 flex flex-col mb-4 sm:mb-0 pointer-events-none">
                                            <span className={`text-[9px] font-bold tracking-widest uppercase mb-1 ${event.status === 'LIVE' ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>{event.status}</span>
                                            <span className="text-sm sm:text-base font-bold text-gray-200 uppercase tracking-wide group-hover:text-white transition-colors">{event.target}</span>
                                        </div>
                                        <div className="relative z-10 flex items-center gap-6 pointer-events-none">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[9px] text-gray-500 uppercase tracking-widest">Class</span>
                                                <span className="text-xs font-bold text-gray-300 tracking-wider">{event.class}</span>
                                            </div>
                                            <div className="flex flex-col items-end w-20">
                                                <span className="text-[9px] text-gray-500 uppercase tracking-widest">Prize_Pool</span>
                                                <span className="text-sm font-bold text-blue-500 tracking-wider group-hover:text-blue-400 transition-colors">{event.prize}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="drivers-section">
                        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-3 mb-8 text-gray-200">
                            <FiTrendingUp className="text-blue-500" /> Top_Drivers
                        </h2>
                        <div className="flex flex-col gap-4">
                            {gameData.topDrivers?.map((driver, i) => (
                                <div key={i} className="driver-card">
                                    <div className="relative group flex items-center justify-between p-5 rounded-lg bg-[#0a0a0a] border border-gray-800 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20 before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_70%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 cursor-pointer">
                                        <div className="relative z-10 flex items-center gap-4 pointer-events-none">
                                            <span className="text-2xl font-black italic text-gray-700 group-hover:text-blue-500/50 transition-colors">{driver.rank}</span>
                                            <div className="flex flex-col">
                                                <span className="text-sm sm:text-base font-bold text-gray-200 uppercase tracking-wide group-hover:text-white transition-colors">{driver.alias}</span>
                                                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">{driver.car}</span>
                                            </div>
                                        </div>
                                        <div className="relative z-10 flex flex-col items-end pointer-events-none">
                                            <span className="text-[9px] text-gray-500 uppercase tracking-widest">Best_Lap</span>
                                            <span className="text-sm font-black text-blue-500 tracking-wider group-hover:text-blue-400 transition-colors">{driver.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="upcoming-section py-16 sm:py-20 bg-black border-y border-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-10 gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-3 text-gray-200">
                            <FiClock className="text-red-600" /> Upcoming_Expansions
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {gameData.upcomingReleases?.map((item) => (
                            <div key={item.id} className="upcoming-card">
                                <div className="relative group rounded-xl bg-[#0a0a0a] border border-gray-800 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30 before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent_60%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 cursor-pointer">
                                    <div className="h-40 relative z-10 overflow-hidden pointer-events-none">
                                        <img src={item.image} alt="upcoming" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 blur-[1px] group-hover:blur-0 transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="border border-red-600/50 bg-red-600/20 backdrop-blur-md px-4 py-2 rounded text-red-500 font-bold tracking-widest text-xs uppercase group-hover:bg-red-600/30 group-hover:text-red-400 transition-colors">
                                                {item.status}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 relative z-10 border-t border-gray-800 bg-black/50 pointer-events-none">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">{item.type}</span>
                                            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest border border-blue-900 bg-blue-900/20 px-2 py-0.5 rounded">ETA: {item.eta}</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold uppercase text-gray-300 tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <main className="showroom-section max-w-7xl mx-auto px-6 py-16 sm:py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-900 pb-6 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight flex items-center gap-3 text-gray-200">
                        <FiLayers className="text-blue-600" /> The_Showroom
                    </h2>

                    <div className="flex gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest overflow-x-auto pb-2 md:pb-0 whitespace-nowrap">
                        {[
                            { id: "ALL", label: "All_Vehicles" },
                            { id: "STREET_ARCADE", label: "Street_Arcade" },
                            { id: "SIMULATOR", label: "Simulator" },
                            { id: "OFF_ROAD", label: "Off_Road" },
                            { id: "RETRO_RACER", label: "Retro_Racer" }
                        ].map((category) => (
                            <span
                                key={category.id}
                                onClick={() => setActiveFilter(category.id)}
                                className={`cursor-pointer transition-colors pb-1 ${activeFilter === category.id
                                    ? "text-blue-500 border-b border-blue-500"
                                    : "hover:text-gray-300"
                                    }`}
                            >
                                {category.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredMarket?.map((game, index) => (
                        <div key={`${game.id}-${index}`} className="market-item">
                            <div className="relative group rounded-xl bg-[#0a0a0a] border border-gray-800 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/30 before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_60%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 cursor-pointer">
                                <div className="h-48 overflow-hidden relative z-10 pointer-events-none">
                                    <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                                    <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 rounded border border-gray-800 text-[9px] text-blue-500 font-bold uppercase backdrop-blur-md">
                                        {game.id}
                                    </div>
                                </div>
                                <div className="p-5 relative z-10 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-gray-800">
                                    <div className="flex justify-between items-center mb-3 pointer-events-none">
                                        <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{game.genre}</span>
                                        <FiCrosshair className="text-gray-600 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-bold uppercase mb-4 text-gray-200 group-hover:text-white transition-colors tracking-tight pointer-events-none">{game.title}</h3>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                                        <span className="font-bold text-sm text-blue-500 group-hover:text-blue-400 transition-colors pointer-events-none">{game.price}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleAddToCart(game.title); }}
                                            className="p-2 rounded bg-black border border-gray-800 text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-90 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-pointer"
                                        >
                                            <FiShoppingCart size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <section className="max-w-3xl mx-auto px-6 py-12">
                <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-xl shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-red-600" />
                    <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3 text-gray-200 mb-6">
                        <FiPlus className="text-blue-500" /> Import_New_Chassis
                    </h2>

                    <form onSubmit={handleAddVehicle} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="ID (e.g. R_05)" required
                            className="bg-black border border-gray-800 text-gray-300 p-3 rounded text-xs uppercase tracking-wider focus:outline-none focus:border-blue-500 transition-colors"
                            value={newVehicle.id} onChange={(e) => setNewVehicle({ ...newVehicle, id: e.target.value })} />

                        <input type="text" placeholder="Title" required
                            className="bg-black border border-gray-800 text-gray-300 p-3 rounded text-xs uppercase tracking-wider focus:outline-none focus:border-blue-500 transition-colors"
                            value={newVehicle.title} onChange={(e) => setNewVehicle({ ...newVehicle, title: e.target.value })} />

                        <select
                            className="bg-black border border-gray-800 text-gray-300 p-3 rounded text-xs uppercase tracking-wider focus:outline-none focus:border-blue-500 transition-colors"
                            value={newVehicle.genre} onChange={(e) => setNewVehicle({ ...newVehicle, genre: e.target.value })}>
                            <option value="STREET_ARCADE">STREET_ARCADE</option>
                            <option value="SIMULATOR">SIMULATOR</option>
                            <option value="OFF_ROAD">OFF_ROAD</option>
                            <option value="RETRO_RACER">RETRO_RACER</option>
                        </select>

                        <input type="text" placeholder="Price (e.g. 19.99_USD)" required
                            className="bg-black border border-gray-800 text-gray-300 p-3 rounded text-xs uppercase tracking-wider focus:outline-none focus:border-blue-500 transition-colors"
                            value={newVehicle.price} onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })} />

                        <input type="text" placeholder="Image URL" required
                            className="bg-black border border-gray-800 text-gray-300 p-3 rounded text-xs tracking-wider focus:outline-none focus:border-blue-500 transition-colors sm:col-span-2"
                            value={newVehicle.image} onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.value })} />

                        <button type="submit" className="sm:col-span-2 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-xs py-4 rounded transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] cursor-pointer">
                            UPLOAD_TO_MAINFRAME
                        </button>
                    </form>
                </div>
            </section>

            <section className="telemetry-section py-12 sm:py-16 bg-[#050505] border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <FiCpu className="text-blue-500 text-lg sm:text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-sm font-bold uppercase text-gray-200 tracking-widest">Global_Telemetry</h3>
                            <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Live Server Statistics</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full lg:w-auto">
                        {gameData.systemTelemetry?.map((stat, i) => (
                            <div key={i} className="stat-card">
                                <div className="bg-black p-4 rounded border border-gray-800 hover:border-red-600/50 transition-colors hover:bg-[#0a0a0a] shadow-inner h-full">
                                    <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-widest block mb-2">{stat.label}</span>
                                    <div className="flex flex-wrap items-end gap-2">
                                        <span className="text-lg sm:text-xl font-black text-gray-200">{stat.value}</span>
                                        <span className={`text-[9px] sm:text-[10px] font-bold mb-1 text-red-500`}>{stat.trend}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-black py-16 sm:py-20 border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
                    <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-600 uppercase">APEX_ENGINE // RULES</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest leading-loose font-bold">
                            <ul className="space-y-2 list-none">
                                <li className="hover:text-blue-500 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-blue-600 rounded-full" /> Keep it on the track.</li>
                                <li className="hover:text-blue-500 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-blue-600 rounded-full" /> No external tuning scripts.</li>
                            </ul>
                            <ul className="space-y-2 list-none">
                                <li className="hover:text-red-500 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full" /> Respect server ping limits.</li>
                                <li className="hover:text-red-500 transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full" /> Fair play monitored actively.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-[#0a0a0a]/50 p-6 sm:p-8 rounded-xl border border-gray-800 flex flex-col justify-between hover:border-blue-500/30 transition-colors">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                                <h5 className="text-[9px] font-bold text-blue-500 tracking-[0.3em]">SERVER_STATUS: ONLINE</h5>
                            </div>
                            <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase leading-relaxed">
                                By starting your engine, you agree to the Terms of Service. Telemetry data is recorded to improve match-making.
                            </p>
                        </div>
                        <p className="text-[8px] sm:text-[9px] text-gray-600 mt-8 font-bold tracking-widest uppercase">
                            © 2026 APEX MOTORSPORTS INC.
                        </p>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
            `}} />
        </div>
    );
}

export default Home;