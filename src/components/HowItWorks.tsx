
import './HowItWorks.css';

export const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <h2 className="section-title-small">How it works</h2>
        
        <div className="steps-container">
          <div className="step">
            <span className="step-number">01</span>
            <span className="step-text">Enter your text</span>
          </div>
          
          <div className="step-divider"></div>
          
          <div className="step">
            <span className="step-number">02</span>
            <span className="step-text">Choose languages</span>
          </div>
          
          <div className="step-divider"></div>
          
          <div className="step">
            <span className="step-number">03</span>
            <span className="step-text">Translate</span>
          </div>
          
          <div className="step-divider"></div>
          
          <div className="step">
            <span className="step-number">04</span>
            <span className="step-text">Copy or listen</span>
          </div>
        </div>
      </div>
    </section>
  );
};
