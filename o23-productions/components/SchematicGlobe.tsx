import React from 'react';

export const SchematicGlobe: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none -z-10 opacity-100">
      <div className="relative w-full h-full animate-spin-slow preserve-3d will-change-transform">
        {/* Core Glow - Simplified blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-300/10 rounded-full blur-2xl transform translate-z-0"></div>
        
        {/* Longitudinal Rings - Reduced opacity for better compositing */}
        {[...Array(4)].map((_, i) => ( // Reduced ring count from 6 to 4
          <div 
            key={`long-${i}`}
            className="absolute inset-0 border border-emerald-500/30 rounded-full"
            style={{ 
              transform: `rotateY(${i * 45}deg)`,
            }}
          />
        ))}

        {/* Latitudinal Rings */}
        <div className="absolute inset-[15%] border border-green-500/30 rounded-full transform rotate-x-65"></div>
        <div className="absolute inset-[35%] border border-green-500/30 rounded-full transform rotate-x-65"></div>
        
        {/* Orbital Particles - Removed heavy shadows */}
        <div className="absolute inset-0 animate-reverse-spin will-change-transform">
           <div className="absolute top-1/2 left-0 w-3 h-3 bg-emerald-600 rounded-full opacity-80"></div>
           <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-400 rounded-full opacity-80"></div>
           <div className="absolute bottom-[20%] right-[10%] w-1.5 h-1.5 bg-emerald-300 rounded-full opacity-80"></div>
        </div>
      </div>
      
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-x-65 { transform: rotateX(75deg); }
        .will-change-transform { will-change: transform; }
        /* Adjusted speeds */
        .animate-spin-slow { animation: spin 15s linear infinite; }
        .animate-reverse-spin { animation: spin 10s linear infinite reverse; }
        @keyframes spin {
          from { transform: rotateY(0deg) rotateX(20deg); }
          to { transform: rotateY(360deg) rotateX(20deg); }
        }
      `}</style>
    </div>
  );
};