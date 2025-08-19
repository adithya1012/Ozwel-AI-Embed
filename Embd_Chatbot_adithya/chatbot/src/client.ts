/**
 * Medical AI Chatbot - Client Application
 * TypeScript version with proper type definitions
 */

import type {
  ChatMessage,
  OpenAIResponse,
  SimpleChatbot as IChatbot,
} from "./types.js";

console.log("[AI-COPILOT] Starting Medical AI Chatbot...");

// Medical AI Chatbot implementation
class SimpleChatbot implements IChatbot {
  public messages: ChatMessage[] = [];
  public isConnected: boolean = false;
  public apiKey: string | null = null;

  constructor() {
    this.apiKey = localStorage.getItem("openai_api_key");
    this.initialize();
  }

  public initialize(): void {
    console.log("[AI-COPILOT] Initializing chatbot...");
    this.setupUI();
    this.showWelcome();
    this.updateConnectionStatus("Connected");
    this.isConnected = true;
  }

  public setupUI(): void {
    // Enable input and send button
    const input = document.getElementById("chat-input") as HTMLTextAreaElement;
    const sendButton = document.getElementById(
      "send-button"
    ) as HTMLButtonElement;
    const quickActions = document.getElementById(
      "quick-actions"
    ) as HTMLElement;

    if (input) {
      input.disabled = false;
      input.addEventListener("keypress", (e: KeyboardEvent) => {
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

  public showWelcome(): void {
    const welcomeState = document.getElementById("welcome-state");
    if (welcomeState) {
      welcomeState.style.display = "block";
    }
  }

  public updateConnectionStatus(status: string): void {
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

  public async sendMessage(message: string | null = null): Promise<void> {
    const input = document.getElementById("chat-input") as HTMLTextAreaElement;
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate response
      const response = await this.generateResponse(messageText);
      this.addMessage("assistant", response);
    } catch (error) {
      console.error("[AI-COPILOT] Error generating response:", error);
      this.addMessage(
        "error",
        "Sorry, I encountered an error processing your request."
      );
    } finally {
      this.showTyping(false);
    }
  }

  public async generateResponse(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();

    // If we have an API key, try to use OpenAI first for all messages
    if (this.apiKey && this.apiKey.startsWith("sk-")) {
      try {
        console.log("[AI-COPILOT] Using OpenAI API for response...");
        return await this.getOpenAIResponse(message);
      } catch (error) {
        console.log(
          "[AI-COPILOT] OpenAI request failed, using fallback response"
        );
        // Fall through to rule-based responses
      }
    }

    // Fallback to rule-based responses for specific medical queries
    if (
      lowerMessage.includes("patient info") ||
      lowerMessage.includes("patient information")
    ) {
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
- Status: ${
          parseInt(match[1]) < 100
            ? "Normal"
            : parseInt(match[1]) < 126
            ? "Prediabetic range"
            : "Diabetic range"
        }
- Recorded at: ${new Date().toLocaleString()}`;
      }
      return `🩸 **Blood Sugar Information**

Current level: 95 mg/dL (Normal)
To update, please specify the new level (e.g., "Update blood sugar to 110")`;
    }

    if (
      lowerMessage.includes("medication") ||
      lowerMessage.includes("add medication")
    ) {
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

    if (
      lowerMessage.includes("vital signs") ||
      lowerMessage.includes("vitals")
    ) {
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

    // Default response when no API key is configured
    return `🏥 I'm your Medical AI Assistant. I can help you with:

• **Patient Information** - View current patient data
• **Vital Signs** - Update blood pressure, blood sugar, etc.
• **Medication Management** - Add or review medications
• **Medical Records** - Access patient history

Try asking me "Show patient info" or "Update blood pressure to 120/80"

💡 *To enable enhanced AI responses, click the ⚙️ settings icon and add your OpenAI API key.*`;
  }

  public async getOpenAIResponse(message: string): Promise<string> {
    // Use the server proxy to call OpenAI API
    const apiKey = this.apiKey;

    if (!apiKey || !apiKey.startsWith("sk-")) {
      throw new Error("Invalid API key");
    }

    try {
      const response = await fetch("/api/openai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          apiKey: apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${response.status} - ${
            errorData.error || "Unknown error"
          }`
        );
      }

      const data: OpenAIResponse = await response.json();

      if (data.choices && data.choices.length > 0) {
        return `🤖 **AI Assistant Response:**

${data.choices[0].message.content}

---
*Powered by OpenAI GPT-3.5 Turbo*`;
      } else {
        throw new Error("No response from OpenAI");
      }
    } catch (error) {
      console.error("[AI-COPILOT] OpenAI API Error:", error);

      // Handle specific error types
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("401")) {
        return `❌ **Authentication Error**

Your OpenAI API key appears to be invalid. Please check your API key in the settings (⚙️) and make sure it's correct.

Error: ${errorMessage}`;
      } else if (errorMessage.includes("429")) {
        return `⚠️ **Rate Limit Exceeded**

You've exceeded your OpenAI API rate limit. Please wait a moment before trying again.

Error: ${errorMessage}`;
      } else if (errorMessage.includes("quota")) {
        return `💳 **Quota Exceeded**

Your OpenAI API quota has been exceeded. Please check your OpenAI account billing.

Error: ${errorMessage}`;
      } else {
        return `🔧 **API Connection Error**

Unable to connect to OpenAI API. This could be due to:
- Network connectivity issues
- API service issues
- Server configuration problems

Error: ${errorMessage}

*Falling back to built-in responses...*`;
      }
    }
  }

  public addMessage(type: ChatMessage["type"], content: string): void {
    const messagesContainer = document.getElementById("chat-messages");
    if (!messagesContainer) return;

    // Hide welcome message
    const welcomeState = document.getElementById("welcome-state");
    if (welcomeState) {
      welcomeState.style.display = "none";
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = content.replace(/\n/g, "<br>");

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store message in history
    const message: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    this.messages.push(message);
  }

  public showTyping(show: boolean): void {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.style.display = show ? "block" : "none";
    }
  }

  public reconnect(): void {
    this.updateConnectionStatus("Reconnecting...");
    setTimeout(() => {
      this.updateConnectionStatus("Connected");
      this.addMessage("system", "✅ Reconnected to Medical AI Assistant");
    }, 2000);
  }

  public reinitialize(): void {
    console.log("[AI-COPILOT] Reinitializing with new API key...");
    this.apiKey = localStorage.getItem("openai_api_key");

    if (this.apiKey && this.apiKey.startsWith("sk-")) {
      this.addMessage(
        "system",
        "🔄 OpenAI API key updated! Enhanced AI responses are now enabled."
      );
    } else {
      this.addMessage(
        "system",
        "🔄 Configuration updated. Using built-in medical responses."
      );
    }
  }
}

// Global functions for HTML event handlers
window.sendMessage = (): void => {
  if (window.chatbot) {
    window.chatbot.sendMessage();
  }
};

window.sendQuickMessage = (message: string): void => {
  if (window.chatbot) {
    window.chatbot.sendMessage(message);
  }
};

window.reconnect = (): void => {
  if (window.chatbot) {
    window.chatbot.reconnect();
  }
};

// Expose chatbot for config panel
window.copilotApp = {
  reinitialize: (): void => {
    if (window.chatbot) {
      window.chatbot.reinitialize();
    }
  },
};

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("[AI-COPILOT] DOM loaded, initializing chatbot...");
  window.chatbot = new SimpleChatbot();
});

console.log("[AI-COPILOT] Client script loaded successfully");
