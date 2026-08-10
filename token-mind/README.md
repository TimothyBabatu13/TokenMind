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

Clone the repo:

```bash
git clone https://github.com/TimothyBabatu13/TokenMind.git
cd token-mind
npm install
```

Create .env.local file and add these environment variables
```bash 
CIVIC_AUTH_SECRET="***************"
GEMINI_KEY="********"
BIRD_EYE_API_KEY="********"
```

Run the app
```bash 

npm run dev
```

Open your browser and click on load your app using [http://localhost:3000/](http://localhost:3000/)