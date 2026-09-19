import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from faq_data import faqs
from preprocess import preprocess_text

class FAQChatbot:
    def __init__(self, threshold=0.25):
        self.threshold = threshold
        self.vectorizer = TfidfVectorizer()
        self.faqs = faqs
        
        # Extract questions and preprocess them
        self.questions = [faq['question'] for faq in self.faqs]
        self.processed_questions = [preprocess_text(q) for q in self.questions]
        
        # Fit TF-IDF on the processed questions
        # Only fit if there are questions to avoid errors
        if self.processed_questions:
            self.tfidf_matrix = self.vectorizer.fit_transform(self.processed_questions)
        else:
            self.tfidf_matrix = None

    def get_answer(self, user_query):
        """
        Takes a user query, compares it to the FAQ questions using Cosine Similarity,
        and returns the best answer and confidence score.
        """
        if not user_query.strip():
            return "Please ask a question.", 0.0

        if self.tfidf_matrix is None:
            return "Knowledge base is empty.", 0.0

        # Preprocess the user query
        processed_query = preprocess_text(user_query)
        
        # If query is completely filtered out (e.g., only stop words)
        if not processed_query:
            return "I'm not sure I understand. Could you rephrase with more details?", 0.0

        # Vectorize the query
        query_vector = self.vectorizer.transform([processed_query])
        
        # Calculate cosine similarity between query and all FAQs
        similarities = cosine_similarity(query_vector, self.tfidf_matrix)
        
        # Get the highest similarity score and its index
        best_match_idx = np.argmax(similarities)
        best_score = similarities[0][best_match_idx]
        
        # Check against threshold
        if best_score < self.threshold:
            return "I'm not sure I found the right answer. Could you rephrase your question?", round(best_score, 2)
            
        # Return the corresponding answer
        best_answer = self.faqs[best_match_idx]['answer']
        return best_answer, round(best_score, 2)

# Singleton instance
chatbot_engine = FAQChatbot()
