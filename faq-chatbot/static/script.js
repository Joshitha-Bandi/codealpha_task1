document.addEventListener('DOMContentLoaded', () => {
    const chatArea = document.getElementById('chat-area');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-chat');
    const suggestions = document.getElementById('suggestions');

    // Make sendSuggestion globally available
    window.sendSuggestion = function(text) {
        if (suggestions) {
            suggestions.style.display = 'none'; // Hide suggestions after first use
        }
        sendMessage(text);
    };

    function appendMessage(sender, text, confidence = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        let avatarIcon = sender === 'user' ? 'user' : 'bot';
        
        let bubbleContent = `
            <div class="avatar ${sender}-avatar">
                <i data-lucide="${avatarIcon}"></i>
            </div>
            <div class="bubble">
                ${text}
                ${confidence !== null ? `<br><span class="confidence-badge">Match confidence: ${(confidence * 100).toFixed(0)}%</span>` : ''}
            </div>
        `;
        
        messageDiv.innerHTML = bubbleContent;
        chatArea.appendChild(messageDiv);
        
        // Re-initialize lucide icons for the new elements
        lucide.createIcons();
        
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-container';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="avatar bot-avatar">
                <i data-lucide="bot"></i>
            </div>
            <div class="bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatArea.appendChild(typingDiv);
        lucide.createIcons();
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function scrollToBottom() {
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    async function sendMessage(text) {
        if (!text.trim()) return;
        
        // Clear input
        userInput.value = '';
        
        if (suggestions) {
            suggestions.style.display = 'none';
        }

        // Add user message to UI
        appendMessage('user', text);
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Send API Request
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });
            
            const data = await response.json();
            
            removeTypingIndicator();
            
            if (response.ok) {
                // Determine if we should show confidence badge
                let conf = (data.confidence !== undefined && data.confidence > 0) ? data.confidence : null;
                appendMessage('bot', data.answer, conf);
            } else {
                appendMessage('bot', data.error || "Sorry, I encountered an error. Please try again.");
            }
            
        } catch (error) {
            console.error("Error calling API:", error);
            removeTypingIndicator();
            appendMessage('bot', "Network error. Please check if the server is running.");
        }
    }

    // Event Listeners
    sendBtn.addEventListener('click', () => {
        sendMessage(userInput.value);
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(userInput.value);
        }
    });

    clearBtn.addEventListener('click', () => {
        // Keep only the first bot message and suggestions
        const children = Array.from(chatArea.children);
        children.forEach((child, index) => {
            if (index > 1) { // 0 is initial bot msg, 1 is suggestions
                child.remove();
            }
        });
        if (suggestions) {
            suggestions.style.display = 'flex';
        }
    });
});
