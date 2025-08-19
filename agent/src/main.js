// Main initialization script for Medical MCP Agent
console.log('*** Initializing Medical MCP Agent ***');

// Global reference to MCP client for configuration modal access
window.mcpClient = null;

// Initialize MCP Client when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('*** DOM loaded, creating MCP Client ***');
    
    // Create and initialize the MCP client
    window.mcpClient = new MCPClient();
    
    console.log('*** MCP Client initialized ***');
    
    // Notify parent window that iframe is ready
    if (window.parent !== window) {
        window.parent.postMessage({ type: 'iframe-ready' }, '*');
        console.log('*** Sent iframe-ready message to parent ***');
    }
});

// Listen for messages from parent about tools context
window.addEventListener('message', (event) => {
    if (event.data.type === 'mcp-tools-context') {
        console.log('*** Main.js received tools context message ***', event.data.toolsContext);
        // The tools context has been passed to Ozwell via the MCP client
    } else if (event.data.type === 'show') {
        console.log('*** Iframe is now visible ***');
        // Handle iframe becoming visible (e.g., resume any paused processes)
    } else if (event.data.type === 'hide') {
        console.log('*** Iframe is now hidden ***');
        // Handle iframe being hidden (e.g., pause unnecessary processes)
    }
});

console.log('*** Main.js loaded ***');
