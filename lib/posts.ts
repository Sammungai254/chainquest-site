/**
 * Shared blog post data — single source of truth for both
 * the Insights homepage section and the /blog routes.
 *
 * Content is written to be useful and grounded. Where a claim
 * could change with markets, the post says so rather than
 * stating it as fixed truth.
 */

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; lang?: string; text: string }
  | { type: "note"; text: string };

export interface Post {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  author: string;
  date: string; // human-readable
  publishedAt: string; // ISO for SEO
  color: "gold" | "purple" | "blue";
  tags: string[];
  content: ContentBlock[];
}

export const posts: Post[] = [
  // ---------------------------------------------------------------------------
  {
    slug: "top-5-defi-strategies-kenyan-investors-2026",
    title: "Top 5 DeFi Strategies for Kenyan Investors in 2026",
    category: "Crypto Education",
    excerpt:
      "From yield farming to liquidity pools — how Kenyan investors are growing wealth with DeFi protocols in 2026.",
    readTime: "6 min",
    author: "Samuel",
    date: "May 2026",
    publishedAt: "2026-05-15",
    color: "gold",
    tags: ["DeFi", "Kenya", "Crypto", "Yield Farming", "Stablecoins"],
    content: [
      {
        type: "p",
        text: "DeFi — short for decentralised finance — lets you lend, borrow, swap, and earn yield on crypto assets without going through a bank. For Kenyan investors who already use M-Pesa and mobile wallets daily, the mental model is familiar: a wallet on your phone, transactions in seconds. What's different is that the rails are global, the assets are programmable, and the risks are real.",
      },
      {
        type: "p",
        text: "Below are five strategies I see Kenyans actually use in 2026 — ranked roughly from lowest to highest risk. None of this is investment advice; treat every protocol as code that can break.",
      },

      { type: "h2", text: "1. Stablecoin savings (the boring baseline)" },
      {
        type: "p",
        text: "Holding USD-pegged stablecoins like USDC or USDT in a reputable lending protocol (Aave, Compound) is the closest DeFi gets to a savings account. Yields fluctuate with demand — often somewhere in the low-to-mid single digits in APY — but you avoid the price swings of BTC or ETH.",
      },
      {
        type: "ul",
        items: [
          "Why Kenyans use it: a hedge against shilling depreciation without leaving your phone.",
          "Main risk: smart-contract bugs and stablecoin depeg events (UST 2022 is the cautionary tale).",
          "Tip: split across two protocols rather than one, even if returns are slightly lower.",
        ],
      },

      { type: "h2", text: "2. Liquidity pools on stablecoin pairs" },
      {
        type: "p",
        text: "Providing liquidity to a stable-to-stable pool (e.g. USDC/USDT on Curve or Uniswap v3 ranges) earns trading fees with minimal impermanent loss because both sides hold roughly the same price. Returns are modest but steady, and gas fees on Layer 2s like Base, Arbitrum or Polygon make this practical for smaller positions.",
      },
      {
        type: "note",
        text: "Impermanent loss is the gap between holding two tokens versus pooling them. Stable-to-stable pairs largely sidestep it; volatile pairs do not.",
      },

      { type: "h2", text: "3. Liquid staking" },
      {
        type: "p",
        text: "Liquid staking lets you stake ETH (or SOL, or other PoS assets) and receive a tradeable receipt token — like stETH from Lido or rETH from Rocket Pool — that you can use elsewhere in DeFi. You earn the staking yield while keeping liquidity.",
      },
      {
        type: "p",
        text: "It's popular because it combines a base yield with optionality: you can deposit the receipt as collateral, pair it in a pool, or just hold it. The trade-off is the receipt token can briefly trade below the underlying during stress periods.",
      },

      { type: "h2", text: "4. Yield farming with rewards" },
      {
        type: "p",
        text: "Yield farming is what people usually mean when they say \"DeFi returns are huge.\" You provide liquidity or borrow/lend, and the protocol pays you in its own governance token on top of the base yield.",
      },
      {
        type: "p",
        text: "Eye-catching APRs are usually a function of token emissions, not real revenue. When the emission rate drops or the token price falls, the headline number collapses. Treat reward tokens as something to harvest and sell into stablecoins regularly rather than counting on them at face value.",
      },

      { type: "h2", text: "5. Real-world asset (RWA) protocols" },
      {
        type: "p",
        text: "A more recent category: protocols like Ondo, Maple, and Centrifuge tokenise things like short-term US Treasury bills and private credit, then let on-chain users earn the underlying yield. For Kenyans, this is one of the few ways to get USD-denominated, regulated-asset exposure without opening a brokerage abroad.",
      },
      {
        type: "ul",
        items: [
          "Yields tend to track the US short rate rather than crypto-native demand.",
          "KYC requirements vary — some protocols are permissioned, others wrap the exposure into a freely tradeable token.",
          "Counterparty risk shifts from a smart contract to a real-world issuer; read the legal structure, not just the docs.",
        ],
      },

      { type: "h2", text: "Practical notes before you start" },
      {
        type: "ol",
        items: [
          "Use a hardware wallet (Ledger, Trezor) for anything above a few hundred dollars. Hot wallets are for spending money.",
          "Bridge to a Layer 2 to keep gas fees sane — Base and Arbitrum are common starting points in 2026.",
          "Track positions with a free dashboard like DeBank or Zapper rather than guessing.",
          "Keep a running log: date in, date out, fees paid, rewards harvested. Tax authorities, including KRA, are increasingly aware of crypto income.",
          "Assume any protocol you use can fail. Size positions accordingly.",
        ],
      },

      {
        type: "p",
        text: "DeFi is not a shortcut to wealth. It is a different rail for the same financial primitives — savings, lending, market-making — with sharper tools and sharper edges. Used carefully, it gives a Kenyan investor real options that traditional banking still doesn't offer.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "ai-revolutionizing-crypto-trading-africa",
    title: "How AI is Revolutionizing Crypto Trading in Africa",
    category: "AI & Trading",
    excerpt:
      "Automated signals, sentiment analysis, and AI bots are changing how African traders approach the market.",
    readTime: "5 min",
    author: "Samuel",
    date: "April 2026",
    publishedAt: "2026-04-10",
    color: "purple",
    tags: ["AI", "Trading", "Africa", "Sentiment Analysis", "Bots"],
    content: [
      {
        type: "p",
        text: "Across Lagos, Nairobi, Cape Town, and Accra, retail crypto traders have always been at a structural disadvantage: thin local liquidity, expensive data feeds, and time zones that don't overlap with the biggest US sessions. AI tools — both the off-the-shelf chatbots and the more specialised trading models — are closing some of that gap. They're not magic, but they are shifting what one person with a laptop can do.",
      },

      { type: "h2", text: "Where AI actually helps" },

      { type: "h3", text: "1. Signal generation, not signal trust" },
      {
        type: "p",
        text: "Most retail traders use AI signals wrong: they buy a Telegram bot's call, lose money, and blame the bot. The useful pattern is the opposite — let the model surface candidates (breakouts, unusual volume, funding-rate extremes) and then check them yourself against context the model can't see.",
      },
      {
        type: "ul",
        items: [
          "Good use: \"Show me the top 10 mid-cap tokens with rising open interest and price holding above the 20-day average.\"",
          "Bad use: \"Tell me what to buy today.\" Models are confident; markets are not.",
        ],
      },

      { type: "h3", text: "2. Sentiment analysis at scale" },
      {
        type: "p",
        text: "Reading every relevant tweet, Discord channel, and Telegram group is impossible for a human. Sentiment pipelines built on open models (BERT-family or local LLMs) can summarise mood, flag co-ordinated shilling, and detect when narrative is shifting before price reacts. Several African builders are wiring these into local-language streams — Swahili and Pidgin English crypto content barely existed in datasets two years ago.",
      },

      { type: "h3", text: "3. Trade automation and risk management" },
      {
        type: "p",
        text: "Execution bots — through APIs to Binance, Bybit, Kraken — used to be the domain of quants. With AI assistants, a trader can describe a strategy in plain English (\"trail a 5% stop on any position up more than 20%\") and have a working script within minutes. The bottleneck is no longer code; it's clearly defining what you actually want to do.",
      },
      {
        type: "note",
        text: "Most blow-ups happen at the same place: position sizing. An AI can write a bot in five minutes. It cannot stop you from risking 30% of your capital on one trade.",
      },

      { type: "h3", text: "4. Research and on-chain analysis" },
      {
        type: "p",
        text: "Asking an LLM to summarise a 30-page protocol whitepaper, parse a Dune dashboard, or compare two L2s side-by-side is dramatically faster than doing it manually — and the output is usually correct enough to act as a starting point. Verify the specifics; trust the structure.",
      },

      { type: "h2", text: "What AI does not solve" },
      {
        type: "ol",
        items: [
          "Bad strategies. A model can execute a losing edge faster than you can manually — it does not turn it into a winning one.",
          "Black-swan events. Models trained on a calm period will be confidently wrong in a crash.",
          "Data quality. Sentiment scores from a botted Telegram group are worse than no signal.",
          "Local payment rails. Off-ramping P&L back to KES, NGN, or ZAR is still mostly a manual problem.",
        ],
      },

      { type: "h2", text: "A practical setup for an African retail trader" },
      {
        type: "p",
        text: "If you're starting out and want AI to actually help rather than just look impressive, a useful stack in 2026 looks like:",
      },
      {
        type: "ul",
        items: [
          "A general LLM (Claude, ChatGPT, Gemini) for research, summaries, and code generation.",
          "A free or cheap on-chain dashboard (Dune, Nansen lite, DefiLlama) — let the model pull and explain the data.",
          "A clear risk framework written in advance: max position size, max daily loss, take-profit ladders. Encode these into any bot you build.",
          "A trade journal — ideally automated by the bot itself, so you can review what actually worked.",
        ],
      },

      {
        type: "p",
        text: "The opportunity for African traders is not that AI hands them an edge. It's that AI lowers the cost of doing the work that used to separate professionals from retail — the reading, the modelling, the execution discipline. The traders who treat it as leverage on their own thinking, rather than a substitute for it, are the ones who will compound.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "building-first-web3-app-african-devs",
    title: "Building Your First Web3 App: A Guide for African Devs",
    category: "Web3 Development",
    excerpt:
      "Step-by-step: from smart contracts to frontend — build and deploy your first dApp on a budget.",
    readTime: "8 min",
    author: "Samuel",
    date: "March 2026",
    publishedAt: "2026-03-20",
    color: "blue",
    tags: ["Web3", "Smart Contracts", "Solidity", "dApp", "Africa"],
    content: [
      {
        type: "p",
        text: "If you can write a small React app and use Git, you already have most of what you need to ship a Web3 app. The smart-contract part is intimidating from the outside, but the core workflow is small enough to learn in a weekend. This guide walks through what I'd hand to a Kenyan or African developer starting today — keeping costs near zero until your project actually needs to spend money.",
      },

      { type: "h2", text: "1. Decide what you're building" },
      {
        type: "p",
        text: "Most first dApps are too ambitious. Pick something small and well-defined. Three good starter ideas:",
      },
      {
        type: "ul",
        items: [
          "A tipping page where readers send a stablecoin tip to a creator address.",
          "A token-gated content page that unlocks for holders of a specific NFT.",
          "A simple group savings (chama) contract: members deposit, withdraw on a schedule.",
        ],
      },
      {
        type: "p",
        text: "All three teach you wallet connection, reading on-chain state, and writing a transaction — the three primitives every dApp uses.",
      },

      { type: "h2", text: "2. Pick a chain and a testnet" },
      {
        type: "p",
        text: "Default to an EVM Layer 2 with a free, well-maintained testnet — Base Sepolia and Arbitrum Sepolia are both fine in 2026. Mainnet deployments are cheap on these networks (cents, not dollars), and the tooling is identical to Ethereum mainnet.",
      },
      {
        type: "note",
        text: "Don't start on Ethereum mainnet. Even simple deployments can cost tens of dollars in gas. Build on a testnet, iterate fast, ship to a Layer 2 when you're ready.",
      },

      { type: "h2", text: "3. Set up your toolchain" },
      {
        type: "p",
        text: "A minimal modern stack:",
      },
      {
        type: "ul",
        items: [
          "Foundry for writing, testing, and deploying contracts. Faster than Hardhat and the tests are pure Solidity.",
          "Next.js (the framework this site uses) for the frontend.",
          "wagmi + viem for wallet connection and contract calls — together they replace the older ethers.js setup.",
          "RainbowKit or ConnectKit for a polished \"Connect Wallet\" button without building one yourself.",
        ],
      },

      { type: "h2", text: "4. Write the contract" },
      {
        type: "p",
        text: "Start with the smallest contract that demonstrates your idea. For a tipping page, that's a handful of lines:",
      },
      {
        type: "code",
        lang: "solidity",
        text: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TipJar {
    address public immutable owner;

    event Tipped(address indexed from, uint256 amount, string note);

    constructor() { owner = msg.sender; }

    function tip(string calldata note) external payable {
        require(msg.value > 0, "send something");
        emit Tipped(msg.sender, msg.value, note);
    }

    function withdraw() external {
        require(msg.sender == owner, "not owner");
        payable(owner).transfer(address(this).balance);
    }
}`,
      },
      {
        type: "p",
        text: "It's short on purpose. Add Foundry tests for the happy path and one failure case before you touch the UI. Treat the contract like a backend you can never patch — because once it's deployed, you mostly can't.",
      },

      { type: "h2", text: "5. Connect the frontend" },
      {
        type: "p",
        text: "On the frontend, the loop is: connect wallet → read on-chain state → submit a transaction → wait for confirmation → update the UI. wagmi gives you hooks for each step. You'll spend more time on UX than on Web3 plumbing — show pending states, show errors plainly, and never let the user wonder whether their transaction went through.",
      },

      { type: "h2", text: "6. Deploy" },
      {
        type: "ol",
        items: [
          "Get a free RPC endpoint from Alchemy or QuickNode.",
          "Fund a deployer wallet with testnet ETH from a faucet.",
          "Run `forge script` to deploy to Sepolia. Verify the contract on Etherscan so the source is public.",
          "Push the frontend to Vercel. Set the chain ID and contract address as environment variables.",
          "When you're ready for real users, repeat the same steps against Base or Arbitrum mainnet with a small amount of real ETH.",
        ],
      },

      { type: "h2", text: "Cost reality check" },
      {
        type: "ul",
        items: [
          "Testnet deployment: free.",
          "Mainnet deployment on a Layer 2: typically under a dollar in 2026.",
          "RPC and frontend hosting: free tiers cover everything until you have meaningful traffic.",
          "Domain: optional. A `.vercel.app` URL is fine for v1.",
        ],
      },

      { type: "h2", text: "Things people get wrong on their first dApp" },
      {
        type: "ol",
        items: [
          "Storing things on-chain that don't need to be on-chain. Use IPFS or your own database for content; keep the contract for state that must be trustless.",
          "Skipping tests. Foundry tests are easy and they catch the bugs that cost real money.",
          "Hardcoding the contract address. Read it from an environment variable so swapping deployments doesn't break the build.",
          "Ignoring mobile wallets. In Kenya and most of Africa, mobile is the default. Make sure WalletConnect works, not just MetaMask in a desktop browser.",
        ],
      },

      {
        type: "p",
        text: "Web3 development is mostly normal development with one new mental model: a piece of your backend is a public, append-only program that anyone can call and no one can stop. Build something small, ship it, watch how people actually use it. That loop is worth more than any tutorial — including this one.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
