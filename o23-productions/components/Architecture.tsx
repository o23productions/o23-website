import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Clapperboard, Bot, Palette, Eye,
  BarChart, DollarSign,
  Box, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONVERSION PIPELINE COMPONENT ---
export const Architecture: React.FC = () => {
  const [views, setViews] = useState(1000000);
  const [particles, setParticles] = useState<{id: number, val: string}[]>([]);

  // View counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setViews(prev => {
        const next = prev + 25000;
        return next > 10000000 ? 1000000 : next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Dollar Particle Emitter
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setParticles(prev => {
        const newState = [...prev, { id, val: '$' }];
        if (newState.length > 8) return newState.slice(1);
        return newState;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-24 bg-[#010a09] border-t border-emerald-900/30 overflow-hidden relative scroll-mt-24 text-white">
      {/* Darkened Grid Background - Green Tint */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#065f46 1px, transparent 1px), linear-gradient(90deg, #065f46 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Vignette - Dark Green/Black */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010a09] via-transparent to-[#010a09] pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#010a09] via-transparent to-[#010a09] pointer-events-none z-10"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4"
          >
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             Conversion Engine v3.0
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black font-sans tracking-tight mb-4 text-white"
          >
            THE GROWTH PIPELINE
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/60 max-w-3xl mx-auto text-lg font-light leading-relaxed"
          >
            We’re a team of creative and technical specialists who use AI as a production and optimization tool, not a replacement for human judgment. Every campaign is concepted, crafted, and refined by people, then scaled using systems built to increase reach, engagement, and conversion.
          </motion.p>
        </div>

        {/* --- MAIN PIPELINE VISUALIZATION (DESKTOP) --- */}
        {/* Force aspect ratio to match SVG coordinates for perfect alignment */}
        <div className="relative w-full aspect-[1200/400] min-h-[400px] bg-[#010b08]/60 rounded-3xl border border-emerald-900/50 backdrop-blur-sm shadow-2xl overflow-hidden hidden md:block">
            
            {/* SVG Connections Layer - Using preserveAspectRatio="none" to stretch with container */}
            <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-0" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#065f46" stopOpacity="0" />
                        <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                        <stop offset="100%" stopColor="#065f46" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glowLine">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                
                {/* 
                   COORDINATES MAPPING:
                   Node 1 (Brand): x=100, y=200
                   Node 2 (Engine): x=350, y=200
                   Node 3 (Stack): x=600, y=[80, 200, 320]
                   Node 4 (Channels): x=850, y=200
                   Node 5 (Revenue): x=1100, y=200
                */}

                {/* Path 1: Brand (100) -> Engine (350) */}
                <PipelinePath d="M 160 200 L 290 200" delay={0} />
                
                {/* Path 2: Engine (350) -> Verticals (600) */}
                <PipelinePath d="M 410 200 C 475 200, 475 80, 540 80" delay={0.5} />
                <PipelinePath d="M 410 200 L 540 200" delay={0.6} />
                <PipelinePath d="M 410 200 C 475 200, 475 320, 540 320" delay={0.7} />

                {/* Path 3: Verticals (600) -> Channels (850) */}
                <PipelinePath d="M 660 80 C 725 80, 725 200, 790 200" delay={1.2} />
                <PipelinePath d="M 660 200 L 790 200" delay={1.3} />
                <PipelinePath d="M 660 320 C 725 320, 725 200, 790 200" delay={1.4} />

                {/* Path 4: Channels (850) -> Revenue (1100) */}
                <PipelinePath d="M 910 200 L 1010 200" delay={2.0} color="#fbbf24" />
            </svg>

            {/* --- NODES (Absolute Positioning using %) --- */}
            
            {/* 1. BRAND ASSET (BLUE) */}
            <div className="absolute top-1/2 left-[8.33%] -translate-x-1/2 -translate-y-1/2 z-10 w-32 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-950 to-black border border-blue-900 shadow-[0_0_30px_rgba(59,130,246,0.1)] flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-blue-500/5 rounded-2xl animate-pulse"></div>
                    <Box size={40} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
                    <div className="absolute -top-2 -right-2 bg-blue-900 text-[10px] text-blue-200 font-bold px-2 py-0.5 rounded-full border border-blue-800">RAW</div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-500/60 uppercase tracking-widest text-center">Brand Asset</span>
            </div>

            {/* 2. ENGINE */}
            <div className="absolute top-1/2 left-[29.16%] -translate-x-1/2 -translate-y-1/2 z-10 w-32 flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full bg-black border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-spin-slow-reverse"></div>
                    <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/30 animate-spin-slow"></div>
                    <Cpu size={48} className="text-emerald-400 relative z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-ping"></span>
                    </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest glow-text text-center">O23 Engine</span>
            </div>

            {/* 3. VERTICALS STACK */}
            
            {/* Video Editing (y=80) */}
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
                 <VerticalCard icon={<Clapperboard size={20} />} label="Video Editing" color="text-pink-400" />
            </div>

            {/* AI Animation (y=200) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
                 <VerticalCard icon={<Bot size={20} />} label="AI Animation" color="text-red-400" />
            </div>

            {/* Graphic Design (y=320) */}
            <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
                 <VerticalCard icon={<Palette size={20} />} label="Graphic Design" color="text-blue-400" />
            </div>


            {/* 4. CHANNELS */}
            <div className="absolute top-1/2 left-[70.83%] -translate-x-1/2 -translate-y-1/2 z-10 w-32 flex flex-col items-center gap-4">
                    <div className="grid grid-cols-2 gap-2 p-3 bg-black/40 rounded-2xl border border-emerald-900/50 backdrop-blur-md">
                        <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center border border-slate-800 hover:border-emerald-500 transition-colors"><span className="text-xs font-bold text-white">TK</span></div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-yellow-500 to-purple-600 flex items-center justify-center border border-white/10 hover:border-white/50 transition-colors"><span className="text-xs font-bold text-white">IG</span></div>
                        <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center border border-white/10 hover:border-white/50 transition-colors"><span className="text-xs font-bold text-white">YT</span></div>
                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center border border-white/10 hover:border-white/50 transition-colors"><span className="text-xs font-bold text-white">FB</span></div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-700/60 uppercase tracking-widest">Distribution</span>
                    {/* View Counter */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 rounded-lg border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <Eye size={12} className="text-[#34d399] animate-pulse" />
                        <span className="text-xs font-mono font-bold text-[#34d399] tabular-nums">
                            {views.toLocaleString()}
                        </span>
                    </div>
                    </div>
            </div>

            {/* 5. REVENUE */}
            <div className="absolute top-1/2 left-[91.66%] -translate-x-1/2 -translate-y-1/2 z-10 w-48 flex flex-col items-center gap-4">
                <div className="w-full bg-gradient-to-b from-amber-500/10 to-black border border-amber-500/30 rounded-xl p-6 text-center shadow-[0_0_50px_rgba(245,158,11,0.05)] relative overflow-hidden group min-h-[140px] flex flex-col justify-center">
                    <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated Dollar Signs */}
                    <div className="relative h-16 w-full flex justify-center items-end overflow-visible mb-2">
                        <AnimatePresence>
                            {particles.map(p => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.5 }}
                                    animate={{ opacity: [0, 1, 0], y: -50, scale: 1.5, x: (Math.random() - 0.5) * 40 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="absolute bottom-0 text-amber-400 font-black text-3xl select-none"
                                >
                                    <DollarSign size={32} strokeWidth={3} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    
                    <div className="text-[10px] uppercase font-bold text-amber-600 tracking-[0.2em] relative z-10">Revenue Gen</div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-mono">
                    <BarChart size={14} />
                    <span>Conversion</span>
                </div>
            </div>

        </div>

        {/* --- MOBILE PIPELINE VISUALIZATION (Vertical, Animated) --- */}
        <div className="md:hidden relative w-full min-h-[1100px] bg-[#010b08]/60 rounded-3xl border border-emerald-900/50 backdrop-blur-sm shadow-2xl overflow-hidden">
            
            {/* SVG Layer for Mobile Vertical Paths */}
            <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-0" 
                viewBox="0 0 400 1100" 
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="flowGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#065f46" stopOpacity="0" />
                        <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                        <stop offset="100%" stopColor="#065f46" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Vertical Path 1: Brand (200, 130) -> Engine (200, 200) */}
                <PipelinePath d="M 200 130 L 200 200" delay={0} />

                {/* Vertical Path 2: Engine (200, 300) -> Verticals (200, 420) */}
                <PipelinePath d="M 200 300 L 200 420" delay={0.5} />
                
                {/* Vertical Path 3: Verticals (200, 580) -> Channels (200, 700) */}
                <PipelinePath d="M 200 580 L 200 700" delay={1.2} />

                {/* Vertical Path 4: Channels (200, 800) -> Revenue (200, 860) */}
                <PipelinePath d="M 200 800 L 200 860" delay={2.0} color="#fbbf24" />
            </svg>

            {/* 1. Brand Asset (Blue) */}
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 flex flex-col items-center gap-4">
               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-950 to-black border border-blue-900 shadow-[0_0_30px_rgba(59,130,246,0.1)] flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-blue-500/5 rounded-2xl animate-pulse"></div>
                    <Box size={32} className="text-blue-500" />
               </div>
               <span className="text-[10px] font-mono font-bold text-blue-500/60 uppercase tracking-widest text-center">Brand Asset</span>
            </div>

            {/* 2. Engine */}
            <div className="absolute top-[250px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 flex flex-col items-center gap-4">
                 <div className="w-24 h-24 rounded-full bg-black border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-spin-slow-reverse"></div>
                    <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/30 animate-spin-slow"></div>
                    <Cpu size={40} className="text-emerald-400 relative z-10" />
                 </div>
                 <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest glow-text text-center">O23 Engine</span>
            </div>

            {/* 3. Verticals (Stacked) */}
            <div className="absolute top-[500px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-3 w-full max-w-[200px]">
                <div className="p-3 bg-black/60 backdrop-blur-sm rounded-lg border border-emerald-900 flex items-center gap-3">
                    <Clapperboard size={16} className="text-pink-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase">Video Editing</span>
                </div>
                <div className="p-3 bg-black/60 backdrop-blur-sm rounded-lg border border-emerald-900 flex items-center gap-3">
                    <Bot size={16} className="text-red-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase">AI Animation</span>
                </div>
                <div className="p-3 bg-black/60 backdrop-blur-sm rounded-lg border border-emerald-900 flex items-center gap-3">
                    <Palette size={16} className="text-blue-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase">Graphic Design</span>
                </div>
            </div>

            {/* 4. Channels */}
             <div className="absolute top-[750px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-40 flex flex-col items-center gap-4">
                <div className="grid grid-cols-4 gap-2 p-2 bg-black/40 rounded-xl border border-emerald-900/50">
                     <div className="w-8 h-8 rounded bg-black flex items-center justify-center border border-slate-800 text-[8px] font-bold text-white">TK</div>
                     <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-500 to-purple-600 flex items-center justify-center border border-white/10 text-[8px] font-bold text-white">IG</div>
                     <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center border border-white/10 text-[8px] font-bold text-white">YT</div>
                     <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center border border-white/10 text-[8px] font-bold text-white">FB</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-black/80 rounded-lg border border-emerald-500/30">
                    <Eye size={10} className="text-[#34d399] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-[#34d399] tabular-nums">{views.toLocaleString()}</span>
                </div>
             </div>

             {/* 5. Revenue */}
             <div className="absolute top-[920px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-40">
                <div className="w-full bg-gradient-to-b from-amber-500/10 to-black border border-amber-500/30 rounded-xl p-4 text-center shadow-[0_0_30px_rgba(245,158,11,0.05)] relative overflow-hidden">
                    <AnimatePresence>
                        {particles.slice(0, 3).map(p => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: [0, 1, 0], y: -30 }}
                                transition={{ duration: 1.5 }}
                                className="absolute left-1/2 -translate-x-1/2 text-amber-500"
                            >
                                <DollarSign size={20} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest relative z-10 mt-4 block">Revenue</span>
                </div>
             </div>
        </div>

      </div>
      
      <style>{`
        .glow-text {
            text-shadow: 0 0 10px rgba(16,185,129,0.5);
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
        .animate-spin-slow-reverse {
            animation: spin 12s linear infinite reverse;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

// --- Helper Components ---

const PipelinePath: React.FC<{ d: string, delay: number, color?: string }> = ({ d, delay, color = "#10b981" }) => (
    <>
        {/* Background Line */}
        <path d={d} stroke="#064e3b" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
        
        {/* Glowing Flow Line */}
        <path d={d} stroke={color} strokeWidth="3" fill="none" strokeDasharray="10 200" strokeLinecap="round" filter="url(#glowLine)" opacity="0.6" vectorEffect="non-scaling-stroke">
            <animate 
                attributeName="stroke-dashoffset" 
                from="0" 
                to="-210" 
                dur="1.5s" 
                begin={`${delay}s`} 
                repeatCount="indefinite" 
            />
        </path>
    </>
);

const VerticalCard: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => (
    <div className={`w-36 bg-black/60 backdrop-blur-sm border border-emerald-900/50 p-3 rounded-lg flex items-center gap-3 shadow-lg transform hover:scale-105 transition-transform cursor-default group justify-start`}>
        <div className={`${color} group-hover:animate-bounce shrink-0`}>{icon}</div>
        <span className="text-[10px] leading-tight font-bold text-emerald-100/80 font-mono uppercase text-left">{label}</span>
    </div>
);