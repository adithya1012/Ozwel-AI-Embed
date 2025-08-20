# 🏥 Ozwel AI Embed

**Embeddable Medical AI Assistant for Patient Data Management**

A comprehensive solution for integrating intelligent medical AI assistance into healthcare applications, EMR systems, and patient portals.

## 🎯 Project Overview

This repository provides a production-ready, embeddable AI chatbot specifically designed for healthcare environments. The chatbot can be easily integrated into existing healthcare applications through multiple methods including iframe embedding, script tag integration, or as an NPM package.

## ✨ Key Features

- **🏥 Medical-Focused AI**: Specialized for patient data management, vital signs tracking, and medication management
- **🔌 Multiple Integration Methods**: Iframe, script tag, or NPM package integration
- **🤖 OpenAI Integration**: Enhanced AI responses with configurable API integration
- **📱 Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **🔒 Security-First**: Local API key storage, CORS protection, and secure data handling
- **⚡ High Performance**: Lightweight bundle with optimized loading and rendering
- **🎨 Customizable**: Configurable styling and behavior to match your application

## 🚀 Quick Start

### For End Users (Integration)

1. **Iframe Integration** (Recommended for quick setup):

   ```html
   <iframe
     src="https://your-domain.com/ozwel-ai-chatbot"
     width="400"
     height="600"
     title="Ozwel AI Assistant"
   >
   </iframe>
   ```

2. **Script Tag Integration** (For custom styling):
   ```html
   <script src="https://your-domain.com/ozwel-ai-chatbot.js"></script>
   <script>
     document.addEventListener("DOMContentLoaded", () => {
       if (window.OzwelAI) window.OzwelAI.init();
     });
   </script>
   ```

### For Developers

```bash
# Clone the repository
git clone https://github.com/your-org/ozwel-ai-embed.git
cd ozwel-ai-embed/ozwel-ai-chatbot

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Repository Structure

```
ozwel-ai-embed/
├── ozwel-ai-chatbot/           # Main chatbot application (Vite + TypeScript)
│   ├── src/                    # Source code
│   │   ├── chatbot/           # Core chatbot implementation
│   │   └── main.ts            # Application entry point
│   ├── server/                # Optional server component
│   ├── demo/                  # Demo and test pages
│   ├── dist/                  # Built files (generated)
│   └── README.md              # Detailed chatbot documentation
├── README.md                  # This file (project overview)
└── .gitignore                # Git ignore rules
```

## 🧪 Demo & Testing

### Live Demo

```bash
cd ozwel-ai-chatbot
npm install
npm run preview
# Visit http://localhost:4173/demo/
```

The demo includes:

- **Interactive Chatbot Demo**: Full chatbot functionality with sample patient data
- **Integration Examples**: Code samples for different integration methods
- **API Testing**: Built-in tools to test API endpoints and connectivity
- **Feature Showcase**: Demonstration of all chatbot capabilities

### Integration Testing

```bash
# Test script tag integration
npm run preview
# Visit http://localhost:4173/demo/script-tag-test.html
```

## 🔧 Integration Options

| Method          | Best For                           | Pros                      | Cons                   |
| --------------- | ---------------------------------- | ------------------------- | ---------------------- |
| **Iframe**      | Quick deployment, isolated styling | Easy setup, no conflicts  | Limited customization  |
| **Script Tag**  | Custom styling, native integration | Full control, lightweight | Requires more setup    |
| **NPM Package** | Modern build tools, TypeScript     | Type safety, tree shaking | Build process required |

## 📋 Use Cases

### Healthcare Applications

- **EMR Integration**: Embed in electronic medical record systems
- **Patient Portals**: Add AI assistance to patient-facing applications
- **Telemedicine**: Enhance virtual consultation platforms
- **Clinical Workflows**: Streamline data entry and patient management

### Technical Integration

- **Hospital Information Systems**: Native integration with HIS platforms
- **Mobile Health Apps**: Responsive design for mobile applications
- **Web Applications**: Easy embedding in existing web platforms
- **Custom Dashboards**: Integration with custom healthcare dashboards

## 🛠️ Development Workflow

### Contributing to the Project

1. **Fork & Clone**

   ```bash
   git fork https://github.com/your-org/ozwel-ai-embed.git
   git clone https://github.com/your-username/ozwel-ai-embed.git
   ```

2. **Setup Development Environment**

   ```bash
   cd ozwel-ai-embed/ozwel-ai-chatbot
   npm install
   npm run dev
   ```

3. **Make Changes & Test**

   ```bash
   # Test your changes
   npm run build
   npm run preview

   # Run integration tests
   npm run test:integration
   ```

4. **Submit Pull Request**
   - Follow the PR template
   - Include demo screenshots
   - Update documentation as needed

### Project Standards

- **TypeScript**: All new code must be TypeScript
- **Modern CSS**: Use CSS custom properties and modern layout techniques
- **Performance**: Maintain bundle size under 100KB gzipped
- **Accessibility**: Follow WCAG 2.1 AA guidelines
- **Security**: Regular security audits and dependency updates

## 🔒 Security & Privacy

- **Data Privacy**: No patient data stored on our servers
- **API Security**: API keys stored locally in browser storage
- **Communication**: All API calls made directly from client to OpenAI
- **CORS Protection**: Configurable cross-origin resource sharing
- **Content Security**: CSP headers and XSS protection

## 📊 Performance Metrics

- **Bundle Size**: ~50KB gzipped (core chatbot)
- **First Load**: <2s on 3G connection
- **Memory Usage**: <10MB typical usage
- **Compatibility**: Modern browsers (ES2020+)

## 🤝 Community & Support

### Getting Help

- **📖 Documentation**: Comprehensive docs in `ozwel-ai-chatbot/README.md`
- **🐛 Issues**: Report bugs via GitHub Issues
- **💬 Discussions**: Ask questions in GitHub Discussions
- **🔒 Security**: Report security issues privately

### Contributing

We welcome contributions! Please see our contributing guidelines:

- Follow the existing code style and patterns
- Add tests for new features
- Update documentation
- Ensure all demos work correctly

## 📈 Roadmap

### Current Version (v1.0)

- ✅ Basic chatbot functionality
- ✅ OpenAI integration
- ✅ Multiple integration methods
- ✅ Demo and testing pages

### Planned Features (v1.1)

- 🔄 NPM package distribution
- 🔄 Advanced theming system
- 🔄 Plugin architecture
- 🔄 Real-time collaboration features

### Future Enhancements (v2.0)

- 🔮 Voice interaction capabilities
- 🔮 Multi-language support
- 🔮 Advanced analytics and reporting
- 🔮 Enterprise SSO integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Designed with healthcare professionals in mind
- Inspired by the need for accessible AI in healthcare
- Community-driven development and testing

---

**🏥 Empowering Healthcare with AI - Made with ❤️ for the medical community**
