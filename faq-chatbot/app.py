from flask import Flask, request, jsonify, render_template
from chatbot import chatbot_engine

app = Flask(__name__)

@app.route('/')
def home():
    """Render the main chatbot UI."""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    API endpoint to handle chat messages.
    Expects JSON: {"message": "user question"}
    Returns JSON: {"answer": "response", "confidence": 0.85}
    """
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({"error": "Invalid request. 'message' field is required."}), 400
            
        user_message = data['message']
        
        # Get answer from chatbot engine
        answer, confidence = chatbot_engine.get_answer(user_message)
        
        return jsonify({
            "answer": answer,
            "confidence": confidence
        })
        
    except Exception as e:
        print(f"Error processing message: {str(e)}")
        return jsonify({"error": "An internal server error occurred."}), 500

if __name__ == '__main__':
    # Run the Flask development server
    app.run(debug=True, host='0.0.0.0', port=5000)
