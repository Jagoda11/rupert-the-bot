# 🤖💬 Rupert-the-Bot

<img src="./github-mark/github-mark.png" width="100">

Rupert-the-Bot is a GitHub App built with [Probot](https://github.com/probot/probot). It's designed to make your development workflow more engaging and efficient.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 🛠️ Setup

1. **Install dependencies** 📦

   ```bash
   npm install
   ```

2. **Run the bot** 🏃‍♀️

   ```bash
   npm start
   ```

3. **Lint the code** 🧹

   ```bash
   npm run lint
   ```

4. **Run the tests** 🧪

   ```bash
   npm test
   ```

5. **Watch for changes and rerun tests** 👀

   ```bash
   npm run watch
   ```

6. **Start the app in debug mode** 🐞

   ```bash
   npm run debug
   ```

7. **Clean up temporary files and build artifacts** 🧽

   ```bash
   npm run clean
   ```

8. **Format the code** 🖋️

    ```bash
    npm run format
    ```

9. **Run tasks before each commit** 🚧

    ```bash
    npm run precommit
    ```

    Note: We've set up a pre-commit hook with Husky 🐶, so this script will automatically run before each commit.

## 🐳 Docker

You can also run Rupert-the-Bot in a Docker container.

1. **Build the container**

   ```bash
   docker build -t rupert-the-bot .
   ```

2. **Start the container**

   ```bash
   docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> rupert-the-bot
   ```

## 🤝 Contributing

We love contributions! If you have suggestions for how Rupert-the-Bot could be improved, or want to report a bug, open an issue! We'd appreciate any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

To contribute, you can [fork this repository](https://github.com/Jagoda11/rupert-the-bot/fork).

## 📜 License

[ISC](LICENSE) © 2024 Jagoda Cubrilo
