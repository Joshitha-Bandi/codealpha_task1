
import './Footer.css';
import { Languages } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container flex flex-col items-center">
        
        <div className="footer-logo flex items-center gap-2 mb-4">
          <Languages size={24} className="text-indigo" />
          <span className="footer-brand">LingoAI</span>
        </div>
        
        <p className="footer-tagline">
          "Making communication simpler, one language at a time."
        </p>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom flex flex-col md-flex-row justify-between items-center w-full">
          <span className="footer-info">AI Internship Project</span>
          <span className="footer-copyright">&copy; 2026 LingoAI</span>
        </div>
        
      </div>
    </footer>
  );
};
