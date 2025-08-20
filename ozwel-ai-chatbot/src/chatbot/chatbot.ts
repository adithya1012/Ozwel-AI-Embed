/**
 * Ozwel AI Chatbot - Core Implementation
 * TypeScript implementation with clean architecture
 */

import type {
  ChatMessage,
  OpenAIResponse,
  OzwelAIChatbot as IOzwelAIChatbot,
} from "./types";

console.log("[OZWEL-AI] Loading Medical AI Chatbot...");

// Medical AI Chatbot implementation
export class OzwelAIChatbot implements IOzwelAIChatbot {
  public messages: ChatMessage[] = [];
  public isConnected: boolean = false;
  public apiKey: string | null = null;

  constructor() {
    this.apiKey = localStorage.getItem("openai_api_key");
    this.initialize();
  }

  public initialize(): void {
    console.log("[OZWEL-AI] Initializing chatbot...");
    this.setupUI();
    this.showWelcome();

    // Check if we have an API key and update status accordingly
    if (this.apiKey && this.apiKey.startsWith("sk-")) {
      this.updateConnectionStatus("Connected (Ozwel AI)");
    } else {
      this.updateConnectionStatus("Connected");
    }

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

    // Setup global event handlers
    this.setupGlobalHandlers();
  }

  private setupGlobalHandlers(): void {
    // Global functions for HTML event handlers
    window.sendMessage = (): void => {
      this.sendMessage();
    };

    window.sendQuickMessage = (message: string): void => {
      this.sendMessage(message);
    };

    window.reconnect = (): void => {
      this.reconnect();
    };

    // Expose chatbot for config panel
    window.chatbot = this;
    window.copilotApp = {
      reinitialize: (): void => {
        this.reinitialize();
      },
    };
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
      console.error("[OZWEL-AI] Error generating response:", error);
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
        console.log("[OZWEL-AI] Using OpenAI API for response...");
        return await this.getOpenAIResponse(message);
      } catch (error) {
        console.log(
          "[OZWEL-AI] OpenAI request failed, using fallback response"
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

💡 *To enable enhanced AI responses, click the ⚙️ settings icon and add your Ozwel AI API key.*`;
  }

  public async getOpenAIResponse(message: string): Promise<string> {
    // Use the server proxy to call OpenAI API
    const apiKey = this.apiKey;

    if (!apiKey || !apiKey.startsWith("sk-")) {
      throw new Error("Invalid API key");
    }

    try {
      // First check if server is available
      const serverAvailable = await this.checkServerAvailability();
      
      if (!serverAvailable) {
        console.log("[OZWEL-AI] Server not available, calling OpenAI directly");
        return await this.callOpenAIDirectly(message, apiKey);
      }

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
        // If server proxy fails, try direct call as fallback
        console.log("[OZWEL-AI] Server proxy failed, trying direct call");
        return await this.callOpenAIDirectly(message, apiKey);
      }

      // Handle potential JSON parsing errors
      let data: OpenAIResponse;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.log("[OZWEL-AI] Failed to parse server response, trying direct call");
        return await this.callOpenAIDirectly(message, apiKey);
      }

      if (data.choices && data.choices.length > 0) {
        return `🤖 **AI Assistant Response:**

${data.choices[0].message.content}

---
*Powered by Ozwel AI*`;
      } else {
        throw new Error("No response from OpenAI");
      }
    } catch (error) {
      console.error("[OZWEL-AI] OpenAI API Error:", error);

      // Handle specific error types
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("401")) {
        return `❌ **Authentication Error**

Your Ozwel AI API key appears to be invalid. Please check your API key in the settings (⚙️) and make sure it's correct.

Error: ${errorMessage}`;
      } else if (errorMessage.includes("429")) {
        return `⚠️ **Rate Limit Exceeded**

You've exceeded your Ozwel AI API rate limit. Please wait a moment before trying again.

Error: ${errorMessage}`;
      } else if (errorMessage.includes("quota")) {
        return `💳 **Quota Exceeded**

Your Ozwel AI API quota has been exceeded. Please check your Ozwel AI account billing.

Error: ${errorMessage}`;
      } else if (errorMessage.includes("Server unavailable")) {
        return `🔧 **Server Configuration Required**

To use enhanced AI responses, you need to start the server component:

\`\`\`bash
npm run server:dev
\`\`\`

Or deploy the chatbot with server capabilities. Until then, I'll use my built-in medical knowledge to help you.

Error: ${errorMessage}`;
      } else {
        return `🔧 **API Connection Error**

Unable to connect to Ozwel AI API. This could be due to:
- Network connectivity issues
- API service issues
- Server configuration problems

Error: ${errorMessage}

*Falling back to built-in responses...*`;
      }
    }
  }

  private async checkServerAvailability(): Promise<boolean> {
    try {
      // Create a timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
      
      const response = await fetch('/health', { 
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log("[OZWEL-AI] Server health check failed:", error);
      return false;
    }
  }

  private async callOpenAIDirectly(message: string, apiKey: string): Promise<string> {
    // Note: Direct OpenAI calls from browser will fail due to CORS
    // This is here as a fallback but will likely throw an error
    console.warn("[OZWEL-AI] Attempting direct OpenAI call - this may fail due to CORS restrictions");
    
    const openaiRequest = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system" as const,
          content: `You are a Medical AI Assistant specializing in patient data management and medical information. You help healthcare professionals with:
- Patient information management
- Vital signs tracking and updates
- Medication management
- Medical record keeping
- Healthcare data analysis

Current patient context: John Doe (ID: P001), 45 years old, Blood Type O+, Allergies: Penicillin
Current vitals: BP 120/80, HR 72, Temp 98.6°F, Blood Sugar 95 mg/dL

Be helpful, professional, and focus on medical/healthcare topics. If asked about non-medical topics, politely redirect to medical assistance.`,
        },
        {
          role: "user" as const,
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(openaiRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `OpenAI API Error: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data: OpenAIResponse = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return `🤖 **AI Assistant Response:**

${data.choices[0].message.content}

---
*Powered by Ozwel AI (Direct Connection)*`;
      } else {
        throw new Error("No response from OpenAI");
      }
    } catch (error) {
      // CORS or other network error - this is expected when calling from browser
      console.log("[OZWEL-AI] Direct OpenAI call failed (expected due to CORS):", error);
      throw new Error("Server unavailable and direct OpenAI calls are blocked by CORS. Please start the server component or use the built-in responses.");
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
    console.log("[OZWEL-AI] Reinitializing with new API key...");
    this.apiKey = localStorage.getItem("openai_api_key");

    if (this.apiKey && this.apiKey.startsWith("sk-")) {
      this.updateConnectionStatus("Connected (Ozwel AI)");
      this.addMessage(
        "system",
        "🔄 Ozwel AI API key updated! Enhanced AI responses are now enabled."
      );
    } else {
      this.updateConnectionStatus("Connected");
      this.addMessage(
        "system",
        "🔄 Configuration updated. Using built-in medical responses."
      );
    }
  }
}

console.log("[OZWEL-AI] Chatbot class loaded successfully");
