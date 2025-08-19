# Ozwell AI Embed - Deployment Guide

## 🚀 Production Deployment

### Build Process

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to CDN**
   Upload the `dist/` folder contents to your CDN or static hosting service.

### CDN Integration

Update the iframe source URL in production:

```javascript
// In src/ozwell-iframe.js, update getIframeSrc() method:
getIframeSrc() {
    // Production CDN URL
    return 'https://cdn.ozwell.ai/embed/iframe.html';
    
    // Or relative path for same-domain deployment
    // return '/ozwell-embed/iframe.html';
}
```

### CORS Configuration

Ensure your server allows iframe embedding:

```nginx
# Nginx configuration
add_header X-Frame-Options "ALLOWALL";
add_header Content-Security-Policy "frame-ancestors *;";
```

```apache
# Apache configuration
Header always set X-Frame-Options "ALLOWALL"
Header always set Content-Security-Policy "frame-ancestors *;"
```

### Environment Variables

For production deployment, set these environment variables:

```bash
OZWELL_API_URL=https://api.ozwell.ai
OZWELL_IFRAME_URL=https://cdn.ozwell.ai/embed/iframe.html
NODE_ENV=production
```

## 🔧 Integration Examples

### Basic Integration
```html
<script src="https://cdn.ozwell.ai/embed/ozwell-iframe.js"></script>
<script>
  const chatbot = createOzwellChatbot();
  chatbot.show();
</script>
```

### WordPress Integration
```php
// Add to functions.php
function add_ozwell_chatbot() {
    wp_enqueue_script('ozwell-embed', 'https://cdn.ozwell.ai/embed/ozwell-iframe.js', array(), '1.0.0', true);
    wp_add_inline_script('ozwell-embed', '
        document.addEventListener("DOMContentLoaded", function() {
            const chatbot = createOzwellChatbot({
                width: "350px",
                height: "500px"
            });
        });
    ');
}
add_action('wp_enqueue_scripts', 'add_ozwell_chatbot');
```

### React Integration
```jsx
import { useEffect, useRef } from 'react';

function OzwellChatbot({ config = {} }) {
    const chatbotRef = useRef(null);
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.ozwell.ai/embed/ozwell-iframe.js';
        script.onload = () => {
            chatbotRef.current = window.createOzwellChatbot(config);
        };
        document.head.appendChild(script);
        
        return () => {
            if (chatbotRef.current) {
                chatbotRef.current.destroy();
            }
        };
    }, []);
    
    return null;
}
```

### Vue.js Integration
```vue
<template>
  <div></div>
</template>

<script>
export default {
  name: 'OzwellChatbot',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.loadChatbot();
  },
  beforeDestroy() {
    if (this.chatbot) {
      this.chatbot.destroy();
    }
  },
  methods: {
    loadChatbot() {
      const script = document.createElement('script');
      script.src = 'https://cdn.ozwell.ai/embed/ozwell-iframe.js';
      script.onload = () => {
        this.chatbot = window.createOzwellChatbot(this.config);
      };
      document.head.appendChild(script);
    }
  }
};
</script>
```

## 📊 Analytics & Monitoring

### Track Usage
```javascript
const chatbot = createOzwellChatbot({
  onShow: () => analytics.track('chatbot_shown'),
  onHide: () => analytics.track('chatbot_hidden'),
  onMessage: (message) => analytics.track('chatbot_message', { message })
});
```

### Performance Monitoring
```javascript
// Monitor load performance
const startTime = performance.now();
const chatbot = createOzwellChatbot();
const loadTime = performance.now() - startTime;
console.log(`Chatbot load time: ${loadTime}ms`);
```

## 🛡️ Security Considerations

1. **Content Security Policy**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="frame-src https://cdn.ozwell.ai; script-src 'self' https://cdn.ozwell.ai;">
   ```

2. **Iframe Sandboxing**
   The iframe automatically includes sandbox attributes for security.

3. **Message Validation**
   All postMessage communications include type validation and origin checking.

## 🔄 Updates & Versioning

### Semantic Versioning
- Major: Breaking changes to API
- Minor: New features, backward compatible
- Patch: Bug fixes, performance improvements

### Update Strategy
```javascript
// Pin to specific version for stability
<script src="https://cdn.ozwell.ai/embed/v1.0.0/ozwell-iframe.js"></script>

// Use latest for automatic updates (not recommended for production)
<script src="https://cdn.ozwell.ai/embed/latest/ozwell-iframe.js"></script>
```

## 📞 Support & Documentation

- API Documentation: https://docs.ozwell.ai/embed
- Support: support@ozwell.ai
- Status Page: https://status.ozwell.ai
- GitHub: https://github.com/ozwell/ai-embed
