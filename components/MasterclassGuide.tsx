
import React from 'react';
import { X, BookOpen, Search, Globe, Target, Smartphone, BarChart3, Hash, FileText, Mic, MapPin, Youtube, Linkedin, Twitter } from 'lucide-react';

interface MasterclassGuideProps {
  onClose: () => void;
}

const MasterclassGuide: React.FC<MasterclassGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-slate-900 border border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Social SEO <span className="text-indigo-400">Masterclass</span></h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tactical Manual v1.0</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 custom-scrollbar">
          
          {/* SECTION 1: DEFINITION */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-indigo-400" />
              <h3 className="text-xl font-black text-white uppercase tracking-wide">1. The Definition & Distinction</h3>
            </div>
            
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
              <h4 className="text-lg font-bold text-white mb-4">What is Social SEO?</h4>
              <p className="text-slate-300 leading-relaxed mb-8">
                Social SEO is the practice of optimizing social media content metadata (captions, on-screen text, audio, alt text) to maximize visibility in both <strong>in-app search engines</strong> and <strong>traditional search engines</strong> (Google).
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-indigo-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="w-5 h-5 text-indigo-400" />
                    <span className="font-bold text-white">SEO ON Social</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Optimizing content to be found via the internal search bars of apps.
                    <br/><br/>
                    <em>Example:</em> A user searches "travel tips" inside TikTok and finds your video because you used keywords in the text overlay.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span className="font-bold text-white">Social FOR SEO</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    How social signals (shares, engagement) impact Google Search rankings.
                    <br/><br/>
                    <em>Example:</em> Your Reddit thread or LinkedIn article appearing in Google's "Perspectives" filter.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: THE WHY */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-pink-500" />
              <h3 className="text-xl font-black text-white uppercase tracking-wide">2. The Business Case</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-white/5">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">40%</span>
                <p className="mt-2 text-white font-bold">Of Gen Z</p>
                <p className="text-sm text-slate-400 mt-2">Use TikTok or Instagram as their primary search engine instead of Google maps or search.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-white/5">
                 <h4 className="font-bold text-white mb-2">Discoverability vs. Virality</h4>
                 <p className="text-sm text-slate-400">
                   <strong>Virality</strong> is a flash in the pan (Feed algorithm). 
                   <strong>Discoverability</strong> is compounding interest (Search algorithm). SEO lasts years; Viral lasts hours.
                 </p>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-white/5">
                 <h4 className="font-bold text-white mb-2">Google's Shift</h4>
                 <p className="text-sm text-slate-400">
                   Google now indexes TikTok videos and Instagram posts directly in SERPs. If you aren't optimizing social, you're invisible on Google.
                 </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: TACTICAL EXECUTION */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-black text-white uppercase tracking-wide">3. Platform Tactics</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* TikTok */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white flex items-center gap-2"><Smartphone className="w-5 h-5 text-cyan-400" /> TikTok</h4>
                  <span className="text-[10px] bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded">Visual + Audio</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex gap-2"><span className="text-cyan-500">✓</span> <strong>Spoken Audio:</strong> Say keywords in first 3s (ASR indexing).</li>
                  <li className="flex gap-2"><span className="text-cyan-500">✓</span> <strong>Text Overlay:</strong> Native text on screen is readable by search bots.</li>
                  <li className="flex gap-2"><span className="text-cyan-500">✓</span> <strong>File Name:</strong> Rename from <em>video123.mp4</em> to <em>keyword-topic.mp4</em> BEFORE upload.</li>
                </ul>
                <div className="mt-4 p-3 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-500 italic">"Example: Selling vegan cookies? Say 'Best vegan cookies in NYC' immediately and put it in text overlay."</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-pink-500/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white flex items-center gap-2"><Smartphone className="w-5 h-5 text-pink-400" /> Instagram</h4>
                  <span className="text-[10px] bg-pink-900/30 text-pink-400 px-2 py-1 rounded">Entity Search</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex gap-2"><span className="text-pink-500">✓</span> <strong>Handle/Bio:</strong> Name field is searchable. Use "Name | Keyword" (e.g., "Sarah | SEO Expert").</li>
                  <li className="flex gap-2"><span className="text-pink-500">✓</span> <strong>Alt Text:</strong> Advanced Settings -> Write Alt Text. Describe image + Keyword.</li>
                  <li className="flex gap-2"><span className="text-pink-500">✓</span> <strong>Location:</strong> Use specific business/venue tags, not just cities.</li>
                </ul>
              </div>

              {/* YouTube */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-red-500/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white flex items-center gap-2"><Youtube className="w-5 h-5 text-red-400" /> YouTube</h4>
                  <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-1 rounded">The Giant</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex gap-2"><span className="text-red-500">✓</span> <strong>Title:</strong> High CTR + Keyword. Keep under 60 chars.</li>
                  <li className="flex gap-2"><span className="text-red-500">✓</span> <strong>Chapters:</strong> Timestamps (0:00 Intro) act as H2 headers for Google.</li>
                  <li className="flex gap-2"><span className="text-red-500">✓</span> <strong>Description:</strong> First 2 lines are critical. Rest is filler.</li>
                </ul>
              </div>

              {/* LinkedIn */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white flex items-center gap-2"><Linkedin className="w-5 h-5 text-blue-400" /> LinkedIn</h4>
                  <span className="text-[10px] bg-blue-900/30 text-blue-400 px-2 py-1 rounded">Professional Graph</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> <strong>Headline:</strong> Searchable value prop. Not just "Student".</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> <strong>Pulse Articles:</strong> Long-form content ranks incredibly well on Google.</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> <strong>Hashtags:</strong> 3 is the magic number. 1 Broad, 1 Niche, 1 Brand.</li>
                </ul>
              </div>

               {/* Twitter/X */}
               <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-white/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white flex items-center gap-2"><Twitter className="w-5 h-5 text-white" /> X (Twitter)</h4>
                  <span className="text-[10px] bg-slate-700 text-white px-2 py-1 rounded">Real-Time</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex gap-2"><span className="text-white">✓</span> <strong>First Tweet:</strong> Keyword MUST be in the first tweet of a thread.</li>
                  <li className="flex gap-2"><span className="text-white">✓</span> <strong>Recency:</strong> Post during high-volume events using trending terms.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* SECTION 4: TOOLS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-black text-white uppercase tracking-wide">4. Tools & Measurement</h3>
            </div>

            <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-3xl p-8">
               <div className="grid md:grid-cols-2 gap-8">
                 <div>
                   <h4 className="font-bold text-white mb-4">Essential Tools</h4>
                   <ul className="space-y-2 text-sm text-slate-300">
                     <li>• <strong>Google Trends:</strong> Compare keyword volume over time.</li>
                     <li>• <strong>AnswerThePublic:</strong> Find questions people are actually asking.</li>
                     <li>• <strong>TikTok Creative Center:</strong> See trending songs and hashtags in real-time.</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-bold text-white mb-4">Success Metrics</h4>
                   <ul className="space-y-2 text-sm text-slate-300">
                     <li>• <strong>Non-Follower Reach:</strong> The truest metric of SEO success.</li>
                     <li>• <strong>Save Rate:</strong> Signals high value to algorithms.</li>
                     <li>• <strong>Search Impressions:</strong> Available in some analytics (YouTube/Pinterest).</li>
                   </ul>
                 </div>
               </div>
            </div>
          </section>

          {/* FOOTER */}
          <div className="text-center pt-10 border-t border-white/5">
             <p className="text-slate-600 text-sm">Use the "Spy" mode in SocialSEO AI to reverse engineer these tactics from competitors.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MasterclassGuide;
