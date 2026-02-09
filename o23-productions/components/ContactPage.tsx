import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, CheckCircle, DollarSign, HelpCircle } from 'lucide-react';
import { TechButton } from './TechButton';

interface ContactPageProps {
  isCampaignMode?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isCampaignMode = false }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    reason: isCampaignMode ? 'Brand Partnership (Advertise)' : 'Select an option',
    details: '',
    budget: '$10k - $50k' // Default budget
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // NOTE: To connect to Google Sheets:
    // 1. Create a Google Sheet.
    // 2. Extensions > Apps Script.
    // 3. Create a doPost(e) function to appendRow.
    // 4. Deploy as Web App > Access: Anyone.
    // 5. Use fetch() to POST formData to that URL here.
    
    console.log("Form Data Submitted:", formData);

    // Simulate API network request
    setTimeout(() => {
        setIsLoading(false);
        setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar / Header */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <div className="relative w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-900">
                    <span className="font-sans font-black text-white text-[10px]">O23</span>
                 </div>
                 <span className="font-mono font-bold text-lg tracking-widest text-slate-900 hidden sm:block">
                    {isCampaignMode ? 'CAMPAIGN LAUNCH' : 'CONTACT'}
                 </span>
            </div>
            <a href="#home" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 font-mono text-sm uppercase group">
                <div className="p-2 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                    <ArrowLeft size={16} />
                </div>
                <span className="hidden sm:inline">Back to Base</span>
            </a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {!submitted ? (
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
                <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Lines Open
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-sans tracking-tight">
                            {isCampaignMode ? 'Initialize Campaign' : 'Talk to Us'}
                        </h1>
                        <p className="text-slate-300 text-lg max-w-lg leading-relaxed">
                            {isCampaignMode 
                                ? "Define your parameters. Our network is ready to amplify your brand message."
                                : "Ready to scale your content? Tell us about your project intent. Our neural networks are standing by."
                            }
                        </p>
                    </div>
                    {/* Abstract bg */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Name</label>
                            <input 
                                required 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans text-slate-900 placeholder-slate-400" 
                                placeholder="Your Name" 
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Company</label>
                            <input 
                                required 
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                type="text" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans text-slate-900 placeholder-slate-400" 
                                placeholder="Organization Name" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Email</label>
                            <input 
                                required 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans text-slate-900 placeholder-slate-400" 
                                placeholder="email@domain.com" 
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Phone (Optional)</label>
                            <input 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans text-slate-900 placeholder-slate-400" 
                                placeholder="+1 (555) 000-0000" 
                            />
                        </div>
                    </div>

                    {/* Inquiry Reason */}
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Reason for Inquiry</label>
                        <div className="relative">
                            <select 
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700 font-sans cursor-pointer appearance-none"
                            >
                                <option disabled>Select an option</option>
                                <option>Brand Partnership (Advertise)</option>
                                <option>Content Production Services</option>
                                <option>Join the Network (Creator)</option>
                                <option>Technical Inquiry</option>
                                <option>Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* Conditional "Other" Text Box */}
                    {formData.reason === 'Other' && (
                        <div className="space-y-2 group animate-fade-in-up">
                            <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">
                                Please specify details
                            </label>
                            <textarea 
                                required
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                rows={4} 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans text-slate-900 placeholder-slate-400 resize-none" 
                                placeholder="What's on your mind?..."
                            ></textarea>
                        </div>
                    )}

                    {/* Campaign Mode: Budget Dial */}
                    {isCampaignMode && (
                        <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in-up">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider flex items-center gap-2">
                                    <DollarSign size={14} className="text-emerald-500"/> Estimated Budget
                                </label>
                                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 font-mono">
                                    {formData.budget}
                                </span>
                            </div>
                            
                            <BudgetDial 
                                value={formData.budget} 
                                onChange={(val) => setFormData(prev => ({ ...prev, budget: val }))} 
                            />
                        </div>
                    )}

                    <div className="pt-6 flex items-center justify-between">
                        <p className="text-xs text-slate-400 hidden sm:block flex items-center gap-1">
                            <HelpCircle size={12} /> Secure Google Data Transmission
                        </p>
                        <TechButton type="submit" variant="primary" className="w-full sm:w-auto shadow-xl shadow-emerald-500/20" icon={<Send size={18} />} isLoading={isLoading}>
                            {isCampaignMode ? 'Launch Request' : 'Send Message'}
                        </TechButton>
                    </div>
                </form>
            </div>
        ) : (
            <div className="text-center py-20 animate-fade-in-up">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-emerald-50 shadow-xl">
                        <CheckCircle size={48} className="text-emerald-500" />
                    </div>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-4 font-sans">
                    {isCampaignMode ? 'Campaign Initialized' : 'Signal Received'}
                </h2>
                <p className="text-slate-600 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                    Your inquiry has been encrypted and logged in the O23 mainframe. A human specialist will establish a connection shortly.
                </p>
                <a href="#home" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-mono font-bold uppercase tracking-wider hover:bg-slate-800 transition-all hover:scale-105 shadow-lg">
                    <ArrowLeft size={18} /> Return to Base
                </a>
            </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

// Custom Budget Dial Component
const BudgetDial: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
    const options = ["< $10k", "$10k - $50k", "$50k - $100k", "$100k+"];
    
    return (
        <div className="relative w-full h-16 bg-slate-100 rounded-2xl p-1.5 flex items-center shadow-inner">
            {/* Background Track */}
            <div className="absolute left-2 right-2 h-1 bg-slate-200 rounded-full z-0 top-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 w-full flex justify-between">
                {options.map((option) => {
                    const isActive = value === option;
                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onChange(option)}
                            className={`
                                relative h-12 flex-1 mx-1 rounded-xl transition-all duration-300 font-mono text-xs font-bold
                                flex items-center justify-center
                                ${isActive 
                                    ? 'bg-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-emerald-700 border border-emerald-100 transform scale-105' 
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                }
                            `}
                        >
                            {option}
                            {/* LED Indicator */}
                            {isActive && (
                                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981]"></div>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};