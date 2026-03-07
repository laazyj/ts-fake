# Contributing to ts-fake

Thanks for your interest in contributing to ts-fake! This document provides guidelines and instructions for contributing.

## How to Contribute

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/ts-fake.git
   cd ts-fake
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following the guidelines below
5. **Test your changes**: Ensure all tests pass
6. **Commit your changes** with clear, descriptive commit messages
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** on GitHub

## Development Setup

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Check examples compile
npm run test:examples

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## Pre-commit Hooks

This project uses Husky and lint-staged to automatically lint and format code before commits. When you commit:
- ESLint will run with auto-fix on staged `.ts` files
- Prettier will format staged `.ts` files
- If there are unfixable errors, the commit will be blocked

You don't need to manually run lint/format before committing - the hooks handle it automatically.

## Guidelines

### Code Style
- Code is automatically formatted with Prettier (double quotes, semicolons, 100 char width)
- ESLint enforces code quality with TypeScript strict rules
- Pre-commit hooks ensure consistency - no manual formatting needed
- Follow existing patterns in the codebase

### Testing
- Add unit tests in `tests/unit/` for new functionality
- Add example tests in `tests/examples/` if adding new use cases
- Update `examples/` folder if demonstrating new features
- All tests must pass: `npm test`
- Examples must compile: `npm run test:examples`
- Aim for 100% test coverage

### Documentation
- Update README.md if you change functionality
- Add JSDoc comments for public APIs
- Include usage examples for new features

### Pull Requests
- **One feature per PR**: Keep pull requests focused on a single change
- **Clear description**: Explain what your PR does and why
- **Reference issues**: Link to related issues if applicable
- **Keep it small**: Smaller PRs are easier to review and merge

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Keep the first line under 72 characters
- Add details in the body if needed

Example:
```
Add support for nested object fakes

- Implement recursive fake creation
- Add tests for nested objects
- Update documentation with examples
```

## Reporting Issues

- Use the GitHub issue tracker
- Check if the issue already exists before creating a new one
- Provide a clear description and reproduction steps
- Include TypeScript and Node.js versions
- Minimum supported versions: TypeScript 5.0+, Node.js 22+

## Questions?

Feel free to open an issue for questions or discussions about the project.

## Code of Conduct

Be respectful and constructive in all interactions. We're all here to make ts-fake better!
