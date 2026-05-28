import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, TrendingUp, Users, Award, Target, LogIn, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Deep Neural Analysis",
      description: "Advanced ML models dissect your resume's structure, semantics, and impact metrics."
    },
    {
      icon: Target,
      title: "Precision Role Matching",
      description: "Get mapped to high-growth roles based on latent skill vectors and market demand."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Valuation",
      description: "Dynamic salary estimation algorithms calibrated against live Indian tech market data."
    },
    {
      icon: Users,
      title: "Skill Gap Detection",
      description: "Identify missing keywords and technical proficiencies required by top-tier ATS systems."
    },
    {
      icon: Award,
      title: "Actionable Intelligence",
      description: "Step-by-step optimization protocols to elevate your profile above the 99th percentile."
    },
    {
      icon: Brain,
      title: "Predictive ATS Scoring",
      description: "Simulate exactly how enterprise applicant tracking systems will score your resume."
    }
  ];

  return (
    <div className="min-h-screen relative text-slate-100 font-sans selection:bg-teal-500/30">
      {/* Deep Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1"></div>
        <div className="aurora-orb aurora-orb-2"></div>
        <div className="aurora-orb aurora-orb-3"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Premium Glass Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 glass-panel rounded-none shadow-none bg-slate-950/40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-teal-400 relative z-10" />
              <div className="absolute inset-0 bg-teal-400 blur-xl opacity-50"></div>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Resume Analyzer</span>
            </h1>
          </div>
          <Link to="/login">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]">
              <LogIn className="w-4 h-4 mr-2" />
              AUTHENTICATE
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-teal-500/30 text-teal-300 text-sm font-semibold mb-8 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
            <Sparkles className="w-4 h-4" />
            <span>V2.0 QUANTUM ENGINE NOW LIVE</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-white drop-shadow-2xl">
            Engineer Your Career With <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-500 filter drop-shadow-[0_0_20px_rgba(20,184,166,0.4)]">
              Predictive Intelligence
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Deploy advanced neural networks to decode your professional profile. Outsmart enterprise ATS algorithms and instantly unlock your true market valuation.
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/login">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-10 py-6 text-lg font-bold transition-all shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_50px_rgba(20,184,166,0.6)] hover:-translate-y-1 rounded-xl">
                INITIALIZE SCAN
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="glass-panel text-white border-white/20 hover:bg-white/10 px-10 py-6 text-lg font-semibold rounded-xl">
              VIEW PROTOCOLS
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-20">
          <h3 className="text-4xl font-bold mb-4 text-white">System Capabilities</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-violet-500 mx-auto rounded-full opacity-70"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-panel glass-panel-hover p-8 rounded-2xl group">
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 border border-teal-500/20 group-hover:bg-teal-500/20 transition-colors">
                <feature.icon className="w-7 h-7 text-teal-400 group-hover:text-teal-300 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white tracking-wide">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cyber CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/40 to-slate-950/80"></div>
        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="glass-panel max-w-4xl mx-auto p-12 md:p-20 rounded-3xl border-teal-500/30 shadow-[0_0_50px_rgba(20,184,166,0.15)] bg-slate-900/50">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">Ready For Deployment?</h3>
            <p className="text-xl mb-10 text-slate-300 font-light max-w-2xl mx-auto">
              Join elite professionals leveraging our AI architecture to secure top-tier positions across the global tech sector.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-teal-50 px-12 py-7 text-xl font-bold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all">
                ACCESS NEURAL NETWORK
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md relative z-10 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 opacity-80 hover:opacity-100 transition-opacity">
            <Brain className="w-6 h-6 text-teal-500" />
            <span className="text-xl font-bold text-white tracking-widest">AI RESUME ANALYZER</span>
          </div>
          <p className="text-slate-500 font-light text-sm">
            © {new Date().getFullYear()} Neural Analysis Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
