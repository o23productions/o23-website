import React from 'react';
import { GridBackground } from './GridBackground';
import { ArrowDown, Globe, Zap, Cpu } from 'lucide-react';
import { TechButton } from './TechButton';
import { WorkflowAnimation } from './WorkflowAnimation';
import { SchematicGlobe } from './SchematicGlobe';
import { ShaderAnimation } from './ui/shader-animation';
import { AnimatedText } from './ui/animated-text';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center pt-4 pb-20 overflow-hidden bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Plane 1: New Header Structure */}
      <div className="hero-container px-4 sm:px-6 mb-8 relative z-20 w-full flex flex-col items-center">
        <div className="shader-box relative">
            <div className="shader-container" id="shaderContainer">
                 <ShaderAnimation />
            </div>
            
            <div className="title-overlay flex flex-col items-center justify-center w-full h-full">
                <div className="system-online mb-6">
                    <span className="status-dot"></span>
                    CREATING<span className="loading-dots"></span>
                </div>
                
                {/* Replaced static h1 with AnimatedText for typewriter effect + Gradient Animation */}
                <AnimatedText 
                    text="O23 PRODUCTIONS"
                    textClassName="font-mono text-[8vw] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-medium tracking-tighter drop-shadow-sm whitespace-nowrap animate-text-shimmer"
                    textGradient="from-slate-900 via-[#4ade80] to-slate-900" 
                    underlineGradient="from-[#146450] via-[#1a9d7c] to-[#146450]"
                    underlineHeight="h-[6px] md:h-[8px]"
                    underlineOffset="-bottom-4"
                    delay={0.2}
                    duration={0.05} // Increased speed
                />
            </div>
        </div>

        {/* Description Box - See-through with translucent text */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }} // Faster entrance
            className="relative z-30 -mt-16 max-w-3xl mx-4"
        >
            <div className="gloss-box p-6 md:p-8 rounded-2xl text-center backdrop-blur-[2px] bg-white/5 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
                <p className="text-sm md:text-lg text-slate-900/60 font-mono leading-relaxed tracking-normal font-medium mix-blend-hard-light">
                  We are a content studio building modern media brands. We create platform-native content across travel, lifestyle, digital publishing, and animation—designed to connect brands with real audiences built for attention and conversion.
                </p>
            </div>
        </motion.div>
      </div>

      {/* Buttons */}
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 2.0, duration: 0.5 }} // Faster entrance
         className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center gap-8 mb-20"
      >
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[150%] opacity-30 pointer-events-none -z-10">
              <SchematicGlobe />
          </div>

          <div className="flex justify-center w-full mt-4">
             {/* Main Start Campaign Button Centered */}
             <TechButton href="#campaign-showcase" variant="primary" icon={<Globe size={18} />}>Start Campaign</TechButton>
          </div>
      </motion.div>

      {/* Plane 2: Interactive Animation (Bottom) */}
      <div className="w-full relative z-10 flex justify-center px-4">
           <div className="w-full max-w-6xl transform hover:scale-[1.01] transition-transform duration-500">
              <WorkflowAnimation />
           </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-30 hidden lg:block">
        <ArrowDown size={16} className="text-slate-400" />
      </div>

      <style>{`
        /* Styles from prompt */
        .hero-container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
        }

        .shader-box {
            position: relative;
            width: 100%;
            height: 450px; /* Taller to accommodate big text */
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 60px rgba(20, 100, 80, 0.15);
        }

        .shader-container {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        .shader-container canvas {
            display: block;
            width: 100%;
            height: 100%;
        }

        .title-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            padding: 0 2rem;
        }

        .system-online {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 8px 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50px;
            font-family: 'DM Mono', monospace;
            font-size: 0.7rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #146450;
            font-weight: 400;
            backdrop-filter: blur(10px);
            min-width: 160px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background: #1a9d7c;
            border-radius: 50%;
            animation: pulse 1.5s ease-in-out infinite; /* Faster pulse */
        }

        /* Loading Dots Animation */
        .loading-dots::after {
            content: '.';
            animation: dots 1s steps(1, end) infinite; /* Faster dots */
            display: inline-block;
            width: 0;
        }
        
        @keyframes dots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60%, 100% { content: '...'; }
        }

        /* Text Shimmer Gradient Animation */
        @keyframes text-shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
        .animate-text-shimmer {
            animation: text-shimmer 3s linear infinite; /* Faster shimmer */
        }
        
        /* 3D Gloss Box Effect */
        .gloss-box {
            background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%);
            box-shadow: 
                0 10px 30px -10px rgba(0,0,0,0.1), 
                inset 0 0 0 1px rgba(255,255,255,0.5),
                inset 0 0 20px rgba(255,255,255,0.5);
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.6;
                transform: scale(1.2);
            }
        }

        @media (max-width: 768px) {
            .shader-box {
                height: 350px;
            }

            .system-online {
                font-size: 0.6rem;
                padding: 6px 16px;
                margin-bottom: 1.5rem;
            }
        }
      `}</style>
    </div>
  );
};