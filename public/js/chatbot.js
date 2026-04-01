// Chatbot functionality
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
  }

  createChatbotHTML() {
    // Create chatbot container
    const chatbotHTML = `
      <!-- Chatbot Icon -->
      <div id="chatbot-icon" class="chatbot-icon">
        <img src="/images/chatbot icon.png" alt="Chat with us" />
      </div>

      <!-- Chatbot Popup -->
      <div id="chatbot-popup" class="chatbot-popup">
        <div class="chatbot-header">
          <h3>Argar Wheels Assistant</h3>
          <button id="chatbot-close" class="chatbot-close">&times;</button>
        </div>
        <div class="chatbot-messages" id="chatbot-messages">
          <div class="bot-message">
            <p>Hello! I'm your Argar Wheels assistant. How can I help you today?</p>
          </div>
        </div>
        <div class="chatbot-input-container">
          <input 
            type="text" 
            id="chatbot-input" 
            placeholder="Type your message..."
            maxlength="1000"
          />
          <button id="chatbot-send">Send</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML); // Append to body
    
    this.addStyles(); // Add styles dynamically
  }

  addStyles() {
    const styles = `
      <style>
        .chatbot-icon {
          position: fixed;
          bottom: 20px;
          right: 10px;
          width: auto;
          height: auto;
          background: transparent;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: none;
          transition: transform 0.3s ease;
          z-index: 1000;
        }

        .chatbot-icon:hover {
          transform: scale(1.1);
        }

        .chatbot-icon img {
          max-width: 100px;
          height: auto;
          display: block;
        }

        .chatbot-popup {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          display: none; 
          flex-direction: column;
          z-index: 1001;
          overflow: hidden;
        }

        .chatbot-popup.active {
          display: flex;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chatbot-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .chatbot-close {
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .chatbot-close:hover {
          transform: rotate(90deg);
        }

        .chatbot-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #f8f9fa;
        }

        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 3px;
        }

        .bot-message, .user-message {
          margin-bottom: 15px;
          padding: 12px 15px;
          border-radius: 12px;
          max-width: 80%;
          word-wrap: break-word;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bot-message {
          background: white;
          color: #333;
          margin-right: auto;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .user-message {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-left: auto;
        }

        .bot-message p, .user-message p {
          margin: 0;
          line-height: 1.5;
        }

        .typing-indicator {
          display: flex;
          gap: 5px;
          padding: 15px;
          background: white;
          border-radius: 12px;
          width: fit-content;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .chatbot-input-container {
          display: flex;
          padding: 15px;
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        #chatbot-input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 25px;
          outline: none;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        #chatbot-input:focus {
          border-color: #667eea;
        }

        #chatbot-send {
          margin-left: 10px;
          padding: 12px 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        #chatbot-send:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        #chatbot-send:active {
          transform: translateY(0);
        }

        #chatbot-send:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .chatbot-popup {
            width: calc(100% - 40px);
            height: 450px;
            right: 20px;
            left: 20px;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  attachEventListeners() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input');

    // Toggle popup
    chatbotIcon.addEventListener('click', () => this.togglePopup());
    chatbotClose.addEventListener('click', () => this.togglePopup());

    // Send message
    chatbotSend.addEventListener('click', () => this.sendMessage());
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  togglePopup() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    this.isOpen = !this.isOpen;
    chatbotPopup.classList.toggle('active', this.isOpen);
    
    if (this.isOpen) {
      document.getElementById('chatbot-input').focus();
    }
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Display user message
    this.addMessage(message, 'user');
    input.value = '';

    // Disable input while processing
    const sendButton = document.getElementById('chatbot-send');
    sendButton.disabled = true;
    input.disabled = true;

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      // Remove typing indicator
      this.hideTypingIndicator();

      if (data.success) {
        this.addMessage(data.reply, 'bot');
      } else {
        this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
      }
    } catch (error) {
      console.error('Chat error:', error);
      this.hideTypingIndicator();
      this.addMessage('Sorry, I am unable to connect right now. Please try again later.', 'bot');
    } finally {
      // Re-enable input
      sendButton.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  addMessage(text, type) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Chatbot();
});
