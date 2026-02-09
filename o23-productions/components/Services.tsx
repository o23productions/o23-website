import React, { useState } from 'react';
import { Send, CheckCircle, ChevronLeft, ChevronRight, Scan, AlertTriangle, Check, Zap, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeDPhotoCarousel, MediaItem } from './ThreeDPhotoCarousel';

const PORTFOLIO_ITEMS: MediaItem[] = [
  { 
    type: 'video', 
    url: 'https://i.imgur.com/2SAPD9M.mp4', 
    alt: 'Nxt Find Reel',
    link: 'https://www.tiktok.com/@nxt.find/video/7586698085976263950'
  },
  { 
    type: 'video', 
    url: 'https://i.imgur.com/wY6bJgG.mp4', 
    alt: 'ItzEvelyn Reel',
    link: 'https://www.tiktok.com/@e.dreamy/video/7600922347649977630?is_from_webapp=1&sender_device=pc'
  },
  { type: 'video', url: 'https://i.imgur.com/eHGADoC.mp4', alt: 'Portfolio Video 3' },
  { 
    type: 'image', 
    url: 'https://i.imgur.com/vjE2Ve3.png', 
    alt: 'Portfolio 4',
    link: 'https://www.instagram.com/p/DKX9vphRtb6/'
  },
  { type: 'video', url: 'https://i.imgur.com/ZaA2TBx.mp4', alt: 'Portfolio Video 4' },
  { type: 'image', url: 'https://i.imgur.com/jA7f4hd.png', alt: 'Portfolio 5' },
  { type: 'video', url: 'https://i.imgur.com/81LBodP.mp4', alt: 'Portfolio Video 5b' },
  { type: 'image', url: 'https://i.imgur.com/rA8OxXP.png', alt: 'Portfolio 6' },
  { type: 'image', url: 'https://i.imgur.com/tzsfqYt.png', alt: 'Portfolio 7' },
];

// --- Form Data Options ---
const GOAL_OPTIONS = [
  { id: 'awareness_reach', label: 'Awareness' },
  { id: 'traffic_clicks', label: 'Traffic' },
  { id: 'conversions_sales', label: 'Conversions' },
  { id: 'ugc_asset_library', label: 'Content Assets' },
];

const PLATFORM_OPTIONS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube_shorts', label: 'YouTube' },
  { id: 'facebook', label: 'Facebook' },
];

const NETWORK_CATEGORIES = [
  { 
    id: 'PUB', 
    label: 'Publishing', 
    theme: 'amber',
    headerColor: 'text-amber-700',
    brands: [
      { id: 'positivity', label: 'Positivity Rec.' },
      { id: 'o23eco', label: 'O23 EcoTech' },
      { id: 'fur', label: 'Fur The Plot' }
    ]
  },
  { 
    id: 'IRL', 
    label: 'IRL', 
    theme: 'sky',
    headerColor: 'text-sky-700',
    brands: [
      { id: 'nxt', label: 'Nxt Find' },
      { id: 'evelyn', label: 'ItzEvelyn' }
    ]
  },
  { 
    id: 'ANI', 
    label: 'AI Animation', 
    theme: 'purple',
    headerColor: 'text-purple-700',
    brands: [
      { id: 'yuna', label: 'Yuna Yoonyo' },
      { id: 'uncomfy', label: 'Kinda Uncomfy' },
      { id: 'ghxst', label: 'Studio Ghxst' },
      { id: 'healthy', label: 'Something Healthy' }
    ]
  }
];

const BUDGET_OPTIONS = [
  { id: '500_1000', label: '$500 - $1k' },
  { id: '1000_3000', label: '$1k - $3k' },
  { id: '3000_7000', label: '$3k - $7k' },
  { id: '7000_plus', label: '$7k+' },
];

const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'Launch ASAP' },
  { id: '2_4_weeks', label: '2-4 Weeks' },
  { id: '1_2_months', label: '1-2 Months' },
  { id: 'flexible', label: 'Flexible' },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15
    }
  }
};

