# Contributing to Stadium AI Copilot

First off, thank you for considering contributing to Stadium AI Copilot! It's people like you that make open-source software such a great community to learn, inspire, and create.

## 🚀 Getting Started

1. **Fork & Clone**: Fork this repository to your own GitHub account and clone it to your local machine.
2. **Install Dependencies**: Run `npm install` in the root directory, and then `npm install` inside the `functions` directory.
3. **Environment Variables**: Copy `.env.example` to `.env.local` and configure your Firebase and Google Cloud keys.
4. **Run Locally**: Start the Next.js development server with `npm run dev`.

## 🛠️ Code Standards

We take code quality and DX seriously. To ensure the codebase remains clean:

- **TypeScript**: We enforce strict typing. Avoid `any` types. Ensure all Firestore payloads and API responses are typed.
- **Linting & Formatting**: Ensure your code passes `npm run lint` and `npm run type-check`. We use `.prettierrc` for formatting.
- **UI Architecture**: We use Tailwind CSS and shadcn/ui. Avoid raw CSS/SCSS files unless strictly necessary.

## 📝 Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Ensure your commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (e.g., `feat: added AI simulator`, `fix: resolved race condition in realtime hook`).
4. You may merge the Pull Request in once you have the sign-off of at least one core maintainer, or if you do not have permission to do that, you may request the reviewer to merge it for you.

## 🐛 Reporting Bugs

Bugs are tracked as GitHub issues. When creating an issue, please use the provided **Bug Report Template** and provide:

- A clear, descriptive title.
- Steps to reproduce the issue.
- Details about your environment (OS, Browser, Node version).

## 💡 Proposing Features

Feature requests are welcome! Use the **Feature Request Template**. Be sure to explain _why_ the feature is needed and the specific operational problem it solves for stadium operations.
