import express, { Request, Response, NextFunction } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import type {
  ServerConfig,
  HealthCheckResponse,
  ServiceStatusResponse,
  OpenAIRequest,
  OpenAIResponse,
  APIError,
} from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const config: ServerConfig = {
  port: parseInt(process.env.PORT || "3000"),
  nodeEnv: process.env.NODE_ENV || "development",
};

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdn.skypack.dev",
        ],
        scriptSrcAttr: ["'unsafe-inline'"], // Allow inline event handlers
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.openai.com"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
    },
  })
);

// CORS middleware
app.use(
  cors({
    origin:
      config.nodeEnv === "production"
        ? ["https://your-domain.com"] // Replace with your production domain
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from parent directory (where index.html is located)
app.use(
  express.static(join(__dirname, ".."), {
    index: "index.html",
    setHeaders: (res: Response, path: string) => {
      // Set proper MIME types
      if (path.endsWith(".ts")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  const healthResponse: HealthCheckResponse = {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || "1.0.0",
  };
  res.json(healthResponse);
});

// API endpoint for OpenAI proxy
app.post("/api/openai/chat", async (req: Request, res: Response) => {
  try {
    const { message, apiKey }: { message: string; apiKey: string } = req.body;

    if (!apiKey || !apiKey.startsWith("sk-")) {
      return res.status(400).json({ error: "Invalid API key" });
    }

    const openaiRequest: OpenAIRequest = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
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
          role: "user",
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    };

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(openaiRequest),
      }
    );

    if (!openaiResponse.ok) {
      const errorData: APIError = await openaiResponse.json();
      return res.status(openaiResponse.status).json({
        error: `Ozwell AI API Error: ${
          errorData.error?.message || "Unknown error"
        }`,
      });
    }

    const data: OpenAIResponse = await openaiResponse.json();
    res.json(data);
  } catch (error) {
    console.error("OpenAI proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint for chatbot status
app.get("/api/status", (req: Request, res: Response) => {
  const statusResponse: ServiceStatusResponse = {
    service: "Medical AI Chatbot",
    status: "running",
    features: {
      medicalDataManagement: true,
      patientInformation: true,
      medicationManagement: true,
      ozwellAIIntegration: true,
      realTimeCommunication: true,
    },
    timestamp: new Date().toISOString(),
  };
  res.json(statusResponse);
});

// API endpoint for configuration
app.get("/api/config", (req: Request, res: Response) => {
  res.json({
    name: "Medical AI Chatbot",
    version: "1.0.0",
    features: [
      "MCP Protocol",
      "Ozwell AI Integration",
      "Medical Data Management",
    ],
    supportedActions: [
      "patient-info",
      "vital-signs",
      "medication-management",
      "blood-pressure",
      "blood-sugar",
    ],
  });
});

// Catch-all handler: send back index.html file for SPA routing
app.get("*", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "..", "index.html"));
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      config.nodeEnv === "development" ? err.message : "Internal server error",
  });
});

// Handle 404 errors
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

const server = app.listen(config.port, () => {
  console.log("🏥 Medical AI Chatbot Server Starting...");
  console.log("=====================================");
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`📱 Local access: http://localhost:${config.port}`);
  console.log(`🌐 Network access: http://0.0.0.0:${config.port}`);
  console.log(`💊 Health check: http://localhost:${config.port}/health`);
  console.log(`⚕️ API status: http://localhost:${config.port}/api/status`);
  console.log("=====================================");
  console.log("Server ready to accept connections!");
});

export default app;
