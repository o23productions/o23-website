import React from 'react';
import { Users, Globe2, Briefcase } from 'lucide-react';
import { Metric } from '../types';
import { cn } from '../lib/utils';

const metrics: Metric[] = [
  { label: 'Total Following', value: '300K+', trend: 'up' },
  { label: 'Monthly Reach', value: '100M+', trend: 'up' },
  { label: 'Brand Partners', value: '20+', trend: 'neutral' },
];

const brands = [
  { 
    name: "Unagi Scooters", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUiHhpjTO3Ufi3RYbdtKw-H_n6QhhDz7yYoA&s",
    className: "object-cover group-hover:scale-110"
  },
  { 
    name: "BitDefender", 
    logo: "https://static.vecteezy.com/system/resources/previews/060/100/918/non_2x/bitdefender-logo-square-rounded-bitdefender-logo-bitdefender-logo-free-download-free-png.png",
    className: "object-cover scale-[1.35] group-hover:scale-[1.45]" // Stretched to corners
  },
  { 
    name: "Higgsfield AI", 
    logo: "https://pbs.twimg.com/profile_images/1906739239183630336/907a7JTU_400x400.jpg",
    className: "object-cover group-hover:scale-110"
  },
  { 
    name: "Moss Pure", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREZx8RPKGsHpIcbpVjw3eJlxgHQBd2QgXRwg&s",
    className: "object-cover group-hover:scale-110"
  },
  { 
    name: "Lark", 
    logo: "https://d7umqicpi7263.cloudfront.net/img/product/4c038c80-f89a-45c3-9ebd-8f8e2306c18a.png",
    className: "object-contain p-3 group-hover:scale-110" // Reduced padding to make logo bigger
  },
  { 
    name: "Organic Basics", 
    logo: "https://image.mux.com/rItAISRJOs3LDZwhR1STOd7WoWzzV8OdbPzquMYvxT8/thumbnail.jpg?time=0",
    className: "object-cover group-hover:scale-110"
  },
  { 
    name: "Merit Beauty", 
    logo: "https://aruliden.com/wp-content/uploads/2021/01/Merit_Logo-1100x620.jpg",
    className: "object-cover group-hover:scale-110"
  },
];

export const Stats: React.FC = () => {
  return (
    <div id="stats" className="w-full bg-white border-y border-slate-200 py-16 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-50/50 backdrop-blur-sm overflow-hidden shadow-sm border border-slate-200 rounded-2xl p-8 relative group hover:border-emerald-500/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {index === 0 && <Users size={48} className="text-slate-900" />}
                {index === 1 && <Globe2 size={48} className="text-emerald-600" />}
                {index === 2 && <Briefcase size={48} className="text-slate-900" />}
              </div>
              <dt className="text-xs font-bold text-slate-400 font-mono uppercase tracking-[0.2em] mb-2">
                {metric.label}
              </dt>
              <dd className={`font-bold font-sans tracking-tight transition-all duration-300 ${
                  index === 1 
                  ? 'text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-700 drop-shadow-sm scale-105 origin-left' 
                  : 'text-4xl sm:text-5xl text-slate-900'
              }`}>
                {metric.value}
              </dd>
              <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 font-mono tracking-wide bg-emerald-50 w-fit px-2 py-1 rounded-full border border-emerald-100">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                LIVE METRICS
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Scrolling Section */}
      <div className="w-full relative">
         <div className="text-center mb-10">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] border-b border-slate-200 pb-2">Collaborators & Sponsors</span>
         </div>
         
         <div className="relative w-full overflow-hidden mask-fade py-8">
             {/* Left Fade */}
             <div className="absolute left-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
             {/* Right Fade */}
             <div className="absolute right-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
               {/* Loop 1 */}
               <div className="flex items-start gap-12 px-4">
                  {brands.map((brand, i) => (
                      <div 
                        key={`b1-${i}`} 
                        className="group relative cursor-pointer flex flex-col items-center gap-4"
                        style={{ animation: `float ${4 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
                      >
                         <div className="
                            w-28 h-28 sm:w-32 sm:h-32 
                            rounded-[1.75rem] bg-white 
                            shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] 
                            border border-slate-100
                            flex items-center justify-center
                            transition-all duration-500 ease-out
                            group-hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]
                            group-hover:border-emerald-300/50
                            group-hover:-translate-y-2
                            overflow-hidden
                            relative
                         ">
                             {/* Inner Gloss for 3D effect */}
                             <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none z-10"></div>
                             
                             <img 
                               src={brand.logo} 
                               alt={brand.name} 
                               className={cn(
                                 "w-full h-full transform transition-transform duration-700",
                                 brand.className
                               )}
                             />
                         </div>
                         <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest group-hover:text-emerald-600 transition-colors text-center max-w-[140px] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            {brand.name}
                         </span>
                      </div>
                  ))}
               </div>
               {/* Loop 2 */}
               <div className="flex items-start gap-12 px-4 pl-12">
                  {brands.map((brand, i) => (
                      <div 
                        key={`b2-${i}`} 
                        className="group relative cursor-pointer flex flex-col items-center gap-4"
                        style={{ animation: `float ${4 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
                      >
                         <div className="
                            w-28 h-28 sm:w-32 sm:h-32 
                            rounded-[1.75rem] bg-white 
                            shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] 
                            border border-slate-100
                            flex items-center justify-center
                            transition-all duration-500 ease-out
                            group-hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]
                            group-hover:border-emerald-300/50
                            group-hover:-translate-y-2
                            overflow-hidden
                            relative
                         ">
                             {/* Inner Gloss for 3D effect */}
                             <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none z-10"></div>
                             
                             <img 
                               src={brand.logo} 
                               alt={brand.name} 
                               className={cn(
                                 "w-full h-full transform transition-transform duration-700",
                                 brand.className
                               )}
                             />
                         </div>
                         <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest group-hover:text-emerald-600 transition-colors text-center max-w-[140px] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            {brand.name}
                         </span>
                      </div>
                  ))}
               </div>
               {/* Loop 3 */}
               <div className="flex items-start gap-12 px-4 pl-12">
                  {brands.map((brand, i) => (
                      <div 
                        key={`b3-${i}`} 
                        className="group relative cursor-pointer flex flex-col items-center gap-4"
                        style={{ animation: `float ${4 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
                      >
                         <div className="
                            w-28 h-28 sm:w-32 sm:h-32 
                            rounded-[1.75rem] bg-white 
                            shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] 
                            border border-slate-100
                            flex items-center justify-center
                            transition-all duration-500 ease-out
                            group-hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]
                            group-hover:border-emerald-300/50
                            group-hover:-translate-y-2
                            overflow-hidden
                            relative
                         ">
                             {/* Inner Gloss for 3D effect */}
                             <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none z-10"></div>
                             
                             <img 
                               src={brand.logo} 
                               alt={brand.name} 
                               className={cn(
                                 "w-full h-full transform transition-transform duration-700",
                                 brand.className
                               )}
                             />
                         </div>
                         <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest group-hover:text-emerald-600 transition-colors text-center max-w-[140px] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            {brand.name}
                         </span>
                      </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <style>{`
        .mask-fade {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-33.33%); } /* Adjusted for 3 loops */
        }

        .animate-marquee {
            animation: marquee 60s linear infinite; /* Slower scroll for elegance */
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};