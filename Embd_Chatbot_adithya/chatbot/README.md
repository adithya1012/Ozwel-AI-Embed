# Medical AI Chatbot

This folder contains a standalone AI-powered chatbot interface designed for medical data management. Built with TypeScript, Express.js, and Ozwell AI integration for enhanced medical assistance.

## Features

- **Medical Data Management**: Update patient vital signs (blood pressure, blood sugar)
- **Patient Information**: View current patient data and medical history
- **Medication Management**: Add and manage patient medications
- **Ozwell AI Integration**: Enhanced AI responses when API key is configured
- **TypeScript**: Full TypeScript implementation for type safety
- **Responsive Design**: Modern, mobile-friendly interface
- **Security**: Helmet.js for security headers, CORS support

## Project Structure

```
├── src/
│   ├── server.ts      # Express server with Ozwell AI proxy
│   ├── client.ts      # Frontend chatbot logic
│   └── types.ts       # TypeScript type definitions
├── dist/              # Compiled JavaScript files
├── index.html         # Main chatbot interface
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── start.sh          # Quick startup script
```

## Quick Start

### Option 1: Using the Startup Script (Recommended)

```bash
chmod +x start.sh && ./start.sh
```

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm start
```

### Option 3: Development Mode

```bash
# Install dependencies
npm install

# Start TypeScript in watch mode (separate terminal)
npm run watch

# Start the server
npm run dev
```

## Server Access

Once the server is running, you can access the chatbot at:

- **Local**: http://localhost:3000
- **Network**: http://0.0.0.0:3000 (accessible from other devices on your network)

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/status` - Service status and features
- `GET /api/config` - Configuration information

## Docker Support

```bash
# Build Docker image
docker build -t medical-chatbot .

# Run container
docker run -p 3000:3000 medical-chatbot
```

## Environment Configuration

Create a `.env` file (copy from `.env.example`):

```bash
PORT=3000
NODE_ENV=development
```

## Files

### `index.html`

The main HTML file containing:

- Complete chat interface with modern CSS styling
- Medical-themed design with gradients and medical icons
- Quick action buttons for common medical tasks
- Ozwell AI configuration panel
- Responsive layout optimized for medical workflows

### `client.ts`

The TypeScript client application containing:

- MCP client implementation for communication with parent frames
- Ozwell AI integration for intelligent responses
- Chat UI management and message handling
- Tool detection and execution
- Mock data responses for offline functionality
- Medical-specific intent detection and responses

## Usage

### Server Mode (Recommended)

1. **Install dependencies**: `npm install`
2. **Start the server**: `npm start` or `./start.sh`
3. **Access the chatbot**: Open http://localhost:3000 in your browser
4. The chatbot will automatically connect and be ready to use

### Basic Setup (Legacy)

1. Open `index.html` in a web browser
2. The chatbot will attempt to connect to a parent dashboard
3. Use the quick action buttons or type messages to interact

### With Ozwell AI Integration

1. Click the settings (⚙️) icon in the top right
2. Enter your Ozwell AI API key
3. Click "Save" to enable enhanced AI responses
4. The connection status will show "Connected (Ozwell AI)"

### Medical Interactions

The chatbot supports various medical commands:

- **Patient Information**: "Show patient info" or "Who is the current patient?"
- **Vital Signs**: "Update blood pressure to 120/80" or "Set blood sugar to 95"
- **Medications**: "Add new medication" or "Show current medications"
- **Appointments**: "Schedule next appointment" or "When is the next visit?"

## Architecture

The chatbot uses an inverted MCP architecture where:

- The chatbot runs as an inner frame (MCP Client)
- The parent window acts as the MCP Server
- Communication happens through PostMessage API
- Tools are provided by the parent for data access

## Integration

To integrate this chatbot into your application:

1. **As an iframe**:

   ```html
   <iframe src="path/to/chatbot/index.html" width="400" height="600"></iframe>
   ```

2. **As a standalone application**:
   - Host the files on a web server
   - Ensure proper CORS configuration for Ozwell AI API calls
   - Configure the parent-child communication as needed

## Dependencies

- **@modelcontextprotocol/sdk**: For MCP client functionality
- **Ozwell AI**: For enhanced AI responses (optional)
- **Modern browser**: Supports ES modules and PostMessage API

## Customization

### Styling

Modify the CSS in `index.html` to match your application's design:

- Change colors in the gradient backgrounds
- Update medical icons and branding
- Adjust layout for different screen sizes

### Medical Logic

Update `client.ts` to add new medical functionality:

- Add new intent detection patterns
- Create custom tool handlers
- Implement domain-specific medical workflows

### Mock Data

Customize the mock responses in `getMockToolResponse()` to match your data structure and medical terminology.

## Security Notes

- Ozwell AI API keys are stored locally in browser localStorage
- Keys are never sent to external servers (except Ozwell AI)
- Use HTTPS in production for secure communication
- Validate all medical data inputs in production systems

## Development

To modify the chatbot:

1. Edit `client.ts` for functionality changes
2. Edit `index.html` for UI/styling changes
3. Test with a compatible MCP server implementation
4. Ensure proper error handling for medical workflows

## Medical Compliance

When using in production medical environments:

- Ensure HIPAA compliance for patient data
- Implement proper authentication and authorization
- Add audit logging for all medical data changes
- Follow medical device software regulations if applicable
- Include appropriate disclaimers and warnings
