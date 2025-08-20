/**
 * Ozwel AI Chatbot - Main Entry Point
 *
 * This is the main client-side application that initializes the Ozwel AI chatbot.
 * The chatbot can be embedded in any webpage via iframe or script tag.
 */

import { OzwelAIChatbot } from "./chatbot/chatbot";
import "./style.css";

console.log("[OZWEL-AI] Initializing Ozwel AI Chatbot...");

// Initialize the chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("[OZWEL-AI] DOM loaded, starting chatbot...");

  // Create chatbot instance
  const chatbot = new OzwelAIChatbot();

  // Expose globally for external integration
  (window as any).OzwelAI = {
    chatbot,
    version: "1.0.0",
    init: () => chatbot.initialize(),
  };

  console.log("[OZWEL-AI] Chatbot initialized and ready!");
});
