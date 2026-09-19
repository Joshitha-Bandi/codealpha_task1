# AI FAQ Chatbot

A functional FAQ chatbot that allows users to ask questions in natural language and returns the most relevant answer from a predefined FAQ knowledge base.

This project was built for the **CodeAlpha AI Internship** task and demonstrates traditional Natural Language Processing (NLP) techniques.

## Features

- **Natural Language Question Input:** Users can type questions in conversational English.
- **NLP Preprocessing:** Implements tokenization, stopword removal, and lemmatization using NLTK.
- **Similarity Matching:** Uses TF-IDF Vectorization and Cosine Similarity to find the most relevant FAQ.
- **Confidence Threshold:** If the confidence score is below 0.25, the bot asks the user to rephrase rather than returning an incorrect answer.
- **Modern Premium UI:** A beautiful, responsive interface with smooth animations, clear chat functionality, and suggested questions.
- **REST API Backend:** Built with Flask to handle message processing.

## Technologies Used

### Frontend
- HTML5
- CSS3 (Custom Variables, Flexbox, CSS Animations)
- JavaScript (Fetch API, DOM Manipulation)
- Lucide Icons
- Google Fonts (Inter)

### Backend
- Python 3
- Flask (Web Framework)
- NLTK (Natural Language Toolkit for Text Preprocessing)
- scikit-learn (TF-IDF Vectorizer and Cosine Similarity)
- NumPy / SciPy

## NLP Workflow

1. **Dataset Loading:** The `faq_data.py` file contains a list of predefined FAQs.
2. **Preprocessing:** When the application starts, all FAQ questions are passed through `preprocess.py`, which:
   - Converts text to lowercase
   - Removes punctuation
   - Tokenizes the sentence into words
   - Removes common English stopwords
   - Lemmatizes the remaining words to their base forms
3. **Vectorization (TF-IDF):** The preprocessed FAQ questions are converted into a TF-IDF (Term Frequency - Inverse Document Frequency) matrix. This assigns a weight to each word based on how frequent it is in a sentence compared to the whole dataset.
4. **User Input Handling:** When a user asks a question, their input goes through the *exact same* preprocessing steps.
5. **Similarity Calculation:** The user's query is transformed into a TF-IDF vector, and we calculate the **Cosine Similarity** between the user vector and all FAQ vectors.
6. **Response Generation:** The algorithm selects the FAQ with the highest cosine similarity score. If the score is >= 0.25, it returns the corresponding answer. Otherwise, it asks the user to rephrase.

## Project Structure

```
faq-chatbot/
│
├── app.py                # Flask application and routing
├── chatbot.py            # Core logic (TF-IDF, Cosine Similarity)
├── faq_data.py           # The FAQ dataset dictionary
├── preprocess.py         # NLTK text cleaning pipeline
├── requirements.txt      # Python dependencies
├── README.md             # Project documentation
│
├── templates/
│   └── index.html        # Main HTML layout
│
└── static/
    ├── style.css         # UI Styling
    └── script.js         # Frontend interactivity and API requests
```

## Installation & Setup

1. **Navigate to the directory:**
   ```bash
   cd faq-chatbot
   ```

2. **Create a Virtual Environment (Optional but recommended):**
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application:**
   ```bash
   python app.py
   ```

5. **Open in Browser:**
   Go to `http://127.0.0.1:5000` in your web browser.

## Example Questions to Try

- "What courses are available?"
- "How do I reset my password?"
- "Are certificates provided?"
- "Can I get my money back?" (Tests semantic matching for "Can I get a refund?")
- "gibberish word testing" (Tests the confidence threshold fallback)

## Future Improvements

- Add a database to store and manage FAQs dynamically.
- Implement an LLM API (like OpenAI) as a fallback when traditional TF-IDF fails to find an answer.
- Add user feedback buttons (Thumbs up / Thumbs down) on the bot's answers to track accuracy.
- Save chat history to local storage or a database.
