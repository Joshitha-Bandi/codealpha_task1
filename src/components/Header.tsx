
import { Languages, Sparkles } from 'lucide-react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-container justify-between items-center">
        <div className="logo-group flex items-center gap-2">
          <div className="logo-icon-wrapper">
            <Languages size={24} className="logo-icon" />
          </div>
          <span className="logo-text">LingoAI</span>
        </div>
        
        <nav className="nav-links flex gap-6">
          <a href="#" className="nav-link active">Home</a>
          <a href="#translator" className="nav-link">Translator</a>
          <a href="#about" className="nav-link">About</a>
        </nav>
        
        <div className="badge flex items-center gap-2">
          <Sparkles size={16} />
          <span>AI Translator</span>
        </div>
      </div>
    </header>
  );
};
