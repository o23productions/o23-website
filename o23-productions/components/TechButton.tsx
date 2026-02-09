import React from 'react';
import { Loader2 } from 'lucide-react';

interface TechButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
}

export const TechButton: React.FC<TechButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon,
  iconPosition = 'left',
  className = '',
  href,
  onClick,
  ...props 
}) => {
  // 3D Jelly Cube Design - Light Theme Adaptation
  
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2 
    px-8 py-4 
    font-mono font-bold text-sm tracking-wider uppercase 
    transition-all duration-200 cubic-bezier(0.25, 0.46, 0.45, 0.94)
    rounded-2xl
    focus:outline-none focus:ring-4 focus:ring-emerald-500/30
    select-none overflow-visible
    group
    active:translate-y-[8px]
    cursor-pointer
  `;
  
  const variants = {
    // Green Jelly (Primary Action)
    primary: `
      bg-gradient-to-b from-[#146450] to-[#0f4d3d]
      text-white
      shadow-[0_8px_0_0_#052e24,0_15px_20px_rgba(20,100,80,0.3),inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-4px_0_rgba(0,0,0,0.2)]
      active:shadow-[0_0_0_0_#052e24,0_0_0_rgba(0,0,0,0),inset_0_2px_0_rgba(255,255,255,0.2)]
      hover:brightness-110 border-none
    `,
    // White/Silver Jelly (Secondary)
    secondary: `
      bg-gradient-to-b from-white to-slate-100
      text-slate-800
      shadow-[0_8px_0_0_#cbd5e1,0_15px_20px_rgba(148,163,184,0.15),inset_0_2px_0_rgba(255,255,255,1)]
      active:shadow-[0_0_0_0_#cbd5e1,0_0_0_rgba(0,0,0,0),inset_0_2px_0_rgba(255,255,255,1)]
      hover:bg-slate-50 border border-slate-100
    `,
    // Dark Navy Jelly (Accent/Brand)
    accent: `
      bg-gradient-to-b from-slate-700 to-slate-900
      text-white
      shadow-[0_8px_0_0_#0f172a,0_15px_20px_rgba(15,23,42,0.4),inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-4px_0_rgba(0,0,0,0.2)]
      active:shadow-[0_0_0_0_#0f172a,0_0_0_rgba(0,0,0,0),inset_0_2px_0_rgba(255,255,255,0.2)]
      hover:brightness-105 border-none
    `,
    // Flat ghost button
    ghost: `
      bg-transparent text-slate-600 
      shadow-none 
      hover:bg-slate-100 
      hover:text-slate-900
      !px-4 !py-2 !rounded-lg
      active:translate-y-0 active:scale-95
    `
  };

  const is3D = variant !== 'ghost';

  const content = (
    <>
      {/* Jelly Gloss Overlay */}
      {is3D && (
        <div className="absolute top-1 left-1 right-1 h-[45%] bg-gradient-to-b from-white/40 to-transparent rounded-t-[12px] pointer-events-none mix-blend-overlay" />
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
        {isLoading && <Loader2 className="animate-spin" size={16} />}
        {!isLoading && iconPosition === 'left' && icon}
        {children}
        {!isLoading && iconPosition === 'right' && icon}
      </span>
    </>
  );

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`.trim().replace(/\s+/g, ' ');

  // Smooth Scroll Handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e as any);
    }
    
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        // Offset for fixed header (approx 100px)
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        window.history.pushState(null, '', href);
      }
    }
  };

  if (href) {
    return (
      <a href={href} className={combinedClassName} onClick={handleScroll}>
        {content}
      </a>
    );
  }

  return (
    <button 
      className={combinedClassName}
      disabled={isLoading || props.disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};