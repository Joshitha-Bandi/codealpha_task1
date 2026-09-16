import { useState } from 'react';
import { ArrowRightLeft, Loader2, Sparkles, Copy, Volume2, X, ClipboardPaste, Check } from 'lucide-react';
import { LANGUAGES, SOURCE_LANGUAGES } from '../constants/languages';
import { translateText } from '../services/translationService';
import { speakText } from '../services/speechService';
import './Translator.css';

export const Translator: React.FC = () => {
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('te'); // default to Telugu
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSwap = () => {
    if (sourceLang !== 'auto') {
      const tempLang = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(tempLang);
      
      if (translatedText && sourceText) {
        setSourceText(translatedText);
        setTranslatedText(sourceText);
      }
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    const response = await translateText({
      text: sourceText,
      source: sourceLang,
      target: targetLang
    });
    
    if (response.error) {
      setError(response.error);
    } else {
      setTranslatedText(response.translatedText);
    }
    
    setIsLoading(false);
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSourceText(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
    setError(null);
  };

  return (
    <section id="translator" className="translator-section">
      <div className="container">
        <div className="card translator-card">
          
          {/* Top Controls */}
          <div className="translator-controls flex justify-between items-center">
            <div className="lang-selector-group flex items-center gap-4">
              <span className="lang-label">From</span>
              <select 
                className="lang-select" 
                value={sourceLang} 
                onChange={(e) => setSourceLang(e.target.value)}
              >
                {SOURCE_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            
            <button 
              className="btn-icon swap-btn" 
              onClick={handleSwap}
              disabled={sourceLang === 'auto'}
              title={sourceLang === 'auto' ? "Cannot swap with Auto Detect" : "Swap languages"}
            >
              <ArrowRightLeft size={18} />
            </button>
            
            <div className="lang-selector-group flex items-center gap-4">
              <span className="lang-label">To</span>
              <select 
                className="lang-select" 
                value={targetLang} 
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Workspaces */}
          <div className="translator-workspace flex">
            {/* Input Panel */}
            <div className="panel input-panel">
              <div className="panel-header flex justify-between items-center">
                <span className="panel-label">Your text</span>
                <div className="panel-actions flex gap-2">
                  <button className="panel-action-btn" onClick={handlePaste} title="Paste">
                    <ClipboardPaste size={16} />
                  </button>
                  <button className="panel-action-btn" onClick={handleClear} title="Clear">
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              <textarea 
                className="panel-textarea"
                placeholder="Type or paste your text here..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              ></textarea>
              
              <div className="panel-footer">
                <span className="char-count">{sourceText.length} characters</span>
              </div>
            </div>
            
            <div className="panel-divider"></div>
            
            {/* Output Panel */}
            <div className="panel output-panel">
              <div className="panel-header flex justify-between items-center">
                <span className="panel-label">Translation</span>
                <div className="panel-actions flex gap-2">
                  <button className="panel-action-btn" onClick={() => speakText(translatedText, targetLang)} title="Listen" disabled={!translatedText}>
                    <Volume2 size={16} />
                  </button>
                  <button className="panel-action-btn" onClick={handleCopy} title="Copy" disabled={!translatedText}>
                    {copied ? <Check size={16} className="text-indigo" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              
              <div className="panel-output-content">
                {isLoading ? (
                  <div className="loading-state flex items-center justify-center h-full">
                    <Loader2 size={32} className="spinner text-indigo" />
                  </div>
                ) : error ? (
                  <div className="error-message">
                    {error}
                  </div>
                ) : (
                  <textarea 
                    className="panel-textarea output-textarea"
                    placeholder="Your translation will appear here..."
                    value={translatedText}
                    readOnly
                  ></textarea>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Action */}
          <div className="translator-footer flex justify-center">
            <button 
              className="btn-primary translate-main-btn" 
              onClick={handleTranslate}
              disabled={isLoading || !sourceText.trim()}
            >
              Translate Text <Sparkles size={18} />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};
