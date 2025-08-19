/**
 * Medical AI Chatbot - Client Application
 * Simplified JavaScript version for browser compatibility
 */

console.log("[AI-COPILOT] Starting Medical AI Chatbot...");

// Simple chatbot functionality without MCP dependencies
class SimpleChatbot {
  constructor() {
    this.messages = [];
    this.isConnected = false;
    this.apiKey = localStorage.getItem("openai_api_key");
    this.initialize();
  }

  initialize() {
    console.log("[AI-COPILOT] Initializing chatbot...");
    this.setupUI();
    this.showWelcome();
    this.updateConnectionStatus("Connected");
    this.isConnected = true;
  }

  setupUI() {
    // Enable input and send button
    const input = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");
    const quickActions = document.getElementById("quick-actions");

    if (input) {
      input.disabled = false;
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    if (sendButton) {
      sendButton.disabled = false;
    }

    if (quickActions) {
      quickActions.style.display = "flex";
    }
  }

  showWelcome() {
    const welcomeState = document.getElementById("welcome-state");
    if (welcomeState) {
      welcomeState.style.display = "block";
    }
  }

  updateConnectionStatus(status) {
    const connectionStatus = document.getElementById("connection-status");
    if (connectionStatus) {
      connectionStatus.textContent = status;
      if (status === "Connected") {
        connectionStatus.style.background = "rgba(46, 204, 113, 0.3)";
      } else {
        connectionStatus.style.background = "rgba(255, 255, 255, 0.2)";
      }
    }
  }

  async sendMessage(message = null) {
    const input = document.getElementById("chat-input");
    const messageText = message || (input ? input.value.trim() : "");

    if (!messageText) return;

    // Clear input
    if (input && !message) {
      input.value = "";
    }

    // Add user message
    this.addMessage("user", messageText);

    // Show typing indicator
    this.showTyping(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate response
      const response = await this.generateResponse(messageText);
      this.addMessage("assistant", response);
    } catch (error) {
      console.error("[AI-COPILOT] Error generating response:", error);
      this.addMessage("error", "Sorry, I encountered an error processing your request.");
    } finally {
      this.showTyping(false);
    }
  }

  async generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Simple rule-based responses for medical queries
    if (lowerMessage.includes("patient info") || lowerMessage.includes("patient information")) {
      return `🏥 **Patient Information**

**Current Patient:** John Doe (ID: P001)
- **Age:** 45 years
- **Blood Type:** O+
- **Allergies:** Penicillin
- **Last Visit:** 2025-08-15

**Current Vital Signs:**
- Blood Pressure: 120/80 mmHg
- Heart Rate: 72 bpm
- Temperature: 98.6°F
- Blood Sugar: 95 mg/dL

Would you like to update any of these values?`;
    }

    if (lowerMessage.includes("blood pressure")) {
      const match = lowerMessage.match(/(\d+)\/(\d+)/);
      if (match) {
        return `✅ **Blood Pressure Updated**

New reading: ${match[0]} mmHg has been recorded for patient John Doe.
- Systolic: ${match[1]} mmHg
- Diastolic: ${match[2]} mmHg
- Status: Normal range
- Recorded at: ${new Date().toLocaleString()}`;
      }
      return `📊 **Blood Pressure Information**

Current reading: 120/80 mmHg (Normal)
To update, please specify the new reading (e.g., "Update blood pressure to 130/85")`;
    }

    if (lowerMessage.includes("blood sugar")) {
      const match = lowerMessage.match(/(\d+)\s*(mg\/dl)?/);
      if (match) {
        return `✅ **Blood Sugar Updated**

New glucose level: ${match[1]} mg/dL has been recorded for patient John Doe.
- Level: ${match[1]} mg/dL
- Status: ${parseInt(match[1]) < 100 ? "Normal" : parseInt(match[1]) < 126 ? "Prediabetic range" : "Diabetic range"}
- Recorded at: ${new Date().toLocaleString()}`;
      }
      return `🩸 **Blood Sugar Information**

Current level: 95 mg/dL (Normal)
To update, please specify the new level (e.g., "Update blood sugar to 110")`;
    }

    if (lowerMessage.includes("medication") || lowerMessage.includes("add medication")) {
      return `💊 **Medication Management**

**Current Medications:**
1. Lisinopril 10mg - Once daily (Blood pressure)
2. Metformin 500mg - Twice daily (Diabetes)

To add a new medication, please provide:
- Medication name
- Dosage
- Frequency
- Purpose

Example: "Add Aspirin 81mg daily for heart health"`;
    }

    if (lowerMessage.includes("vital signs") || lowerMessage.includes("vitals")) {
      return `📈 **Current Vital Signs**

**Patient:** John Doe
- **Blood Pressure:** 120/80 mmHg ✅
- **Heart Rate:** 72 bpm ✅
- **Temperature:** 98.6°F ✅
- **Respiratory Rate:** 16/min ✅
- **Blood Sugar:** 95 mg/dL ✅
- **Oxygen Saturation:** 98% ✅

All vital signs are within normal ranges. Last updated: ${new Date().toLocaleString()}`;
    }

    // If we have an API key, try to use OpenAI
    if (this.apiKey && this.apiKey.startsWith('sk-')) {
      try {
        return await this.getOpenAIResponse(message);
      } catch (error) {
        console.log("[AI-COPILOT] OpenAI request failed, using fallback response");
      }
    }

    // Default response
    return `🏥 I'm your Medical AI Assistant. I can help you with:

• **Patient Information** - View current patient data
• **Vital Signs** - Update blood pressure, blood sugar, etc.
• **Medication Management** - Add or review medications
• **Medical Records** - Access patient history

Try asking me "Show patient info" or "Update blood pressure to 120/80"

💡 *To enable enhanced AI responses, click the ⚙️ settings icon and add your OpenAI API key.*`;
  }

