# TokenMind

Next.js chat app for Solana token discovery and Solana how-it-works questions. `/` redirects to `/chat`.

## What works

- Streamed chat (Vercel AI SDK) with OpenRouter (`nvidia/nemotron-3.5-lightning:free`).
- Trending Solana tokens (Birdeye, top 10, Redis cache 5 minutes). Suggestion chip **What’s trending on Solana right now?** skips the model and uses the `trending_tokens` intent.
- Token overview when the model supplies a mint address (Birdeye, cached 5 minutes).
- Solana concept answers via the `KNOWLEDGE` tool (second model call with structured markdown).
- Deterministic (no model) replies for greetings, thanks, help, and simple trending asks. A trending question that asks *why* still goes to the model.
- Google OAuth (NextAuth JWT). Signed-in chats persist in Postgres (sessions + messages with AI SDK `parts`, including tool results). Sidebar lists sessions after a turn finishes.
- Guests: 5 messages per UTC day (IP + optional FingerprintJS). Guest history is not saved.

## What does not work

- Swap and Twitter-trending tools return “coming soon”. Do not document them as features.
- No tests.

## Stack

Next.js 16 (App Router, Webpack), React 19, Prisma 7 + Postgres (Accelerate URL at runtime, `DIRECT_DATABASE_URL` for migrations), Upstash Redis, NextAuth Google, Birdeye, OpenRouter.

`/api/chat` is **Node** (Prisma). `/api/usage` is **Edge**.

## Setup

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

Copy `.env.example` to `.env` (or `.env.local`) and fill real values.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Variable | Used for |
| --- | --- |
| `OPEN_ROUTER_API_KEY` | Chat and knowledge |
| `BIRD_EYE_API_KEY` | Trending and token overview |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Cache and guest quota |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Sign-in |
| `NEXTAUTH_SECRET` / `NEXTAUTH_URL` | Sessions (`http://localhost:3000` locally) |
| `DATABASE_URL` | Prisma client (Accelerate) |
| `DIRECT_DATABASE_URL` | Migrations |

Do not commit `.env`. Keep placeholders in `.env.example`, not live connection strings.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (needs `prisma generate`) |
| `npm run start` | Serve a build |
| `npm run lint` | Lint |
| `npx prisma migrate deploy` | Apply migrations |

## HTTP

**`POST /api/chat?sessionId=…`**  
JSON: `{ messages }` (required). Optional `{ intent: "trending_tokens" }` from the trending chip. Header `x-fingerprint` for guests. Last message must have text.

Flow: guest quota if unsigned → named or regex intent → direct stream, else last 10 messages to the model with tools.

**`GET /api/usage`** — `{ unlimited, remaining }`. Signed-in: `unlimited: true`.

**`GET /api/chat/get-sessions`** — signed-in session list.

**`GET /api/chat/get-sessions-messages?sessionId=`** — messages for that session (owner only).

**`/api/auth/[...nextauth]`** — Google OAuth.

## Tools

| Name | When | Source |
| --- | --- | --- |
| `GET_TRENDING_TOKEN` | Trending list | Birdeye + Redis |
| `GET_TOKEN_INFO` | Mint address present | Birdeye + Redis |
| `KNOWLEDGE` | Solana concepts | OpenRouter `generateObject` |


