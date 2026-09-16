export function speakText(text: string, langCode: string) {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis is not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Map our language codes to speech synthesis language codes if necessary.
  // Google Translate often uses basic codes (e.g., 'es'), SpeechSynthesis prefers BCP 47 (e.g., 'es-ES').
  // The browser usually handles simple 2-letter codes gracefully.
  utterance.lang = langCode === 'auto' ? 'en' : langCode;
  
  window.speechSynthesis.speak(utterance);
}
