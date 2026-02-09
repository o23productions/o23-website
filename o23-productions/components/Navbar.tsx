import React from 'react';
import { Menu, X, MessageSquare, Zap } from 'lucide-react';
import { TechButton } from './TechButton';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* O23 Logo Representation: Circular frame matching brand with Green Glow */}
            <div className="relative w-10 h-10 rounded-full border-[3px] border-slate-900 bg-slate-900 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-transform group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.8)]">
                {/* Abstract texture to simulate the earth/globe look */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#fff_1px,transparent_1px)] bg-[length:3px_3px]"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent pointer-events-none"></div>
                <span className="font-sans font-black text-white text-xs tracking-tighter relative z-10">O23</span>
            </div>
            <span className="font-mono font-bold text-lg tracking-[0.2em] text-slate-900 group-hover:text-emerald-600 transition-colors">PROD.</span>
          </div>
          
          <div className="hidden md:flex space-x-4 items-center">
            {/* NEW BUTTON: HOW IT WORKS (Primary Green, Icon Right) */}
            <TechButton 
              href="#how-it-works" 
              variant="primary" 
              className="!px-6 !py-2 !text-xs" 
              icon={<Zap size={14} />}
              iconPosition="right"
            >
              HOW IT WORKS
            </TechButton>

            {/* PRIMARY CALL TO ACTION - SCROLLS TO CAMPAIGN FORM (Secondary White) */}
            <TechButton 
              href="#campaign-intake" 
              variant="secondary" 
              className="!px-6 !py-2 !text-xs border border-slate-200" 
              icon={<MessageSquare size={14} />}
            >
              TALK TO US
            </TechButton>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {/* Mobile HOW IT WORKS Button (Green, 3D, Icon Right) */}
            <TechButton 
              href="#how-it-works" 
              variant="primary" 
              className="w-full justify-center !py-3" 
              icon={<Zap size={16} />} 
              iconPosition="right"
              onClick={() => setIsOpen(false)}
            >
              HOW IT WORKS
            </TechButton>
            
            <div className="pt-2">
              <TechButton href="#campaign-intake" variant="secondary" className="w-full justify-center !py-3 border border-slate-200">TALK TO US</TechButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};