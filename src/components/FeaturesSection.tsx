
import { Zap, Globe2, Ear } from 'lucide-react';
import './FeaturesSection.css';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">Translate with confidence</h2>
        
        <div className="features-grid">
          <div className="card feature-card">
            <div className="feature-icon-wrapper text-indigo">
              <Zap size={24} />
            </div>
            <h3 className="feature-title">Fast</h3>
            <p className="feature-desc">
              Get translations quickly with a simple and responsive interface.
            </p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon-wrapper text-blue">
              <Globe2 size={24} />
            </div>
            <h3 className="feature-title">Multiple Languages</h3>
            <p className="feature-desc">
              Translate text across a wide range of global languages.
            </p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon-wrapper text-purple">
              <Ear size={24} />
            </div>
            <h3 className="feature-title">Listen & Copy</h3>
            <p className="feature-desc">
              Listen to translations and copy results instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
