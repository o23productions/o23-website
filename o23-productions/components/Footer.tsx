import React from 'react';
import { Cpu, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    // Matching the dark green background from Architecture section
    <footer className="bg-[#022c22] border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            href="https://www.linkedin.com/company/o23productions?trk=public_post_feed-actor-name" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-400 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin size={20} />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1 flex items-center justify-center md:justify-start gap-2">
          <Cpu size={16} className="text-emerald-800" />
          <p className="text-center text-base text-white font-mono">
            O23 Productions Est. in 2023.
          </p>
        </div>
      </div>
    </footer>
  );
};