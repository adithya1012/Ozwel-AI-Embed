# Contributing to Ozwel AI Embed

Thank you for your interest in contributing to Ozwel AI Embed! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager
- Git for version control
- Modern web browser for testing

### Development Setup

1. **Fork and Clone**
   ```bash
   git fork https://github.com/your-org/ozwel-ai-embed.git
   git clone https://github.com/your-username/ozwel-ai-embed.git
   cd ozwel-ai-embed/ozwel-ai-chatbot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Run Tests**
   ```bash
   npm run build
   npm run preview
   # Visit http://localhost:4173/demo/ to test
   ```

## 📁 Project Structure

Understanding the project structure will help you contribute effectively:

```
ozwel-ai-chatbot/
├── src/                    # Source code
│   ├── chatbot/           # Core chatbot logic
│   └── main.ts            # Entry point
├── server/                # Optional server component
├── demo/                  # Demo and test pages
├── dist/                  # Built files (auto-generated)
└── package.json           # Dependencies and scripts
```

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: All new code should be written in TypeScript
- **Modern JavaScript**: Use ES2020+ features
- **Consistent Formatting**: Follow existing code style
- **Comments**: Document complex logic and public APIs

### Best Practices

1. **Type Safety**: Always provide proper TypeScript types
2. **Error Handling**: Implement proper error handling and logging
3. **Performance**: Keep bundle size minimal and optimize for speed
4. **Accessibility**: Follow WCAG 2.1 AA guidelines
5. **Security**: Validate inputs and follow security best practices

### Code Organization

- Keep functions small and focused
- Use descriptive variable and function names
- Separate concerns into logical modules
- Follow the existing file structure patterns

## 🧪 Testing

### Manual Testing

1. **Build and Preview**
   ```bash
   npm run build
   npm run preview
   ```

2. **Test Integration Methods**
   - Visit `http://localhost:4173/demo/` for iframe integration
   - Visit `http://localhost:4173/demo/script-tag-test.html` for script integration

3. **Test API Endpoints**
   ```bash
   # Test health endpoint
   curl http://localhost:4173/health
   
   # Test status endpoint
   curl http://localhost:4173/api/status
   ```

### Integration Testing

- Always test both iframe and script tag integration methods
- Verify responsive design on different screen sizes
- Test with and without API keys configured
- Ensure error handling works correctly

## 📝 Pull Request Process

### Before Submitting

1. **Test Your Changes**
   - Build successfully: `npm run build`
   - Demo pages work correctly
   - No console errors or warnings

2. **Update Documentation**
   - Update README.md if needed
   - Add code comments for complex changes
   - Update demo pages if integration changes

3. **Check Code Quality**
   - TypeScript compiles without errors
   - Follow existing code style
   - No unused imports or variables

### Pull Request Template

When submitting a PR, include:

```markdown
## Summary
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Manual testing completed
- [ ] Demo pages work correctly
- [ ] Integration methods tested
- [ ] API endpoints functional

## Screenshots
(If applicable, add screenshots showing the changes)

## Additional Notes
Any additional information or context
```

### Review Process

1. **Automated Checks**: Ensure all builds pass
2. **Code Review**: Maintainers will review your code
3. **Testing**: Changes will be tested in demo environment
4. **Feedback**: Address any requested changes
5. **Merge**: Once approved, your PR will be merged

## 🎯 Types of Contributions

### Bug Fixes
- Fix existing functionality that isn't working correctly
- Improve error handling and edge cases
- Performance optimizations

### New Features
- New chatbot capabilities
- Additional integration methods
- Enhanced UI/UX features
- API improvements

### Documentation
- Improve README files
- Add code examples
- Create tutorials or guides
- Update demo pages

### Testing
- Add new test cases
- Improve demo pages
- Create integration examples
- Performance testing

## 🚨 Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: Browser, OS, Node.js version
6. **Screenshots**: If applicable

### Feature Requests

For feature requests:

1. **Use Case**: Describe the problem you're trying to solve
2. **Proposed Solution**: Your ideas for implementation
3. **Alternatives**: Any alternative solutions you've considered
4. **Additional Context**: Any other relevant information

## 🔒 Security

### Reporting Security Issues

- **Do NOT** create public GitHub issues for security vulnerabilities
- Email security issues privately to the maintainers
- Include as much detail as possible
- We'll respond within 24 hours

### Security Guidelines

- Never commit API keys or sensitive data
- Validate all user inputs
- Use HTTPS in production environments
- Follow OWASP security guidelines

## 📊 Performance Guidelines

### Bundle Size
- Keep total bundle size under 100KB gzipped
- Use tree shaking to eliminate unused code
- Optimize images and assets

### Runtime Performance
- Minimize DOM manipulations
- Use efficient algorithms and data structures
- Test with realistic data volumes
- Monitor memory usage

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a professional tone

### Communication

- Use clear and concise language
- Ask questions if anything is unclear
- Share knowledge and help others
- Be patient with new contributors

## 📚 Resources

### Learning Resources
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Modern JavaScript](https://javascript.info/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [TypeScript Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [Prettier](https://prettier.io/) - Code formatting
- [ESLint](https://eslint.org/) - Linting

## 🎉 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Invited to join the core team (for significant contributions)

## 📞 Questions?

- **GitHub Discussions**: For general questions and ideas
- **GitHub Issues**: For bugs and feature requests
- **Email**: For private or security-related matters

Thank you for contributing to Ozwel AI Embed! 🚀
