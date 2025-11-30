import React, { useRef, useEffect } from 'react';
import { AnalysisResult, AppMode } from '../types';
import { Copy, TrendingUp, Hash, Eye, MessageSquare, AlertTriangle, Flame, Share2, Download, Twitter, Linkedin, MessageCircle, Sparkles, Zap } from 'lucide-react';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  mode: AppMode;
}

const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const seoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smoothly scroll the results into view when generated
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-emerald-400 to-green-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-600';
  };

  const fullStrategyContent = `HEADLINE:\n${result.strategy.headline}\n\nCAPTION:\n${result.strategy.caption}\n\nCTA:\n${result.strategy.cta}\n\nHASHTAGS:\n${result.seo.hashtags.broad.join(' ')} ${result.seo.hashtags.niche.join(' ')}`;

  const handleSmartShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SocialSEO Strategy',
          text: fullStrategyContent,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert("Native sharing is not supported on this browser.");
    }
    
    // Smooth scroll to SEO section after sharing logic
    if (seoRef.current) {
      seoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([fullStrategyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viral-strat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result.strategy.headline + '\n\n' + result.strategy.caption.substring(0, 200) + '...')}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullStrategyContent)}`;
  const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(result.strategy.headline)}`;

  return (
    <div ref={containerRef} className="space-y-6 animate-fade-in pb-12">
      
      {/* 1. HERO SCORE CARD - BENTO STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* SCORE */}
        <div className="md:col-span-5 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                 <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Virality Potential</h3>
                 {result.virality.trendDetected && (
                   <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center border border-orange-500/30 animate-pulse">
                     <Flame className="w-3 h-3 mr-1" /> TRENDING
                   </span>
                 )}
              </div>
              
              <div className="flex items-end mt-4">
                 <span className={`text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b ${getScoreColor(result.virality.score)}`}>
                   {result.virality.score}
                 </span>
                 <span className="text-2xl font-bold text-slate-600 mb-4 ml-2">/100</span>
              </div>

              <div className="mt-4 bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
                 <div className="flex items-center text-yellow-500 text-xs font-bold mb-1">
                   <AlertTriangle className="w-3 h-3 mr-2" />
                   GAP ANALYSIS
                 </div>
                 <p className="text-slate-400 text-xs leading-relaxed">
                   {result.virality.gapAnalysis}
                 </p>
              </div>
           </div>
        </div>

        {/* AUDIT & VIBE */}
        <div className="md:col-span-7 flex flex-col gap-4">
           
           {/* Visual Hook */}
           <div className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                 <div className="p-2 bg-pink-500/20 rounded-lg">
                   <Eye className="w-4 h-4 text-pink-400" />
                 </div>
                 <h3 className="text-sm font-bold text-white">The Hook</h3>
              </div>
              <div className="space-y-2">
                 <div className="text-lg font-bold text-slate-200">{result.visualAudit.hookIdentified}</div>
                 <div className="text-xs text-slate-400">{result.visualAudit.psychologyCheck}</div>
              </div>
           </div>

           {/* Competitor / Vibe */}
           <div className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
              {mode === AppMode.COMPETITOR_SPY && result.competitorInsights ? (
                 <>
                   <div className="flex items-center space-x-2 mb-3">
                     <div className="p-2 bg-cyan-500/20 rounded-lg">
                       <Zap className="w-4 h-4 text-cyan-400" />
                     </div>
                     <h3 className="text-sm font-bold text-white">Competitor DNA</h3>
                   </div>
                   <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                        <span className="block text-slate-500 font-bold mb-1">THEME</span>
                        {result.competitorInsights.visualTheme}
                      </div>
                      <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                        <span className="block text-slate-500 font-bold mb-1">FORMULA</span>
                        {result.competitorInsights.formula}
                      </div>
                   </div>
                 </>
              ) : (
                 <>
                   <div className="flex items-center space-x-2 mb-3">
                     <div className="p-2 bg-purple-500/20 rounded-lg">
                       <Sparkles className="w-4 h-4 text-purple-400" />
                     </div>
                     <h3 className="text-sm font-bold text-white">Vibe Check</h3>
                   </div>
                   <p className="text-slate-400 text-sm">
                      {result.virality.vibe || "Authentic, High-Energy, & Relatable"}
                   </p>
                 </>
              )}
           </div>
        </div>
      </div>

      {/* 2. THE STRATEGY - GLASS DOCUMENT STYLE */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[35px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 overflow-hidden">
          
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-indigo-400" />
                THE BLUEPRINT
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest">Generated via Andromeda Engine</p>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(result.strategy.caption)}
              className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
            >
              <Copy className="w-3 h-3 mr-2" /> COPY ALL
            </button>
          </div>

          <div className="grid gap-6">
             {/* HEADLINE */}
             <div className="relative">
               <span className="absolute -left-2 top-0 bottom-0 w-1 bg-indigo-500 rounded-full"></span>
               <div className="pl-4">
                 <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Overlay Text</span>
                 <p className="text-2xl md:text-3xl font-black text-white mt-1 leading-tight">{result.strategy.headline}</p>
               </div>
             </div>

             {/* CAPTION */}
             <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-4">Caption Script</span>
                <p className="text-slate-200 whitespace-pre-wrap leading-7 font-light">{result.strategy.caption}</p>
             </div>

             {/* CTA */}
             <div className="flex items-center justify-between bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-4 rounded-2xl">
                <span className="text-xs font-bold text-indigo-300">CALL TO ACTION</span>
                <span className="font-bold text-white">{result.strategy.cta}</span>
             </div>
          </div>

          {/* ACTION BAR */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
             <button 
               onClick={handleSmartShare}
               className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 flex items-center justify-center"
             >
               <Share2 className="w-4 h-4 mr-2" /> Share Strategy
             </button>
             
             <div className="flex gap-2">
               {[
                 { icon: MessageCircle, url: whatsappUrl, color: 'bg-green-500/20 text-green-400 hover:bg-green-500/30' },
                 { icon: Twitter, url: twitterUrl, color: 'bg-sky-500/20 text-sky-400 hover:bg-sky-500/30' },
                 { icon: Linkedin, url: linkedinUrl, color: 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' }
               ].map((btn, i) => (
                 <a 
                   key={i} 
                   href={btn.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`p-3 rounded-xl transition-all ${btn.color}`}
                 >
                   <btn.icon className="w-5 h-5" />
                 </a>
               ))}
               
               <button onClick={handleDownload} className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all">
                 <Download className="w-5 h-5" />
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* 3. SEO CLOUD */}
      <div ref={seoRef} className="bg-black/40 border border-slate-800/60 p-6 rounded-[32px]">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center">
            <Hash className="w-3 h-3 mr-2" /> SEO Injection
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
           {result.seo.hiddenKeywords?.map((k, i) => (
             <span key={i} className="text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800 px-3 py-1.5 rounded-lg hover:border-slate-600 transition-colors cursor-default">{k}</span>
           ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div>
             <span className="text-[10px] font-bold text-blue-400 uppercase">Broad</span>
             <p className="text-xs text-slate-400 mt-2 leading-relaxed">{result.seo.hashtags?.broad?.join(' ')}</p>
           </div>
           <div>
             <span className="text-[10px] font-bold text-indigo-400 uppercase">Niche</span>
             <p className="text-xs text-slate-400 mt-2 leading-relaxed">{result.seo.hashtags?.niche?.join(' ')}</p>
           </div>
           <div>
             <span className="text-[10px] font-bold text-pink-400 uppercase">Specific</span>
             <p className="text-xs text-slate-400 mt-2 leading-relaxed">{result.seo.hashtags?.specific?.join(' ')}</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AnalysisResultView;