import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { generateContentIdeas } from '../services/geminiService';
import { GeneratedIdea } from '../types';
import { TechButton } from './TechButton';

export const IdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    const results = await generateContentIdeas(topic);
    setIdeas(results);
    setLoading(false);
  };

  return (
    <div id="generator" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden scroll-mt-24">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-mono uppercase mb-4">
            <Sparkles size={12} />
            Powered by Gemini 3
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">Start the Engine</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Test our AI logic circuits. Enter a topic, and watch O23's factory generate actionable content concepts in real-time.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-16">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Sustainable Fashion, Crypto Trends..."
            className="flex-1 px-4 py-3 rounded-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono text-sm shadow-sm"
          />
          <div className="sm:w-auto w-full">
            <TechButton 
              type="submit" 
              isLoading={loading} 
              disabled={loading} 
              variant="accent"
              icon={<Send size={18} />}
              className="w-full sm:w-auto"
            >
              GENERATE
            </TechButton>
          </div>
        </form>

        {ideas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-sm hover:border-emerald-500/50 transition-colors shadow-lg">
                <div className="text-xs font-mono text-emerald-600 mb-2 uppercase tracking-wider">{idea.format}</div>
                <h3 className="text-lg font-bold mb-3 text-slate-900">{idea.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{idea.synopsis}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};