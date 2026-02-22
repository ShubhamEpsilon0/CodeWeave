# CodeWeave

CodeWeave is a modular, monorepo-based project designed to provide a seamless development experience for building and bundling modern web applications. It leverages tools like TypeScript, React, Vite, and Esbuild to deliver a robust and efficient development workflow.

## Features

- **Web Application**: A React-based web app (`code-weave-web-app`) with a code editor, syntax highlighting, and live preview capabilities.
- **Local Server**: A local server (`code-weave-local-server`) for serving and managing application assets.
- **CLI Tool**: A command-line interface (`code-weave-cli`) for managing and interacting with the project.
- **Monorepo Structure**: Managed with Lerna for efficient dependency sharing and versioning.
- **Custom Plugins**: Includes Esbuild plugins for path resolution and fetching.

## Packages

### 1. `code-weave-web-app`

- A React-based web application.
- Features:
  - Code editor with Monaco Editor.
  - Syntax highlighting using Prettier and Babel.
  - JSX support with Monaco JSX Highlighter.
  - EsBuild based in-browser bundling.
  - iframes for safe and isolated JS code execution with React Support.
  - [Future Work]: Support for an AI Prompt Cell with LLM Integration for Chating with LLM for code or text generation.

### 2. `code-weave-local-server`

- A local server for serving assets and managing requests.
- Built with Express.js.
- Provides caching and proxy middleware.
- Serves the underlying js notebook for persistence in the react App, performs smart Serializing and De-serializing to allow for easy sharing of the notebook, along with supporting ease of understanding.

### 3. `code-weave-cli`

- A CLI tool for managing the project.
- Also, to trigger the local server and access the application through browser.
- Commands:
  - `start`: Watch and compile TypeScript files.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/code-weave.git
   cd code-weave
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Bootstrap the monorepo:
   ```bash
   npx lerna bootstrap
   ```

## Usage

### Start the Web App

```bash
cd packages/code-weave-web-app
npm run dev
```

### Start the Local Server

```bash
cd packages/code-weave-local-server
npm run start
```

### Use the CLI

```bash
cd packages/code-weave-cli
npm run start
```

## Development

- **Linting**: Run `npm run lint` in the `code-weave-web-app` package.
- **Building**: Use `npm run build` to build the web app.
- **Testing**: Add tests as needed (currently not implemented).

## Project Structure

```
/packages
    /code-weave-web-app       # React-based web application
    /code-weave-local-server  # Local server for asset management
    /code-weave-cli           # Command-line interface tool
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and open a pull request.
