
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-bg-accent"></div>
      <div className="container hero-container flex flex-col items-center">
        
        <div className="hero-badge animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Sparkles size={14} className="text-indigo" />
          <span className="hero-badge-text">AI POWERED TRANSLATION</span>
        </div>
        
        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Break Language Barriers.
          <span className="hero-title-gradient block">Translate anything, anywhere.</span>
        </h1>
        
        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Fast and accurate language translation powered by modern AI technology. 
          Seamlessly communicate across the globe with our premium translation service.
        </p>
        
        <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a href="#translator" className="btn-primary">
            Start Translating <ArrowRight size={20} />
          </a>
        </div>
        
      </div>
    </section>
  );
};
