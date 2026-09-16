# LingoAI

A modern, polished AI Language Translation Web Application built with React and TypeScript.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configuration:
   Create a `.env` file in the root directory and add your Google Cloud Translation API key:
   ```env
   VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
   ```
   *Note: If the API key is missing, the application will display a setup message rather than attempting to translate.*

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features
- Real-time language translation.
- Minimal, premium UI design.
- Text-to-Speech (Listen to translations).
- Copy to clipboard functionality.
- Fully responsive across devices.
