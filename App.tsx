
import React, { useState, useEffect } from 'react';
import { AppMode, Platform, AnalysisResult, FileInput, TrendItem } from './types';
import { analyzeContent } from './services/geminiService';
import FileUpload from './components/FileUpload';
import AnalysisResultView from './components/AnalysisResultView';
import MasterclassGuide from './components/MasterclassGuide';
import { 
  Sparkles, 
  BrainCircuit, 
  Users, 
  ArrowRight, 
  Loader2, 
  Settings2,
  Instagram,
  Linkedin,
  Youtube,
  Music2,
  MapPin,
  Languages,
  Target,
  UserCheck,
  Zap,
  Cpu,
  Flame,
  Twitter,
  Facebook,
  Search,
  ShieldCheck,
  FileText,
  Key,
  Lock,
  Radio,
  Globe,
  BookOpen
} from 'lucide-react';

interface ConfigState {
  goal: string;
  style: string;
  keywords: string;
  originalText: string;
  geography: string;
  targetAudience: string;
  targetLanguage: string;
  demographics: string;
  brandGuidelines: string;
  niche: string;
}

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showGatekeeper, setShowGatekeeper] = useState<boolean>(true);
  const [tempKey, setTempKey] = useState<string>('');

  const [mode, setMode] = useState<AppMode>(AppMode.GENERATION);
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [files, setFiles] = useState<FileInput[]>([]);
  const [brandFiles, setBrandFiles] = useState<FileInput[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [trendResults, setTrendResults] = useState<TrendItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showMasterclass, setShowMasterclass] = useState(false);

  const [config, setConfig] = useState<ConfigState>({
    goal: 'Viral Growth',
    style: 'Authentic',
    keywords: '',
    originalText: '',
    geography: '',
    targetAudience: '',
    targetLanguage: '',
    demographics: '',
    brandGuidelines: '',
    niche: ''
  });

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    const envKey = process.env.API_KEY;

    if (envKey && envKey.length > 0 && !envKey.includes("VITE_")) {
       setApiKey(envKey);
       setShowGatekeeper(false);
    } else if (storedKey && storedKey.startsWith('AIza')) {
       setApiKey(storedKey);
       setShowGatekeeper(false);
    }
  }, []);

  const handleSaveKey = () => {
    if (!tempKey.startsWith('AIza')) {
      alert('Invalid Key format. It must start with AIza.');
      return;
    }
    localStorage.setItem('gemini_api_key', tempKey);
    setApiKey(tempKey);
    setShowGatekeeper(false);
  };

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setLoadingProgress(0);
      setLoadingMessage('Initializing Security Handshake...');
      
      const startTime = Date.now();
      const estimatedDuration = 15000; 

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let progress = (elapsed / estimatedDuration) * 100;
        if (progress > 90) progress = 90;
        setLoadingProgress(progress);

        if (progress < 25) {
          setLoadingMessage('Encrypting Media Packets...');
        } else if (progress < 50) {
          setLoadingMessage('Analyzing Visual Semantics...');
        } else if (progress < 75) {
          if (mode === AppMode.TREND_HUNTER) {
            setLoadingMessage('Scanning Global Trend Database...');
          } else {
            setLoadingMessage('Running Psychological Hooks...'); 
          }
        } else {
          setLoadingMessage(mode === AppMode.TREND_HUNTER ? 'Extracting Viral Patterns...' : 'Constructing Strategy...');
        }

      }, 100);
    } else {
      if (result || trendResults) setLoadingProgress(100);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isAnalyzing, mode, result, trendResults]);

  const handleAnalyze = async () => {
    if (mode === AppMode.GENERATION && files.length === 0) { alert("Upload content first, boss."); return; }
    if (mode === AppMode.REFINE && !config.originalText) { alert("Need some text to cook."); return; }
    if (mode === AppMode.TREND_HUNTER && !config.niche) { alert("What niche are we hunting?"); return; }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setTrendResults(null);

    try {
      const filesToAnalyze = files.map(f => f.file);
      const data = await analyzeContent(filesToAnalyze, mode, platform, config, apiKey);
      
      if (mode === AppMode.TREND_HUNTER) {
        setTrendResults(data as TrendItem[]);
      } else {
        setResult(data as AnalysisResult);
      }
    } catch (err: any) {
      setError(err.message || "Something glitched.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUseTrend = (trend: TrendItem) => {
    setMode(AppMode.GENERATION);
    setConfig(prev => ({
      ...prev,
      style: 'Urgent & Hype',
      goal: 'Viral Growth',
      keywords: trend.headline,
    }));
    alert(`Trend "${trend.headline}" Loaded. Drop the media.`);
  };

  const ModeButton = ({ m, icon: Icon, label, desc }: { m: AppMode, icon: any, label: string, desc: string }) => (
    <button
      onClick={() => { setMode(m); setResult(null); setTrendResults(null); if(m !== AppMode.TREND_HUNTER) setFiles([]); }}
      className={`relative p-4 rounded-3xl transition-all duration-300 w-full text-left overflow-hidden group ${
        mode === m 
          ? 'bg-indigo-600 text-white shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] scale-[1.02]' 
          : 'bg-slate-900/40 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity ${mode === m ? 'opacity-100' : ''}`}>
        <ArrowRight className="w-4 h-4 -rotate-45" />
      </div>
      <Icon className={`w-8 h-8 mb-4 ${mode === m ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`} />
      <span className="block font-black text-lg tracking-tight mb-0.5">{label}</span>
      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{desc}</span>
    </button>
  );

  // --- GATEKEEPER (LOGIN) ---
  if (showGatekeeper) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-inter">
         <div className="aurora-blob w-[500px] h-[500px] bg-indigo-600/30 rounded-full top-0 left-0"></div>
         <div className="aurora-blob w-[400px] h-[400px] bg-purple-600/30 rounded-full bottom-0 right-0 animation-delay-2000"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

         <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative z-10">
            <div className="text-center mb-10">
               <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] rotate-3">
                  <Sparkles className="w-10 h-10 text-white" />
               </div>
               <h1 className="text-3xl font-black text-white tracking-tighter mb-2">SocialSEO AI</h1>
               <p className="text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase">Andromeda Engine v3.0</p>
            </div>

            <div className="space-y-6">
               <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-2 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Security Clearance Key
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-black rounded-2xl p-0.5">
                       <Key className="absolute top-4 left-4 w-5 h-5 text-slate-500" />
                       <input 
                         type="password"
                         placeholder="Paste AIza key..."
                         className="w-full bg-slate-900/80 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:bg-slate-900 transition-all font-mono text-sm"
                         value={tempKey}
                         onChange={(e) => setTempKey(e.target.value)}
                       />
                    </div>
                  </div>
               </div>

               <button 
                 onClick={handleSaveKey}
                 className="w-full bg-white hover:bg-indigo-50 text-black font-black py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
               >
                 INITIALIZE SYSTEM
                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </div>
      </div>
    );
  }

  // --- MAIN APP ---
  return (
    <div className="min-h-screen text-slate-200 pb-20 selection:bg-indigo-500/30">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="aurora-blob w-[800px] h-[800px] bg-indigo-900/20 top-[-20%] left-[-10%]"></div>
        <div className="aurora-blob w-[600px] h-[600px] bg-purple-900/20 bottom-[-10%] right-[-10%] animation-delay-4000"></div>
      </div>

      {showMasterclass && <MasterclassGuide onClose={() => setShowMasterclass(false)} />}

      {/* FLOATING NAVBAR */}
      <div className="sticky top-4 z-50 px-4 mb-8">
        <header className="max-w-6xl mx-auto h-16 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight text-white hidden sm:block">SocialSEO</span>
          </div>
          
          <div className="flex items-center gap-4">
             <button
               onClick={() => setShowMasterclass(true)}
               className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 hover:text-white rounded-full transition-all border border-indigo-500/30"
             >
               <BookOpen className="w-4 h-4" />
               <span className="text-xs font-bold">ACADEMY</span>
             </button>

             <div className="hidden md:flex items-center px-3 py-1 bg-black/40 rounded-full border border-white/5 gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Online</span>
             </div>
             <button 
               onClick={() => { localStorage.removeItem('gemini_api_key'); setShowGatekeeper(true); setApiKey(''); }}
               className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
             >
               LOGOUT
             </button>
          </div>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Mode Grid */}
          <div className="grid grid-cols-2 gap-3">
            <ModeButton m={AppMode.GENERATION} icon={Sparkles} label="Create" desc="Media to Viral" />
            <ModeButton m={AppMode.REFINE} icon={Settings2} label="Refine" desc="Polish Drafts" />
            <ModeButton m={AppMode.COMPETITOR_SPY} icon={BrainCircuit} label="Spy" desc="Reverse Engineer" />
            <ModeButton m={AppMode.TREND_HUNTER} icon={Flame} label="Hunt" desc="Live Trends" />
          </div>

          {/* Config Panel */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 backdrop-blur-md space-y-6">
            
            {/* Platform Selector */}
            {mode !== AppMode.COMPETITOR_SPY && mode !== AppMode.TREND_HUNTER && (
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-wider">Destination</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: Platform.INSTAGRAM, icon: Instagram, label: 'Insta' },
                    { id: Platform.TIKTOK, icon: Music2, label: 'TikTok' },
                    { id: Platform.YOUTUBE, icon: Youtube, label: 'YT' },
                    { id: Platform.TWITTER, icon: Twitter, label: 'X' },
                    { id: Platform.LINKEDIN, icon: Linkedin, label: 'Linked' },
                    { id: Platform.FACEBOOK, icon: Facebook, label: 'FB' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                        platform === p.id 
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20' 
                          : 'bg-black/20 border-white/5 text-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      <p.icon size={16} />
                      <span className="text-xs font-bold">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Guard */}
            {mode !== AppMode.TREND_HUNTER && (
               <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> Brand Guard
                  </label>
                  <div className="bg-black/20 rounded-2xl p-4 border border-white/5 space-y-3">
                    <textarea 
                      className="w-full h-16 bg-transparent text-xs text-white focus:outline-none resize-none placeholder-slate-600 font-mono"
                      placeholder="// ENTER STRICT RULES..."
                      value={config.brandGuidelines}
                      onChange={(e) => setConfig({...config, brandGuidelines: e.target.value})}
                    />
                    <div className="h-px bg-white/10 w-full"></div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-slate-500">OR UPLOAD GUIDE</span>
                       <div className="scale-75 origin-right">
                          <FileUpload files={brandFiles} setFiles={setBrandFiles} />
                       </div>
                    </div>
                  </div>
               </div>
            )}

            {/* Targeting Inputs */}
            {mode !== AppMode.TREND_HUNTER && (
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2">
                  <Target className="w-3 h-3" /> Targeting
                </label>
                <div className="grid grid-cols-2 gap-2">
                   {['Geography', 'Language', 'Audience', 'Demographics'].map((placeholder, i) => (
                     <input 
                        key={i}
                        type="text"
                        placeholder={placeholder}
                        value={Object.values(config)[i + 4] as string} // quick mapping
                        onChange={(e) => {
                           const key = Object.keys(config)[i + 4] as keyof ConfigState;
                           setConfig({...config, [key]: e.target.value});
                        }}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-2 px-3 text-xs text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                     />
                   ))}
                </div>
              </div>
            )}

            {/* DYNAMIC MODE INPUTS */}
            {mode === AppMode.TREND_HUNTER && (
              <div className="pt-2 animate-fade-in">
                 <label className="text-[10px] font-black text-orange-400 uppercase mb-3 block tracking-wider">Target Niche</label>
                 <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <input 
                      type="text"
                      className="relative w-full bg-slate-900 border border-orange-500/30 rounded-2xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 font-bold"
                      placeholder="e.g. AI News, Vegan Food..."
                      value={config.niche}
                      onChange={(e) => setConfig({...config, niche: e.target.value})}
                    />
                    <Search className="absolute top-4 left-3 w-5 h-5 text-orange-500" />
                 </div>
              </div>
            )}

            {mode === AppMode.GENERATION && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                   <select 
                     value={config.goal}
                     onChange={(e) => setConfig({...config, goal: e.target.value})}
                     className="bg-black/20 border border-white/5 rounded-xl p-2 text-xs text-slate-300 focus:ring-1 focus:ring-indigo-500 outline-none"
                   >
                     <option>Viral Growth</option>
                     <option>Sales</option>
                     <option>Community</option>
                   </select>
                   <select 
                     value={config.style}
                     onChange={(e) => setConfig({...config, style: e.target.value})}
                     className="bg-black/20 border border-white/5 rounded-xl p-2 text-xs text-slate-300 focus:ring-1 focus:ring-indigo-500 outline-none"
                   >
                     <option>Authentic</option>
                     <option>Polished</option>
                     <option>Hype</option>
                   </select>
                </div>
                <FileUpload files={files} setFiles={setFiles} />
              </div>
            )}

            {mode === AppMode.REFINE && (
               <div className="space-y-4">
                 <textarea 
                   className="w-full h-24 bg-black/20 border border-white/5 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                   placeholder="Paste draft..."
                   value={config.originalText}
                   onChange={(e) => setConfig({...config, originalText: e.target.value})}
                 />
                 <input 
                   type="text"
                   placeholder="SEO Keywords..."
                   className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                   value={config.keywords}
                   onChange={(e) => setConfig({...config, keywords: e.target.value})}
                 />
                 <FileUpload files={files} setFiles={setFiles} />
               </div>
            )}

            {mode === AppMode.COMPETITOR_SPY && (
               <FileUpload files={files} setFiles={setFiles} multiple={true} />
            )}

          </div>

          {/* MAIN ACTION BUTTON */}
          <div className="relative group pt-2">
            <div className={`absolute -inset-1 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500 animate-pulse ${
               mode === AppMode.TREND_HUNTER ? 'bg-orange-600' : 'bg-indigo-600'
            }`}></div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`relative w-full py-5 rounded-2xl font-black text-lg tracking-tight text-white shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center overflow-hidden ${
                isAnalyzing ? 'bg-slate-800 cursor-not-allowed' : 'bg-slate-900 border border-white/10'
              }`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r ${
                 mode === AppMode.TREND_HUNTER ? 'from-orange-500 to-red-600' : 'from-indigo-600 to-purple-600'
              }`}></div>
              
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-mono text-sm">PROCESSING...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 relative z-10">
                  {mode === AppMode.TREND_HUNTER ? (
                     <>
                       <Flame className="w-5 h-5 text-orange-500" />
                       HUNT TRENDS
                     </>
                  ) : (
                     <>
                       <Zap className="w-5 h-5 text-indigo-400" />
                       COOK STRATEGY
                     </>
                  )}
                </div>
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs font-bold text-center">
              {error}
            </div>
          )}
        </div>

        {/* RIGHT: OUTPUT */}
        <div className="lg:col-span-7">
          {isAnalyzing ? (
            <div className="h-full min-h-[500px] border border-slate-800 bg-black/40 rounded-[2.5rem] flex flex-col items-center justify-center p-12 backdrop-blur-md relative overflow-hidden">
               {/* Cyber Grid Background */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
               
               <div className="relative z-10 w-full max-w-sm text-center">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                     <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
                     <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-white animate-pulse" />
                     </div>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">SYSTEM ACTIVE</h3>
                  <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400 mb-2 px-1">
                     <span>{loadingMessage}</span>
                     <span>{Math.round(loadingProgress)}%</span>
                  </div>
                  
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                     <div 
                       className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-300 ease-linear"
                       style={{ width: `${loadingProgress}%` }}
                     ></div>
                  </div>
               </div>
            </div>
          ) : result ? (
            <AnalysisResultView result={result} mode={mode} />
          ) : trendResults ? (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-[2rem]">
                 <h2 className="text-2xl font-black text-white flex items-center">
                   <Flame className="w-6 h-6 mr-3 text-orange-500" />
                   TRENDS FOUND: {config.niche}
                 </h2>
              </div>
              <div className="grid gap-4">
                {trendResults.map((trend, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800 hover:border-orange-500/50 p-6 rounded-3xl group transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                       <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{trend.headline}</h3>
                          <p className="text-xs text-slate-400 mb-3">{trend.whyItsHot}</p>
                          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                             <p className="text-xs text-orange-200 font-mono">💡 {trend.contentIdea}</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => handleUseTrend(trend)}
                         className="ml-4 p-3 bg-white/5 hover:bg-orange-500 text-white rounded-xl transition-all"
                       >
                         <ArrowRight className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-dashed border-slate-800 bg-slate-900/20 rounded-[2.5rem] flex flex-col items-center justify-center p-8">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 transition-all ${
                 mode === AppMode.TREND_HUNTER ? 'bg-orange-500/10 rotate-3' : 'bg-indigo-500/10 -rotate-3'
              }`}>
                {mode === AppMode.TREND_HUNTER ? <Flame className="w-10 h-10 text-orange-500" /> : <BrainCircuit className="w-10 h-10 text-indigo-500" />}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Awaiting Input</h3>
              <p className="text-slate-500 text-sm max-w-xs text-center">
                 Select a mode on the left to initialize the Andromeda Engine.
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
