// Type definitions for Medical AI Chatbot

export interface ChatMessage {
  id: string;
  type: "user" | "assistant" | "system" | "error";
  content: string;
  timestamp: Date;
}

export interface PatientInfo {
  id: string;
  name: string;
  age: number;
  bloodType: string;
  allergies: string[];
  lastVisit: string;
}

export interface VitalSigns {
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  bloodSugar: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }>;
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
}

export interface OpenAIRequest {
  model: string;
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
}

export interface APIError {
  error: {
    message: string;
    type: string;
    param?: string;
    code?: string;
  };
}

export interface ServerConfig {
  port: number;
  nodeEnv: string;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime: number;
  memory: NodeJS.MemoryUsage;
  version: string;
}

export interface ServiceStatusResponse {
  service: string;
  status: string;
  features: Record<string, boolean>;
  timestamp: string;
}

// Global window extensions
declare global {
  interface Window {
    sendMessage?: () => void;
    sendQuickMessage?: (message: string) => void;
    reconnect?: () => void;
    showConfig?: () => void;
    hideConfig?: () => void;
    saveApiKey?: () => void;
    chatbot?: SimpleChatbot;
    copilotApp?: {
      reinitialize: () => void;
    };
  }
}

export interface SimpleChatbot {
  messages: ChatMessage[];
  isConnected: boolean;
  apiKey: string | null;
  initialize(): void;
  setupUI(): void;
  showWelcome(): void;
  updateConnectionStatus(status: string): void;
  sendMessage(message?: string | null): Promise<void>;
  generateResponse(message: string): Promise<string>;
  getOpenAIResponse(message: string): Promise<string>;
  addMessage(type: ChatMessage["type"], content: string): void;
  showTyping(show: boolean): void;
  reconnect(): void;
  reinitialize(): void;
}
