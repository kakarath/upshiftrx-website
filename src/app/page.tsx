"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Microscope, Zap, Shield, Users, Moon, Sun, ExternalLink, FileText, Play } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Microscope className="w-5 h-5 text-white" />
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>UpShiftRx</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#about" className={`hover:text-blue-400 transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>About</a>
              <a href="#docs" className={`hover:text-blue-400 transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Docs</a>
              <a href="#contact" className={`hover:text-blue-400 transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Contact</a>
            </nav>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-slate-900/10 hover:bg-slate-900/20 text-slate-900'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-12 max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                AI-Powered
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Drug Repurposing</span>
              </h1>
              <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium ${
                isDark ? 'text-blue-300' : 'text-blue-600'
              }`}>
                Faster insights. Smarter treatments. New hope with existing medicines.
              </p>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Discovering new uses for existing drugs through advanced AI and literature mining.
                Accelerating healthcare innovation for better patient outcomes.
              </p>
              <p className={`text-sm max-w-2xl mx-auto italic ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                For research purposes only. Not medical advice. Consult healthcare professionals for treatment decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <a
                  href="https://github.com/kakarath/upshiftrx-ai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 group"
                >
                  <Play className="w-5 h-5" />
                  <span>Explore Prototype</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 py-12"
            >
              <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
                isDark 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/60 border-slate-200'
              }`}>
                <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Lightning Fast</h3>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Mine millions of research papers in seconds, not months</p>
              </div>
              <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
                isDark 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/60 border-slate-200'
              }`}>
                <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Evidence-Based</h3>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Backed by peer-reviewed research and clinical data</p>
              </div>
              <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
                isDark 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/60 border-slate-200'
              }`}>
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>For Researchers</h3>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Built by scientists, for the scientific community</p>
              </div>
            </motion.div>

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              id="about"
              className="max-w-4xl mx-auto py-16"
            >
              <div className={`backdrop-blur-sm rounded-2xl p-8 border text-left ${
                isDark 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/60 border-slate-200'
              }`}>
                <h2 className={`text-3xl font-bold mb-6 text-center ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Our Vision</h2>
                <div className="space-y-4">
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                    At UpShiftRx, we believe that the next breakthrough in medicine might already exist in a pill bottle. 
                    Our AI-powered platform mines millions of research papers to uncover hidden connections between existing drugs and new therapeutic applications.
                  </p>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                    Founded by a team combining medical expertise with cutting-edge AI research, we're accelerating the discovery 
                    of new treatments by repurposing existing, FDA-approved medications. This approach can reduce development time 
                    from decades to years, bringing hope to patients faster.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Docs Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              id="docs"
              className="max-w-2xl mx-auto"
            >
              <div className={`backdrop-blur-sm rounded-2xl p-8 border text-center ${
                isDark 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/60 border-slate-200'
              }`}>
                <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className={`text-2xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Documentation</h2>
                <p className={`mb-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>Explore our research methodology, API documentation, and technical guides</p>
                <a
                  href="https://github.com/kakarath/upshiftrx-ai/tree/main/docs/VISION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'border-white/30 text-white hover:bg-white/10' 
                      : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>View Documentation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mx-auto"
              id="contact"
            >
              <div className={`backdrop-blur-sm rounded-2xl p-8 border ${
                isDark 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/60 border-slate-200'
              }`}>
                <h2 className={`text-2xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Get Early Access</h2>
                <p className={`mb-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>Be the first to know when we launch our platform</p>
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-white/20 border-white/30 text-white placeholder-slate-400' 
                            : 'bg-white/80 border-slate-300 text-slate-900 placeholder-slate-500'
                        }`}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 group"
                    >
                      <span>Join Waitlist</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-slate-400 mt-2">
                      By joining, you agree to our privacy policy. We'll only email you about platform updates.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className={`font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>Thank you for joining!</p>
                    <p className={`text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>We'll be in touch soon.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 font-medium"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
              Platform launching Q1 2026
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={`space-y-2 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <p>© 2025 UpShiftRx LLC. All rights reserved.</p>
            <p className="text-sm">Maryland, USA • Accelerating Medical Innovation</p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}