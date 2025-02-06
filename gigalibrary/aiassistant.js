class AIAssistant {
    constructor() {
        this.chatContainer = document.querySelector('.chat-messages');
        this.input = document.getElementById('assistantInput');
    }

    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'assistant'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-text">${text}</span>
                <small class="message-time">${new Date().toLocaleTimeString()}</small>
            </div>
        `;
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    async processQuery(query) {
        // Mock AI response - In real implementation, this would call your AI service
        const responses = {
            'find': 'I found these files matching your query...',
            'search': 'Searching through your files...',
            'help': 'I can help you find files, organize documents, and answer questions about your content.',
            'default': "I'm here to help you manage your files and answer any questions!"
        };

        const response = Object.entries(responses).find(([key]) => 
            query.toLowerCase().includes(key))?.[1] || responses.default;

        return new Promise(resolve => setTimeout(() => resolve(response), 1000));
    }
}

// Initialize AI Assistant
const assistant = new AIAssistant();

async function sendMessage() {
    const input = document.getElementById('assistantInput');
    const message = input.value.trim();
    
    if (message) {
        assistant.addMessage(message, true);
        input.value = '';
        
        // Show typing indicator
        const response = await assistant.processQuery(message);
        assistant.addMessage(response, false);
    }
}

// Handle enter key
document.getElementById('assistantInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