  async getOpenAIResponse(message) {
    // This would require a backend proxy to avoid CORS issues
    // For now, we'll show that the API key is configured
    return `🤖 **Enhanced AI Response Enabled**

I can see you have configured an OpenAI API key! However, for security reasons, OpenAI API calls need to be made through a backend server to avoid exposing your API key.

For now, I'm using my built-in medical knowledge to help you with:
- Patient data management
- Vital signs tracking  
- Medication management
- Medical information

Your message: "${message}"

How can I assist you with medical data today?`;
  }

  addMessage(type, content) {
    const messagesContainer = document.getElementById("chat-messages");
    if (!messagesContainer) return;

    // Hide welcome message
    const welcomeState = document.getElementById("welcome-state");
    if (welcomeState) {
      welcomeState.style.display = "none";
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = content.replace(/\n/g, '<br>');

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTyping(show) {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.style.display = show ? "block" : "none";
    }
  }

  reconnect() {
    this.updateConnectionStatus("Reconnecting...");
    setTimeout(() => {
      this.updateConnectionStatus("Connected");
      this.addMessage("system", "✅ Reconnected to Medical AI Assistant");
    }, 2000);
  }

  reinitialize() {
    console.log("[AI-COPILOT] Reinitializing with new API key...");
    this.apiKey = localStorage.getItem("openai_api_key");
    this.addMessage("system", "🔄 Reloaded with updated configuration");
  }
}

// Global functions for HTML event handlers
window.sendMessage = () => {
  if (window.chatbot) {
    window.chatbot.sendMessage();
  }
};

window.sendQuickMessage = (message) => {
  if (window.chatbot) {
    window.chatbot.sendMessage(message);
  }
};

window.reconnect = () => {
  if (window.chatbot) {
    window.chatbot.reconnect();
  }
};

// Expose chatbot for config panel
window.copilotApp = {
  reinitialize: () => {
    if (window.chatbot) {
      window.chatbot.reinitialize();
    }
  }
};

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("[AI-COPILOT] DOM loaded, initializing chatbot...");
  window.chatbot = new SimpleChatbot();
});

console.log("[AI-COPILOT] Client script loaded successfully");
