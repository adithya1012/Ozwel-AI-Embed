/**
 * Ozwell AI Embed - Production iframe component
 * This script creates and manages the Ozwell AI chatbot iframe
 */

class OzwellIframe {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || 'ozwell-chatbot',
            width: options.width || '400px',
            height: options.height || '600px',
            position: options.position || 'fixed',
            bottom: options.bottom || '20px',
            right: options.right || '20px',
            zIndex: options.zIndex || 1000,
            ...options
        };
        
        this.iframe = null;
        this.isOpen = false;
        this.initialize();
    }

    initialize() {
        this.createContainer();
        this.createIframe();
        this.setupEventListeners();
    }

    createContainer() {
        // Create or find the container
        let container = document.getElementById(this.options.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.options.containerId;
            document.body.appendChild(container);
        }

        // Style the container
        container.style.cssText = `
            position: ${this.options.position};
            bottom: ${this.options.bottom};
            right: ${this.options.right};
            width: ${this.options.width};
            height: ${this.options.height};
            z-index: ${this.options.zIndex};
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            transition: all 0.3s ease;
            display: none;
        `;

        this.container = container;
    }

    createIframe() {
        this.iframe = document.createElement('iframe');
        this.iframe.src = this.getIframeSrc();
        this.iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 12px;
        `;
        this.iframe.allow = 'microphone; camera';
        this.iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups';
        
        this.container.appendChild(this.iframe);
    }

    getIframeSrc() {
        // In production, this would point to your hosted iframe
        // For now, using relative path for local development
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
        return `${baseUrl}/src/components/index.html`;
    }

    setupEventListeners() {
        // Listen for messages from the iframe
        window.addEventListener('message', (event) => {
            if (event.source === this.iframe.contentWindow) {
                this.handleIframeMessage(event.data);
            }
        });
    }

    handleIframeMessage(data) {
        switch (data.type) {
            case 'iframe-ready':
                console.log('Ozwell iframe is ready');
                break;
            case 'resize':
                this.resize(data.width, data.height);
                break;
            case 'close':
                this.hide();
                break;
            default:
                console.log('Received message from iframe:', data);
        }
    }

    show() {
        this.container.style.display = 'block';
        this.isOpen = true;
        // Send message to iframe that it's now visible
        this.postMessage({ type: 'show' });
    }

    hide() {
        this.container.style.display = 'none';
        this.isOpen = false;
        // Send message to iframe that it's now hidden
        this.postMessage({ type: 'hide' });
    }

    toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    resize(width, height) {
        if (width) this.container.style.width = width;
        if (height) this.container.style.height = height;
    }

    postMessage(message) {
        if (this.iframe && this.iframe.contentWindow) {
            this.iframe.contentWindow.postMessage(message, '*');
        }
    }

    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.iframe = null;
        this.container = null;
    }
}

// Global function to create Ozwell chatbot
window.createOzwellChatbot = function(options = {}) {
    return new OzwellIframe(options);
};

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
    const autoInit = document.querySelector('[data-ozwell-auto-init]');
    if (autoInit) {
        const options = {
            containerId: autoInit.getAttribute('data-container-id') || undefined,
            width: autoInit.getAttribute('data-width') || undefined,
            height: autoInit.getAttribute('data-height') || undefined,
            position: autoInit.getAttribute('data-position') || undefined,
            bottom: autoInit.getAttribute('data-bottom') || undefined,
            right: autoInit.getAttribute('data-right') || undefined,
        };
        
        // Clean up undefined values
        Object.keys(options).forEach(key => {
            if (options[key] === undefined) delete options[key];
        });
        
        window.ozwellChatbot = new OzwellIframe(options);
    }
});

export default OzwellIframe;
