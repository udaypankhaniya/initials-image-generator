# Contributing to Initials Image Generator

Thank you for considering contributing to the **Initials Image Generator**! This open-source project thrives on community contributions, and we’re excited to have you join us in enhancing this tool for creating custom initials images.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Code Changes](#submitting-code-changes)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [License](#license)

## Code of Conduct
We are committed to fostering a welcoming and inclusive community. By contributing, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please ensure all interactions are respectful and constructive.

## Getting Started
1. **Fork the Repository**:
   - Visit [https://github.com/udaypankhaniya/initials-image-generator](https://github.com/udaypankhaniya/initials-image-generator) and click "Fork".
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/initials-image-generator.git
   ```
3. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Reporting Bugs
- Check the [Issues](https://github.com/udaypankhaniya/initials-image-generator/issues) page to avoid duplicates.
- Create a new issue with the "Bug" label and include:
  - A clear title and description
  - Steps to reproduce
  - Expected vs. actual behavior
  - Screenshots or logs (if applicable)

### Suggesting Features
- Open a new issue with the "Feature Request" label.
- Describe the feature, including:
  - The problem it addresses
  - Proposed implementation (if known)
  - Potential impact on existing functionality

### Submitting Code Changes
1. **Create a Pull Request (PR)**:
   - Push your changes to your fork:
     ```bash
     git push origin feature/your-feature-name
     ```
   - Submit a PR to the `main` branch of the main repository.
   - Reference related issues (e.g., `Fixes #123`).
2. **Code Review**:
   - Ensure your PR passes all automated checks (linting, tests).
   - Address feedback from maintainers promptly.
3. **Commit Messages**:
   - Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add custom font support`, `fix: resolve color validation bug`).
   - Keep messages clear and concise.

## Development Setup
1. **Prerequisites**:
   - Node.js (v16 or later)
   - npm or yarn
2. **Installation**:
   ```bash
   git clone https://github.com/udaypankhaniya/initials-image-generator.git
   cd initials-image-generator
   npm install
   ```
3. **Running the Project**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.
4. **Building for Production**:
   ```bash
   npm run build
   npm run start
   ```

## Style Guidelines
- **Code Style**:
  - Adhere to the [Airbnb TypeScript Style Guide](https://github.com/airbnb/javascript).
  - Run Prettier and ESLint:
    ```bash
    npm run lint
    npm run format
    ```
- **File Structure**:
  - Place components in `components/`.
  - Place API routes in `pages/api/`.
  - Use TypeScript (`*.tsx` or `*.ts`).
- **Documentation**:
  - Update [README.md](README.md) for new features or changes.
  - Add inline comments for complex logic.

## Testing
- Run tests to ensure functionality:
  ```bash
  npm run test
  ```
- Write unit tests for new features using Jest or similar frameworks.
- Ensure all tests pass before submitting a PR.

## License
By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

We appreciate your efforts to improve Initials Image Generator! For questions or support, open an issue or contact the maintainer at [udaypankhaniya7@gmail.com](mailto:udaypankhaniya7@gmail.com).

Happy coding!