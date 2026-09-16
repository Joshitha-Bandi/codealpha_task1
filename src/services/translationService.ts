export interface TranslateParams {
  text: string;
  source: string;
  target: string;
}

export interface TranslateResponse {
  translatedText: string;
  error?: string;
}

export async function translateText({ text, source, target }: TranslateParams): Promise<TranslateResponse> {
  try {
    // We use the free MyMemory Translation API for demonstration purposes.
    // It provides up to 500 words/day without an API key.
    
    // MyMemory uses 'Autodetect' for auto-detection
    const sourceLang = source === 'auto' ? 'Autodetect' : source;
    const langpair = `${sourceLang}|${target}`;
    
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langpair)}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || 'Translation failed');
    }

    if (data.responseData && data.responseData.translatedText) {
      // Decode HTML entities if returned
      const decodedText = decodeHtmlEntities(data.responseData.translatedText);
      return { translatedText: decodedText };
    }

    return {
      translatedText: "",
      error: "No translation returned from API.",
    };
  } catch (error: any) {
    return {
      translatedText: "",
      error: error.message || "An error occurred during translation.",
    };
  }
}

function decodeHtmlEntities(text: string) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}
