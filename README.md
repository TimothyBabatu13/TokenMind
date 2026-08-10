# Tokenmind 🧠💎
**Your AI-Powered Crypto Assistant**  
Discover trending tokens, get real-time news, swap tokens seamlessly, and even create your own token — all powered by an intelligent AI agent.

---

## ✨ Features

- **AI Assistant** for crypto insights
- **Discover** trending tokens in real time
- **Get news** updates and alerts
- **Swap tokens** seamlessly in-app
- **Create your own token** easily
- **Secure authentication** with Civic Auth embedded wallets

---

## 🛡️ Civic Auth Integration

Tokenmind uses **Civic Auth Web3 SDK** (`@civic/auth-web3`) to authenticate users and create secure, **embedded wallets**.  
Users log in seamlessly without needing external wallets or extensions — their wallet is created and managed safely within the app.

**Key Civic Auth features integrated:**
- Embedded wallet creation
- Web3 authentication
- Smooth login flow
- Wallet recovery via Civic

[Learn more about Civic Auth](https://www.civic.com/auth/)

---

## 🛠️ Technologies Used

- **Next.js** (Frontend Framework)
- **Civic Auth Web3 SDK** (Authentication & Wallets)
- **Vercel AI SDK** (Streaming AI responses)
- **Solana Web3.js** (Blockchain interactions)
- **TailwindCSS** (UI Styling)
<!-- - **Helius API** (Blockchain data & trends) -->

---

## 🚀 Getting Started

Follow the steps below to set up the project locally and start building with Tokenmind.

### 1) Clone the repository

```bash
git clone https://github.com/TimothyBabatu13/TokenMind.git
cd token-mind
```

### 2) Install dependencies

```bash
npm install
```

### 3) Set up your environment variables

Create a local environment file from the sample file:

```bash
cp .env.example .env
```

If your project uses `.env.local` instead, use:

```bash
cp .env.example .env.local
```

Then add the required values in your environment file:

```env
CIVIC_AUTH_SECRET="your_civic_auth_secret"
GEMINI_KEY="your_google_gemini_api_key"
BIRD_EYE_API_KEY="your_birdeye_api_key"
```

### Where to get your API keys

- **Civic Auth Secret**: Create an app on the [Civic Auth dashboard](https://www.civic.com/auth/) and copy the secret key from your project settings.
- **Gemini API Key**: Generate a key from [Google AI Studio](https://aistudio.google.com/app/apikey) or the Google AI developer console.
- **BirdEye API Key**: Create or access your project on the [BirdEye dashboard](https://bds.birdeye.so/user/security) and copy your API key from the developer settings.

> If you are using additional integrations in the project, make sure to also add any extra API keys required by those services.

### 4) Run the app

```bash
npm run dev
```

Open your browser and visit:

[http://localhost:3000/](http://localhost:3000/)

---

Enjoy building with Tokenmind — your AI-powered crypto companion.
