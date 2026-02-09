import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Camera, PenTool, Box, X, ExternalLink, ArrowLeft, ArrowRight,
  Plane, Sparkles, 
  Instagram, Facebook, Youtube, Video, MessageSquare
} from 'lucide-react';

type NodeType = 'IRL' | 'PUB' | 'ANI' | null;

// --- SUB BRAND DATA ---
interface SubBrand {
  id: string;
  name: string;
  image: string;
  color: string;
  description: string;
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
}

const SUB_BRANDS: Record<string, SubBrand[]> = {
  PUB: [
    { 
      id: 'positivity', 
      name: 'Positivity Rec.', 
      image: 'https://i.imgur.com/MjzDCKB.png',
      color: 'text-amber-500', 
      description: 'A digital media brand curating positive world news, inspiring innovation, and stories that make the future feel hopeful.',
      socials: { 
        instagram: 'https://www.instagram.com/positivityrecommended/', 
        facebook: 'https://www.facebook.com/profile.php?id=61583666935683' 
      }
    },
    { 
      id: 'o23eco', 
      name: 'O23 EcoTech', 
      image: 'https://i.imgur.com/fO35aaJ.png',
      color: 'text-emerald-500', 
      description: 'Short-form content highlighting technology, climate, world news, and eco-friendly innovation in a clear, accessible way.',
      socials: { 
        instagram: 'https://www.instagram.com/o23ecotech/', 
        facebook: 'https://www.facebook.com/profile.php?id=61559503152272', 
        tiktok: 'https://www.tiktok.com/@o23ecotech',
        youtube: 'https://www.youtube.com/@o23ecotech'
      }
    },
    { 
      id: 'fur', 
      name: 'Fur The Plot', 
      image: 'https://i.imgur.com/8bepOXB.png',
      color: 'text-orange-600', 
      description: 'Fur the Plot is a pet and animal media brand starring Teddy a NYC based dog sharing humorous dog memes, feel-good videos, and educational pet content.',
      socials: { 
        instagram: 'https://www.instagram.com/fur.the.plot/', 
        facebook: 'https://www.facebook.com/Furtheplot',
        tiktok: 'https://www.tiktok.com/@fur.the.plot',
        youtube: 'https://www.youtube.com/@furtheplot'
      }
    },
  ],
  IRL: [
    { 
      id: 'nxt', 
      name: 'Nxt Find', 
      image: 'https://i.imgur.com/7p3d4cq.png',
      color: 'text-sky-500', 
      description: 'A travel and lifestyle discovery page showcasing unique experiences, must-try products, and hidden gems around the world. nxt.find connects brands with an engaged audience through authentic, aesthetic-first content.',
      socials: { 
        instagram: 'https://www.instagram.com/nxt.find/', 
        facebook: 'https://www.facebook.com/profile.php?id=61587523537270',
        tiktok: 'https://www.tiktok.com/@nxt.find'
      }
    },
    { 
      id: 'evelyn', 
      name: 'ItzEvelyn', 
      image: 'https://i.imgur.com/JQl8t2l.jpeg',
      color: 'text-purple-500', 
      description: 'A NYC-based lifestyle creator sharing fashion, beauty, travel, and real-life moments through personal, story-driven content. itzevelyn offers brands a relatable, human-centered approach to modern lifestyle storytelling.',
      socials: { 
        instagram: 'https://www.instagram.com/_itzevelyn/', 
        facebook: 'https://www.facebook.com/evelyn.rodriguez.3720/',
        tiktok: 'https://www.tiktok.com/@_itzevelyn',
        youtube: 'https://www.youtube.com/@E.dreamy'
      }
    },
  ],
  ANI: [
    { 
      id: 'yuna', 
      name: 'Yuna Yoonyo', 
      image: 'https://i.imgur.com/9VqxKdx.png',
      color: 'text-pink-500', 
      description: 'An AI influencer sharing wisdom, mindfulness, and peaceful life guidance through gentle storytelling.',
      socials: { 
        instagram: 'https://www.instagram.com/yunayoonyo/', 
        facebook: 'https://www.facebook.com/profile.php?id=61585561507637',
        tiktok: 'https://www.tiktok.com/@yunayoonyo', 
        youtube: 'https://www.youtube.com/@Yunayoonyo' 
      }
    },
    { 
      id: 'uncomfy', 
      name: 'Kinda Uncomfy', 
      image: 'https://i.imgur.com/RG38Kjd.png',
      color: 'text-slate-600', 
      description: 'An animated series turning awkward, uncomfortable moments into relatable, comedic stories.',
      socials: { 
        instagram: 'https://www.instagram.com/kinda.uncomfy/', 
        facebook: 'https://www.facebook.com/profile.php?id=61587060611811',
        tiktok: 'https://www.tiktok.com/@kinda.uncomfy?lang=en',
        youtube: 'https://www.youtube.com/@Kina.uncomfy'
      }
    },
    { 
      id: 'ghxst', 
      name: 'Studio Ghxst', 
      image: 'https://i.imgur.com/bCi3gtO.png',
      color: 'text-violet-500', 
      description: 'An AI-powered music studio creating original music and visuals that blend technology, creativity, and modern sound.',
      socials: { 
        instagram: 'https://www.instagram.com/studioghxst/' 
      }
    },
    { 
      id: 'healthy', 
      name: 'Something Healthy', 
      image: 'https://i.imgur.com/PDWRRNM.png',
      color: 'text-rose-500', 
      description: 'Visualizing health data and wellness tips through engaging motion graphics.',
      socials: { instagram: '#', facebook: '#' }
    },
  ]
};