export const Services: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    goals: [] as string[],
    platforms: [] as string[],
    networks: [] as string[],
    budget_range: '',
    timeline: 'asap',
    brand_name: '',
    contact_name: '',
    contact_email: '',
    website_or_link: '',
    campaign_brief: '',
    acknowledge_fit_policy: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Handlers ---

  const handleCheckboxChange = (field: 'goals' | 'platforms', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSelectAll = (field: 'goals' | 'platforms') => {
    const options = field === 'goals' ? GOAL_OPTIONS : PLATFORM_OPTIONS;
    const current = formData[field];
    
    if (current.length === options.length) {
        setFormData(prev => ({ ...prev, [field]: [] }));
    } else {
        setFormData(prev => ({ ...prev, [field]: options.map(o => o.id) }));
    }
  };

  const handleSelectAllNetworks = () => {
    const allBrandIds = NETWORK_CATEGORIES.flatMap(cat => cat.brands.map(b => b.id));
    const allSelected = allBrandIds.every(id => formData.networks.includes(id));

    if (allSelected) {
      setFormData(prev => ({ ...prev, networks: [] }));
    } else {
      setFormData(prev => ({ ...prev, networks: allBrandIds }));
    }
  };

  const handleNetworkCategoryToggle = (category: typeof NETWORK_CATEGORIES[0]) => {
    const brandIds = category.brands.map(b => b.id);
    const allSelected = brandIds.every(id => formData.networks.includes(id));
    
    let newNetworks = [...formData.networks];
    if (allSelected) {
        newNetworks = newNetworks.filter(id => !brandIds.includes(id));
    } else {
        const toAdd = brandIds.filter(id => !newNetworks.includes(id));
        newNetworks = [...newNetworks, ...toAdd];
    }
    setFormData(prev => ({ ...prev, networks: newNetworks }));
  };

  const handleNetworkBrandToggle = (brandId: string) => {
     setFormData(prev => {
         const current = prev.networks;
         return {
             ...prev,
             networks: current.includes(brandId) 
                ? current.filter(id => id !== brandId)
                : [...current, brandId]
         };
     });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && name === 'acknowledge_fit_policy') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBudgetChange = (value: string) => {
    setFormData(prev => ({ ...prev, budget_range: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("Goals", formData.goals.join(", "));
    data.append("Platforms", formData.platforms.join(", "));
    data.append("Networks", formData.networks.join(", "));
    data.append("Budget", formData.budget_range);
    data.append("Timeline", formData.timeline);
    data.append("Brand", formData.brand_name);
    data.append("Website", formData.website_or_link);
    data.append("Contact Name", formData.contact_name);
    data.append("Email", formData.contact_email);
    data.append("Brief", formData.campaign_brief);
    data.append("Submission Date", new Date().toLocaleString());

    const SCRIPT_URL = "INSERT_YOUR_WEB_APP_URL_HERE"; 

    if (SCRIPT_URL === "INSERT_YOUR_WEB_APP_URL_HERE") {
        console.warn("GOOGLE SHEET NOT CONNECTED");
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
        return;
    }

    fetch(SCRIPT_URL, {
        method: "POST",
        body: data,
        mode: "no-cors" 
    })
    .then(() => {
        setLoading(false);
        setSubmitted(true);
    })
    .catch((error) => {
        console.error("Submission Error:", error);
        setLoading(false);
        setSubmitted(true);
    });
  };

  const getPillarButtonStyles = (theme: string, isSelected: boolean) => {
    const base = "w-full relative px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wide transition-all duration-100 ease-out border-b-4 active:border-b-0 active:translate-y-1 active:mt-1 text-left flex items-center justify-between group";
    
    if (!isSelected) {
        return `${base} bg-white border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300`;
    }

    switch (theme) {
        case 'amber':
            return `${base} bg-amber-400 border-amber-600 text-amber-900 shadow-[0_2px_10px_rgba(251,191,36,0.3)]`;
        case 'sky':
            return `${base} bg-sky-400 border-sky-600 text-sky-900 shadow-[0_2px_10px_rgba(56,189,248,0.3)]`;
        case 'purple':
            return `${base} bg-purple-400 border-purple-600 text-purple-900 shadow-[0_2px_10px_rgba(192,132,252,0.3)]`;
        default:
            return `${base} bg-slate-800 border-slate-950 text-white`;
    }
  };

  const getColumnStyles = (theme: string) => {
    const base = "flex flex-col gap-4 p-5 rounded-2xl border-2 transition-all duration-300";
    switch (theme) {
        case 'amber': return `${base} bg-amber-50/50 border-amber-100 hover:border-amber-200`;
        case 'sky': return `${base} bg-sky-50/50 border-sky-100 hover:border-sky-200`;
        case 'purple': return `${base} bg-purple-50/50 border-purple-100 hover:border-purple-200`;
        default: return `${base} bg-slate-50 border-slate-100`;
    }
  };

  const allBrandIds = NETWORK_CATEGORIES.flatMap(cat => cat.brands.map(b => b.id));
  const isAllNetworksSelected = allBrandIds.every(id => formData.networks.includes(id)) && allBrandIds.length > 0;

  return (
    <section id="campaign-showcase" className="pt-20 pb-24 relative bg-[#f0f4f3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="font-mono text-xs text-[#146450] font-bold uppercase tracking-widest border border-[#146450]/20 bg-[#146450]/5 px-3 py-1.5 rounded-full">The Network</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tighter text-slate-900 sm:text-6xl font-sans">
            SELECT CAMPAIGN
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl font-mono">
             // BROWSE PORTFOLIO. DRAG TO ROTATE.
          </p>
        </div>

        {/* 3D Showcase Carousel */}
        <div className="mb-32">
            <ThreeDPhotoCarousel mediaItems={PORTFOLIO_ITEMS} />
        </div>

        {/* --- MINIMALIST 3D FORM --- */}
        <div id="campaign-intake" className="max-w-[800px] mx-auto relative z-10 scroll-mt-32">
            {!submitted ? (
              <motion.form 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                onSubmit={handleSubmit} 
                className="space-y-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white relative"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                {/* Header - Bigger Configure Campaign Banner */}
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-100/50 border border-slate-200 text-slate-600 font-mono text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                       <Zap size={16} className="text-emerald-600" fill="currentColor" />
                       CONFIGURE CAMPAIGN
                    </div>
                </motion.div>

                {/* Section 1: Network Access (Moved to Top) */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="flex justify-between items-end pl-1 pr-1 border-b border-slate-100 pb-2">
                        <label className="text-slate-400 font-mono text-xs font-bold uppercase tracking-widest">NETWORK ACCESS</label>
                        <button 
                            type="button"
                            onClick={handleSelectAllNetworks}
                            className="text-[10px] font-mono font-bold text-emerald-600 hover:text-emerald-500 uppercase tracking-widest transition-colors"
                        >
                            {isAllNetworksSelected ? '[DESELECT ALL]' : '[SELECT ALL PROPERTIES]'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {NETWORK_CATEGORIES.map((cat) => {
                            const catBrandIds = cat.brands.map(b => b.id);
                            const selectedCount = cat.brands.filter(b => formData.networks.includes(b.id)).length;
                            const isAllSelected = selectedCount === cat.brands.length;
                            const isSomeSelected = selectedCount > 0;

                            return (
                                <div key={cat.id} className={getColumnStyles(cat.theme)}>
                                    {/* Category Header Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleNetworkCategoryToggle(cat)}
                                        className={`
                                            w-full flex items-center justify-between gap-2 px-1 py-1 rounded-lg 
                                            font-mono text-xs font-bold uppercase tracking-wide transition-all
                                            border border-transparent group mb-2
                                            ${isAllSelected ? cat.headerColor : 'text-slate-500 hover:text-slate-800'}
                                        `}
                                    >
                                        <span>{cat.label}</span>
                                        <div className={`
                                            w-5 h-5 rounded border flex items-center justify-center transition-all
                                            ${isAllSelected ? 'bg-current border-current text-white' : 'border-slate-300 bg-white group-hover:border-slate-400'}
                                        `}>
                                            {isAllSelected && <Check size={12} strokeWidth={4} />}
                                            {!isAllSelected && isSomeSelected && <div className="w-2.5 h-2.5 bg-slate-400 rounded-sm" />}
                                        </div>
                                    </button>

                                    {/* Brands List - Vertical Column */}
                                    <div className="flex flex-col gap-3">
                                        {cat.brands.map(brand => {
                                            const isSelected = formData.networks.includes(brand.id);
                                            return (
                                                <motion.button
                                                    key={brand.id}
                                                    type="button"
                                                    onClick={() => handleNetworkBrandToggle(brand.id)}
                                                    className={getPillarButtonStyles(cat.theme, isSelected)}
                                                >
                                                    <span className="z-10 relative">{brand.label}</span>
                                                    {isSelected && <Check size={14} className="z-10 relative opacity-50" />}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Section 2: Goals */}
                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                    <div className="flex justify-between items-end pl-1 pr-1">
                        <label className="text-slate-400 font-mono text-xs font-bold uppercase tracking-widest">KEY OBJECTIVES</label>
                        <button 
                            type="button" 
                            onClick={() => handleSelectAll('goals')}
                            className="text-[10px] font-mono font-bold text-emerald-600 hover:text-emerald-500 uppercase tracking-widest transition-colors"
                        >
                            {formData.goals.length === GOAL_OPTIONS.length ? '[DESELECT ALL]' : '[SELECT ALL]'}
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {GOAL_OPTIONS.map((goal) => {
                            const isSelected = formData.goals.includes(goal.id);
                            return (
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 2 }}
                                    key={goal.id}
                                    type="button"
                                    onClick={() => handleCheckboxChange('goals', goal.id)}
                                    className={`
                                        relative px-6 py-3 rounded-xl font-mono text-sm font-bold uppercase tracking-wide transition-all duration-200 select-none border-2
                                        ${isSelected 
                                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)]' 
                                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-white shadow-[0_4px_0_0_#e2e8f0]'
                                        }
                                    `}
                                >
                                    {goal.label}
                                </motion.button>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Section 3: Platforms */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex justify-between items-end pl-1 pr-1">
                        <label className="text-slate-400 font-mono text-xs font-bold uppercase tracking-widest">SELECT CHANNELS</label>
                        <button 
                            type="button" 
                            onClick={() => handleSelectAll('platforms')}
                            className="text-[10px] font-mono font-bold text-emerald-600 hover:text-emerald-500 uppercase tracking-widest transition-colors"
                        >
                            {formData.platforms.length === PLATFORM_OPTIONS.length ? '[DESELECT ALL]' : '[SELECT ALL]'}
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {PLATFORM_OPTIONS.map((platform) => {
                            const isSelected = formData.platforms.includes(platform.id);
                            return (
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 2 }}
                                    key={platform.id}
                                    type="button"
                                    onClick={() => handleCheckboxChange('platforms', platform.id)}
                                    className={`
                                        relative px-6 py-3 rounded-xl font-mono text-sm font-bold uppercase tracking-wide transition-all duration-200 select-none border-2
                                        ${isSelected 
                                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)]' 
                                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-white shadow-[0_4px_0_0_#e2e8f0]'
                                        }
                                    `}
                                >
                                    {platform.label}
                                </motion.button>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Section 4: Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants} className="space-y-4">
                        <label className="block text-slate-400 font-mono text-xs font-bold uppercase tracking-widest ml-1">Budget Allocation</label>
                        <div className="grid grid-cols-2 gap-3">
                            {BUDGET_OPTIONS.map((option) => {
                                const isSelected = formData.budget_range === option.id;
                                return (
                                    <motion.div 
                                        whileHover={{ y: -2 }}
                                        whileTap={{ y: 1 }}
                                        key={option.id}
                                        onClick={() => handleBudgetChange(option.id)}
                                        className={`
                                            cursor-pointer p-4 rounded-xl border-2 text-center transition-all duration-200
                                            ${isSelected 
                                                ? 'bg-emerald-50 border-emerald-500 shadow-[0_4px_0_0_#10b981]' 
                                                : 'bg-white border-slate-200 hover:border-emerald-200 shadow-[0_4px_0_0_#e2e8f0]'
                                            }
                                        `}
                                    >
                                        <span className={`font-mono text-sm font-bold ${isSelected ? 'text-emerald-700' : 'text-slate-600'}`}>{option.label}</span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-4">
                         <label className="block text-slate-400 font-mono text-xs font-bold uppercase tracking-widest ml-1">TIMELINE</label>
                         <div className="relative group">
                            <select 
                                name="timeline" 
                                value={formData.timeline}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-slate-50 hover:bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-mono text-sm font-bold focus:outline-none focus:border-emerald-500 focus:bg-white appearance-none transition-all shadow-sm cursor-pointer"
                            >
                                {TIMELINE_OPTIONS.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
                                <ChevronRight size={18} className="rotate-90" />
                            </div>
                         </div>
                    </motion.div>
                </div>

                {/* Section 5: Details */}
                <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider ml-1">BRAND</label>
                            <input 
                                required
                                name="brand_name"
                                value={formData.brand_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Brand Name"
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all font-sans font-medium text-slate-900 placeholder-slate-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider ml-1">WEBSITE</label>
                            <input 
                                required
                                name="website_or_link"
                                value={formData.website_or_link}
                                onChange={handleInputChange}
                                type="url"
                                placeholder="Website URL"
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all font-sans font-medium text-slate-900 placeholder-slate-300"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider ml-1">CONTACT NAME</label>
                            <input 
                                required
                                name="contact_name"
                                value={formData.contact_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all font-sans font-medium text-slate-900 placeholder-slate-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider ml-1">EMAIL</label>
                            <input 
                                required
                                name="contact_email"
                                value={formData.contact_email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="Work Email"
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all font-sans font-medium text-slate-900 placeholder-slate-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider ml-1">REQUEST GOALS</label>
                         <textarea 
                            required
                            name="campaign_brief"
                            value={formData.campaign_brief}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Describe your product, target audience, and what success looks like..."
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all font-sans font-medium text-slate-900 resize-none placeholder-slate-300"
                         />
                    </div>
                </motion.div>

                {/* Section 6: Disclaimer & Submit */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
                        <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 font-mono leading-relaxed">
                            <span className="font-bold">SYSTEM NOTICE:</span> To ensure the highest authentic conversions, we selectively partner with brands based on shared values and network relevancy. Submission does not guarantee acceptance.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 pl-1">
                        <input 
                            required
                            type="checkbox"
                            name="acknowledge_fit_policy"
                            checked={formData.acknowledge_fit_policy}
                            onChange={handleInputChange}
                            id="ack"
                            className="w-5 h-5 accent-emerald-600 cursor-pointer rounded bg-slate-200 border-slate-300"
                        />
                        <label htmlFor="ack" className="text-xs text-slate-500 font-mono font-bold uppercase cursor-pointer select-none hover:text-emerald-600 transition-colors">
                            I ACKNOWLEDGE
                        </label>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.99, y: 2 }}
                        type="submit"
                        disabled={loading}
                        className="w-full relative group overflow-hidden bg-[#010a09] text-white rounded-2xl p-6 shadow-[0_10px_20px_-5px_rgba(15,23,42,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] transition-all duration-300 border-b-4 border-black active:border-b-0 active:translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex items-center justify-center gap-3">
                            <span className="font-mono text-xl font-bold uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all">
                                {loading ? 'INITIALIZING...' : 'SUBMIT REQUEST'}
                            </span>
                            {!loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        </div>
                    </motion.button>
                </motion.div>

              </motion.form>
            ) : (
                <div className="py-24 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 bg-white rounded-[2.5rem] shadow-2xl p-12 border border-slate-100">
                    <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-8 relative">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-50"></div>
                        <Check size={48} className="text-emerald-500 relative z-10" strokeWidth={3} />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 font-mono uppercase tracking-tighter mb-4">Transmission Complete</h3>
                    <p className="text-slate-500 font-sans text-xl max-w-md mx-auto leading-relaxed">
                        Your campaign parameters have been logged. Our network specialists will analyze the brief and establish contact within 24-48 hours.
                    </p>
                </div>
            )}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
};