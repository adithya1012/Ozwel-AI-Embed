# Ozwell AI Embed - Medical Chatbot Integration

A proof of concept for embedding Ozwell AI medical chatbot via iframe on any webpage using a simple script tag.

## 📁 Project Structure

```
agent/
├── src/                          # Production code
│   ├── components/               # Iframe components
│   │   ├── index.html           # Main chatbot interface
│   │   ├── styles.css           # Chatbot styling
│   │   └── favicon.svg          # Chatbot icon
│   ├── lib/                     # Core libraries
│   │   ├── mcp-client.js        # MCP protocol client
│   │   ├── llm-manager.js       # LLM provider management
│   │   ├── ozwell-integration.js # Ozwell API integration
│   │   ├── medical-data.js      # Medical data handling
│   │   └── medical-mcp-server.js # Medical MCP server
│   ├── main.js                  # Main initialization
│   └── ozwell-iframe.js         # Production iframe manager
├── test/
│   └── demo/
│       └── index.html           # Full demo test page
├── examples/
│   └── simple-integration.html  # Minimal integration example
└── package.json
```

## 🚀 Quick Start

### Simple Integration (Recommended for POC)

Add these two script tags to any webpage:

```html
<script src="path/to/ozwell-iframe.js"></script>
<script>
  const chatbot = createOzwellChatbot();
  chatbot.show();
</script>
```

### Advanced Configuration

```html
<script src="path/to/ozwell-iframe.js"></script>
<script>
  const chatbot = createOzwellChatbot({
    width: '400px',
    height: '600px',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    containerId: 'my-chatbot'
  });
  
  // Control the chatbot
  chatbot.show();    // Show the chatbot
  chatbot.hide();    // Hide the chatbot
  chatbot.toggle();  // Toggle visibility
</script>
```

### Auto-Initialization with Data Attributes

```html
<div data-ozwell-auto-init
     data-width="350px"
     data-height="500px"
     data-position="fixed"
     data-bottom="20px"
     data-right="20px">
</div>
<script src="path/to/ozwell-iframe.js"></script>
```

## 🧪 Testing & Validation

### Run the Demo Page

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the comprehensive demo:
   ```
   http://localhost:5173/test/demo/index.html
   ```

3. Or try the simple integration example:
   ```
   http://localhost:5173/examples/simple-integration.html
   ```

### Test Features

The demo pages allow you to test:

- ✅ **Script Tag Integration** - Single script inclusion
- ✅ **Iframe Security** - Sandboxed execution
- ✅ **Responsive Design** - Mobile and desktop compatibility
- ✅ **Medical AI Features** - Healthcare-specific functionality
- ✅ **Customization Options** - Size, position, styling
- ✅ **Event Handling** - Show/hide/toggle controls
- ✅ **Auto-initialization** - Data attribute configuration

## 🏗️ Development

### File Organization

- **`src/`** - Production-ready code that can be deployed
- **`test/demo/`** - Comprehensive test page with all features
- **`examples/`** - Simple integration examples for documentation
- **`src/components/`** - Iframe UI components
- **`src/lib/`** - Core libraries and utilities

### Key Benefits of This Structure

1. **Clear Separation** - Production code vs testing/demo code
2. **Easy Integration** - Single script tag for embedding
3. **Isolated Testing** - Dedicated test environment
4. **Reproducible Validation** - Standalone demo pages
5. **Documentation** - Live examples for integration

### Build and Deploy

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | `'ozwell-chatbot'` | DOM element ID for the chatbot container |
| `width` | string | `'400px'` | Width of the chatbot iframe |
| `height` | string | `'600px'` | Height of the chatbot iframe |
| `position` | string | `'fixed'` | CSS position (fixed, absolute, relative) |
| `bottom` | string | `'20px'` | Distance from bottom of viewport |
| `right` | string | `'20px'` | Distance from right of viewport |
| `zIndex` | number | `1000` | CSS z-index for layering |

## 🏥 Medical Features

The chatbot includes specialized medical capabilities:

- Medication management and interactions
- Allergy tracking and alerts  
- Patient information management
- Medical terminology assistance
- Healthcare provider integration

## 🔒 Security

- Iframe sandboxing for secure execution
- Message-based communication between parent and iframe
- No direct DOM access from embedded code
- CORS-compliant resource loading

## 📝 Usage Examples

See the `/examples/` directory for:
- Simple integration example
- Custom styling example
- Event handling example
- Multiple chatbot instances

## 🚀 Deployment

For production deployment:

1. Host the `src/` directory on your CDN
2. Update iframe source URLs in `ozwell-iframe.js`
3. Configure CORS headers for cross-origin embedding
4. Test integration across target domains

## 📞 API Reference

### OzwellIframe Class

```javascript
const chatbot = new OzwellIframe(options);

// Methods
chatbot.show()           // Show the chatbot
chatbot.hide()           // Hide the chatbot  
chatbot.toggle()         // Toggle visibility
chatbot.resize(w, h)     // Resize the iframe
chatbot.postMessage(msg) // Send message to iframe
chatbot.destroy()        // Remove from DOM
```

### Global Functions

```javascript
window.createOzwellChatbot(options) // Create new chatbot instance
```

This structure provides a clear separation between production code and testing implementations, making it easy to validate the integration and showcase the chatbot's functionality in isolation.