// --- COORDINATE SYSTEM ---
const DESKTOP_VIEWBOX = { w: 1200, h: 800 };
const MOBILE_VIEWBOX = { w: 400, h: 1000 };

const COORDS = {
  desktop: {
    CORE: { x: 600, y: 400 }, 
    IRL: { x: 250, y: 400 },     // Left
    PUB: { x: 900, y: 200 },     // Top Right
    ANI: { x: 900, y: 600 },     // Bottom Right
  },
  mobile: {
    CORE: { x: 200, y: 200 },
    PUB: { x: 200, y: 450 }, 
    IRL: { x: 200, y: 650 }, 
    ANI: { x: 200, y: 850 },
  }
};

export const WorkflowAnimation: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeType>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNodeClick = (node: NodeType) => {
    setActiveNode(node);
  };

  const currentCoords = isMobile ? COORDS.mobile : COORDS.desktop;
  const currentViewBox = isMobile ? MOBILE_VIEWBOX : DESKTOP_VIEWBOX;
  
  // Helper to get absolute style position in %
  const getStyle = (x: number, y: number) => ({
    left: `${(x / currentViewBox.w) * 100}%`,
    top: `${(y / currentViewBox.h) * 100}%`
  });

  return (
    <div 
      className={`relative w-full select-none overflow-hidden bg-white/50 backdrop-blur-sm rounded-[3rem] border border-slate-200 shadow-2xl transition-all duration-500 perspective-container`}
      style={{ aspectRatio: isMobile ? '400/1000' : '1200/800' }}
    >
      {/* --- GRID BACKGROUND --- */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
            backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
        }}
      />
      
      {/* --- BANNER OVERLAY --- */}
      <div className="absolute top-6 left-6 z-40">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-200 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 font-mono uppercase tracking-widest">
                Explore Our Social Brands
            </span>
        </div>
      </div>

      {/* --- SVG LAYER (Lines) --- */}
      {/* Changed preserveAspectRatio to 'none' to ensure SVG coordinates map 1:1 with CSS percentages */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        viewBox={`0 0 ${currentViewBox.w} ${currentViewBox.h}`} 
        preserveAspectRatio="none"
      >
        <defs>
           {/* Reduced glow stdDeviation for performance */}
           <filter id="glow">
             <feGaussianBlur stdDeviation="1.5" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
           <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
             <stop offset="50%" stopColor="#0f172a" stopOpacity="0.8" />
             <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
           </linearGradient>
        </defs>

        {/* CORE CONNECTIONS */}
        <g className={`transition-opacity duration-500 ${activeNode ? 'opacity-20' : 'opacity-100'}`}>
           <Connection d={`M ${currentCoords.CORE.x} ${currentCoords.CORE.y} L ${currentCoords.PUB.x} ${currentCoords.PUB.y}`} delay={0} />
           <Connection d={`M ${currentCoords.CORE.x} ${currentCoords.CORE.y} L ${currentCoords.IRL.x} ${currentCoords.IRL.y}`} delay={0.25} />
           <Connection d={`M ${currentCoords.CORE.x} ${currentCoords.CORE.y} L ${currentCoords.ANI.x} ${currentCoords.ANI.y}`} delay={0.5} />
        </g>
      </svg>
      

      {/* --- DOM LAYER --- */}

      {/* 1. CENTER HUB: O23 CORE */}
      <div 
        className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 will-change-transform ${activeNode ? 'scale-90 opacity-50 blur-[2px]' : 'scale-100 opacity-100'}`}
        style={getStyle(currentCoords.CORE.x, currentCoords.CORE.y)}
      >
         <div className="relative group cursor-default perspective-item">
             {/* Base Stack */}
             <div className="relative w-48 h-32 md:w-56 md:h-40 flex items-center justify-center">
                {/* Replaced blur with opacity for performance */}
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full scale-110 animate-pulse"></div>
                <div className="absolute inset-0 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl transform translate-y-6 scale-90 opacity-40"></div>
                <div className="absolute inset-0 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl transform translate-y-3 scale-95 opacity-70"></div>
                
                {/* Main Core Unit - Image Background */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-emerald-200 shadow-xl flex flex-col items-center justify-center overflow-hidden z-20 bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1622042795081-c27996872dbc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyZWVuJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww"
                      alt="Core Background"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager" // Important for core image
                    />
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

                    <div className="relative z-30 flex flex-col items-center gap-2">
                       <div className="bg-white/90 backdrop-blur-md border border-emerald-200 text-slate-900 text-sm md:text-base font-black font-mono px-4 py-2 rounded-lg tracking-[0.2em] shadow-lg">
                          <span className="text-slate-500 mr-2">023</span>
                          <span className="text-emerald-600">CORE</span>
                       </div>
                    </div>
                </div>
             </div>
         </div>
      </div>

      {/* 2. TOP RIGHT: PUBLISHING */}
      <div 
        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={getStyle(currentCoords.PUB.x, currentCoords.PUB.y)}
      >
        <NodeModuleGlass 
          active={activeNode === 'PUB'} 
          onClick={() => handleNodeClick('PUB')}
          icon={<PenTool size={32} />} 
          label="PUBLISHING" 
          animationDelay="0s" 
          backgroundImage="https://gifdb.com/images/high/dark-academia-harry-potter-newspaper-tbx6o9hqrweclqwx.webp"
          showClickHint={!activeNode}
          clickHintDirection="left"
        />
      </div>

      {/* 3. LEFT: IRL NETWORK */}
      <div 
        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={getStyle(currentCoords.IRL.x, currentCoords.IRL.y)}
      >
        <NodeModuleGlass 
          active={activeNode === 'IRL'} 
          onClick={() => handleNodeClick('IRL')}
          icon={<Camera size={32} />} 
          label="IRL NET" 
          animationDelay="0.2s"
          backgroundImage="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyaWs4eWprdGtkZ2R3cHo3eHdpc3JjMzRwNGt4YW5sMGo2N2szeXp5NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uGkXpJfiBTKE0/source.gif"
          showClickHint={!activeNode}
          clickHintDirection="right"
        />
      </div>

      {/* 4. BOTTOM RIGHT: AI ANIMATION */}
      <div 
        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={getStyle(currentCoords.ANI.x, currentCoords.ANI.y)}
      >
        <NodeModuleGlass 
          active={activeNode === 'ANI'} 
          onClick={() => handleNodeClick('ANI')}
          icon={<Box size={32} />} 
          label="AI ANIM" 
          animationDelay="0.4s"
          backgroundImage="https://i.imgur.com/recYqjU.gif"
          showClickHint={!activeNode}
          clickHintDirection="left"
        />
      </div>

      {/* MODAL OVERLAY - BRAND PALETTE */}
      {activeNode && (
        <BrandPaletteModal 
           nodeType={activeNode} 
           onClose={() => setActiveNode(null)} 
        />
      )}

      <style>{`
        .perspective-container {
          perspective: 1000px;
        }
        .perspective-item {
          transform-style: preserve-3d;
        }
        /* Optimized pulse animation using transform instead of box-shadow blur if possible, but box-shadow is key visual */
        @keyframes pulse-impact {
          0%, 85% { box-shadow: 0 0 0 rgba(0,0,0,0); border-color: #e2e8f0; }
          90% { box-shadow: 0 0 20px rgba(16,185,129,0.2); border-color: #10b981; transform: scale(1.02); }
          100% { box-shadow: 0 0 5px rgba(16,185,129,0.1); border-color: #e2e8f0; transform: scale(1); }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slide-up-fade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes arrow-point {
            0%, 100% { transform: translateX(0); opacity: 0.6; }
            50% { transform: translateX(4px); opacity: 1; }
        }
        .animate-slide-up-fade {
            animation: slide-up-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

// --- Sub Components ---

const BrandPaletteModal: React.FC<{ 
  nodeType: NodeType; 
  onClose: () => void; 
}> = ({ nodeType, onClose }) => {
  const [selectedBrand, setSelectedBrand] = useState<SubBrand | null>(null);

  if (!nodeType) return null;
  const brands = SUB_BRANDS[nodeType];
  
  const config = {
     label: nodeType === 'PUB' ? 'PUBLISHING' : nodeType === 'IRL' ? 'IRL NETWORK' : 'AI ANIMATION',
     icon: nodeType === 'PUB' ? PenTool : nodeType === 'IRL' ? Camera : Box,
     color: nodeType === 'PUB' ? 'text-slate-700' : nodeType === 'IRL' ? 'text-emerald-600' : 'text-emerald-800'
  };

  const Icon = config.icon;

  // Custom Smooth Scroll Logic for Modal Links
  const handleSmoothScrollToCampaign = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    
    // Slight delay to allow modal to unmount cleanly
    setTimeout(() => {
        const element = document.getElementById('campaign-intake');
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL
            window.history.pushState(null, '', '#campaign-intake');
        }
    }, 100);
  };

  // Render Social Icon helper
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram size={20} />;
      case 'facebook': return <Facebook size={20} />;
      case 'youtube': return <Youtube size={20} />;
      case 'tiktok': return <Video size={20} />; // TikTok replacement using Video icon
      default: return <ExternalLink size={20} />;
    }
  };

  // Portal to body for full screen overlay
  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
       {/* Darkened Blur Backdrop - Fixed */}
       <div 
         className="fixed inset-0 bg-slate-900/80 backdrop-blur-md animate-[fade-in_0.3s_ease-out]" 
         onClick={onClose}
       ></div>

       {/* Scrollable Container */}
       <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
          
          {/* Controls: Close & Contact */}
          <div className="absolute top-6 right-6 flex items-center gap-6 z-50">
             
             {/* Enhanced CTA Button */}
             <div className="hidden sm:flex items-center gap-2 group">
                 {/* Animated Arrows */}
                 <div className="flex -space-x-1">
                    <div style={{ animation: 'arrow-point 1s infinite' }} className="text-emerald-500"><ArrowRight size={16} strokeWidth={3} /></div>
                    <div style={{ animation: 'arrow-point 1s infinite 0.1s' }} className="text-emerald-400 opacity-70"><ArrowRight size={16} strokeWidth={3} /></div>
                 </div>

                 <a 
                   href="#campaign-intake" 
                   className="relative overflow-hidden flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold font-mono text-sm uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 border border-emerald-500/50 group-hover:border-emerald-400"
                   onClick={handleSmoothScrollToCampaign} 
                 >
                    <MessageSquare size={16} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" /> 
                    <span>Talk to us</span>
                 </a>
             </div>

             <button 
                onClick={onClose} 
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 group shadow-lg backdrop-blur-sm"
             >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
             </button>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center my-12">
              
              {/* VIEW 1: CATEGORY LIST (No Selected Brand) */}
              {!selectedBrand && (
                <>
                  {/* Header Section */}
                  <div className="flex flex-col items-center mb-10 md:mb-16 text-center animate-slide-up-fade" style={{ animationDelay: '0ms' }}>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-[2.5rem] shadow-[0_0_60px_rgba(255,255,255,0.2)] flex items-center justify-center mb-6 border-4 border-slate-50">
                        <Icon size={48} className={`md:w-16 md:h-16 ${config.color}`} />
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-[2.5rem] border-2 border-emerald-500/30 animate-ping"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black font-mono tracking-[0.2em] text-white uppercase drop-shadow-2xl">
                        {config.label}
                    </h2>
                    <div className="mt-4 h-1 w-24 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]"></div>
                    
                    {/* Mobile Only CTA */}
                    <a 
                        href="#campaign-intake" 
                        onClick={handleSmoothScrollToCampaign} 
                        className="mt-6 sm:hidden flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full font-bold font-mono text-xs uppercase tracking-wide shadow-lg border border-emerald-400"
                    >
                       <MessageSquare size={14} /> Talk to us
                    </a>
                  </div>

                  {/* Brands Grid */}
                  <div className={`
                    w-full grid gap-6 md:gap-10
                    grid-cols-1
                    ${brands.length === 2 ? 'md:grid-cols-2 max-w-3xl' : ''}
                    ${brands.length === 3 ? 'md:grid-cols-3 max-w-5xl' : ''}
                    ${brands.length >= 4 ? 'md:grid-cols-4 max-w-6xl' : ''}
                  `}>
                    {brands.map((brand) => (
                        <button 
                          key={brand.id}
                          onClick={() => setSelectedBrand(brand)}
                          className="group relative flex flex-col items-center p-6 md:p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                          <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-3xl transition-colors"></div>
                          {/* Updated Thumbnails to Circle and replaced Icon with Image */}
                          <div className="relative w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border-4 border-slate-50 overflow-hidden">
                              <img 
                                src={brand.image} 
                                alt={brand.name} 
                                className="w-full h-full object-cover" 
                                loading="lazy" // Added lazy loading
                              />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ExternalLink size={12} className="text-white drop-shadow-md" />
                              </div>
                          </div>
                          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 px-5 py-2.5 rounded-xl group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all duration-300 shadow-lg">
                              <span className="text-sm md:text-base font-bold text-white uppercase tracking-wider whitespace-nowrap">
                                {brand.name}
                              </span>
                          </div>
                        </button>
                    ))}
                  </div>
                </>
              )}

              {/* VIEW 2: BRAND DETAIL (Selected Brand) */}
              {selectedBrand && (
                <div className="w-full max-w-2xl mx-auto animate-slide-up-fade">
                   {/* Back Button */}
                   <button 
                     onClick={() => setSelectedBrand(null)}
                     className="mb-8 flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-[-5px] transition-all group"
                   >
                     <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20">
                       <ArrowLeft size={20} />
                     </div>
                     <span className="font-mono text-sm uppercase tracking-wider">Back to List</span>
                   </button>

                   <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                      {/* Banner/Header */}
                      <div className="bg-slate-50 p-8 border-b border-slate-100 flex flex-col md:flex-row items-center gap-6 relative">
                          {/* Mobile Header CTA */}
                          <a 
                             href="#campaign-intake" 
                             onClick={handleSmoothScrollToCampaign} 
                             className="absolute top-4 right-4 sm:hidden p-2 bg-emerald-100 text-emerald-600 rounded-full border border-emerald-200"
                          >
                              <MessageSquare size={16} />
                          </a>

                          {/* Detail Image - Rounded Full, Image instead of Icon */}
                          <div className="w-24 h-24 bg-white rounded-full shadow-lg border-2 border-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                             <img 
                                src={selectedBrand.image} 
                                alt={selectedBrand.name} 
                                className="w-full h-full object-cover" 
                                loading="lazy"
                             />
                          </div>
                          <div className="text-center md:text-left">
                             <h3 className="text-2xl font-black text-slate-900 font-mono uppercase tracking-wide">
                                {selectedBrand.name}
                             </h3>
                             <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                                Verified Partner
                             </div>
                          </div>
                      </div>

                      {/* Body Content */}
                      <div className="p-8">
                         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">About the Brand</h4>
                         <p className="text-slate-600 text-lg leading-relaxed mb-8 font-light">
                            {selectedBrand.description}
                         </p>

                         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connect</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(selectedBrand.socials).map(([platform, url]) => (
                               <a 
                                 key={platform}
                                 href={url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all group"
                               >
                                  <div className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                                     {renderSocialIcon(platform)}
                                  </div>
                                  <span className="font-mono text-sm font-bold text-slate-700 uppercase group-hover:text-slate-900">
                                     {platform}
                                  </span>
                                  <ExternalLink size={14} className="ml-auto text-slate-300 group-hover:text-emerald-400" />
                               </a>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              )}

          </div>
       </div>
    </div>,
    document.body
  )
}

// Updated Node Module - No children
const NodeModuleGlass: React.FC<{ 
  active: boolean; 
  onClick: () => void;
  icon: React.ReactNode; 
  label: string; 
  animationDelay: string;
  backgroundImage?: string;
  showClickHint?: boolean;
  clickHintDirection?: 'left' | 'right';
}> = ({ active, onClick, icon, label, animationDelay, backgroundImage, showClickHint = false, clickHintDirection = 'right' }) => {
  
  const styleVariables = {
    // Increased pulse speed from 3s to 1.5s
    animation: active ? 'none' : `pulse-impact 1.5s infinite linear`,
    animationDelay: animationDelay,
  } as React.CSSProperties;

  return (
    <div className="relative flex items-center justify-center group/node">
      <div 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`
          cursor-pointer relative transition-all duration-300
          w-40 h-40 z-30
          ${active ? 'scale-105' : 'hover:scale-105'}
        `}
      >
         {/* Click Me Hint */}
         {showClickHint && (
            <div className={`
                absolute top-1/2 -translate-y-1/2 pointer-events-none z-50 flex items-center gap-2
                opacity-0 group-hover/node:opacity-100 transition-opacity duration-300
                ${clickHintDirection === 'right' ? 'left-full ml-4' : 'right-full mr-4 flex-row-reverse'}
            `}>
                <span className="bg-emerald-500 text-white text-[10px] font-bold font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap uppercase tracking-wide">
                    Click Me
                </span>
                {/* Removed MousePointer2 arrow icon */}
            </div>
         )}

         <div 
           style={styleVariables}
           className={`
            absolute inset-0 rounded-[2.5rem] border overflow-hidden
            ${active ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200'}
            shadow-xl
            flex flex-col items-center justify-center gap-3
            transition-colors duration-200
            ${backgroundImage ? 'bg-slate-100' : 'bg-white/90 backdrop-blur-md'}
         `}>
            
            {backgroundImage && (
                <>
                    <img 
                        src={backgroundImage} 
                        alt="Node Background" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/node:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
                </>
            )}

            {!backgroundImage && (
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-50 to-transparent rounded-t-[2.5rem] pointer-events-none"></div>
            )}

            {/* Icon Wrapper */}
            <div className={`relative z-10 ${backgroundImage ? 'bg-white/95 p-2 rounded-xl shadow-md backdrop-blur-sm' : ''} text-slate-900`}>
              {icon}
            </div>
            
            {/* Label Wrapper */}
            <div className={`relative z-10 ${backgroundImage ? 'bg-white/95 px-3 py-1 rounded-lg shadow-md backdrop-blur-sm border border-slate-100' : ''}`}>
              <span className="text-sm font-bold text-slate-900 font-mono tracking-wider">
                {label}
              </span>
            </div>

            {/* Status Dot */}
            <div className={`absolute bottom-6 right-6 w-2 h-2 rounded-full ${active ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'} shadow-[0_0_8px_#10b981] z-10`}></div>
         </div>
      </div>
      <style>{`
          @keyframes bounce-horizontal {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(3px); }
          }
      `}</style>
    </div>
  );
};

interface ConnectionProps {
  d: string;
  delay?: number;
}

const Connection: React.FC<ConnectionProps> = ({ d, delay = 0 }) => {
  return (
    <g>
      <path 
        d={d} 
        stroke="#cbd5e1" 
        strokeWidth={2} 
        fill="none" 
        strokeLinecap="round"
      />
      {/* Increased animation speeds from 3s to 1.5s */}
      <path d={d} stroke="url(#lineGrad)" strokeWidth={3} fill="none" strokeLinecap="round">
         <animate 
           attributeName="stroke-dasharray" 
           from="0, 1000" 
           to="0, 1000" 
           dur="1.5s" 
           begin={`${delay}s`}
           repeatCount="indefinite"
           values="0 2000; 100 2000; 0 2000"
           keyTimes="0; 0.9; 1"
         />
         <animate 
           attributeName="stroke-dashoffset" 
           from="0" 
           to="-1000" 
           dur="1.5s" 
           begin={`${delay}s`}
           repeatCount="indefinite"
           values="0; -600; -1000" 
           keyTimes="0; 0.9; 1"
         />
         <animate
           attributeName="opacity"
           values="0; 1; 1; 0"
           keyTimes="0; 0.1; 0.9; 1"
           dur="1.5s"
           begin={`${delay}s`}
           repeatCount="indefinite"
         />
      </path>
      {/* Removed filtered circle for performance */}
      {/* 
      <circle r={4} fill="#0f172a" filter="url(#glow)"> 
        ...
      </circle> 
      */}
      <circle r={3} fill="#0f172a">
        <animateMotion 
           dur="1.5s" 
           begin={`${delay}s`}
           repeatCount="indefinite" 
           path={d} 
           keyPoints="0;1" 
           keyTimes="0;0.9" 
           calcMode="linear" 
           fill="freeze"
        />
        <animate 
           attributeName="opacity" 
           values="0;1;0" 
           keyTimes="0;0.1;1" 
           dur="1.5s" 
           begin={`${delay}s`}
           repeatCount="indefinite" 
        />
      </circle>
    </g>
  );
};