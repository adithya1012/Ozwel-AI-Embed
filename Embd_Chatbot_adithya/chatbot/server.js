import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.skypack.dev"],
      scriptSrcAttr: ["'unsafe-inline'"], // Allow inline event handlers
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.openai.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"]
    }
  }
}));

// CORS middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] // Replace with your production domain
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(__dirname, {
  index: 'index.html',
  setHeaders: (res, path) => {
    // Set proper MIME types
    if (path.endsWith('.ts')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API endpoint for chatbot status
app.get('/api/status', (req, res) => {
  res.json({
    service: 'Medical AI Chatbot',
    status: 'running',
    features: {
      medicalDataManagement: true,
      patientInformation: true,
      medicationManagement: true,
      openAIIntegration: true,
      realTimeCommunication: true
    },
    timestamp: new Date().toISOString()
  });
});

// API endpoint for configuration
app.get('/api/config', (req, res) => {
  res.json({
    name: 'Medical AI Chatbot',
    version: '1.0.0',
    features: ['MCP Protocol', 'OpenAI Integration', 'Medical Data Management'],
    supportedActions: [
      'patient-info',
      'vital-signs',
      'medication-management',
      'blood-pressure',
      'blood-sugar'
    ]
  });
});

// Catch-all handler: send back index.html file for SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

const server = app.listen(PORT, () => {
  console.log('🏥 Medical AI Chatbot Server Starting...');
  console.log('=====================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Local access: http://localhost:${PORT}`);
  console.log(`🌐 Network access: http://0.0.0.0:${PORT}`);
  console.log(`💊 Health check: http://localhost:${PORT}/health`);
  console.log(`⚕️ API status: http://localhost:${PORT}/api/status`);
  console.log('=====================================');
  console.log('Server ready to accept connections!');
});

export default app;
