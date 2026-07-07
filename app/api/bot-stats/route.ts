import { NextResponse } from "next/server";

export const revalidate = 60;

const REPO = "samowino075/okxbot";
const BRANCH = "journal-live";

async function fetchGitHubRaw(path: string): Promise<string> {
  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3.raw",
      ...(token ? { Authorization: `token ${token}` } : {}),
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return res.text();
}

function parseCsv(raw: string): Record<string, string>[] {
  const lines = raw.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === "," && !inQuotes) { values.push(current.trim()); current = ""; continue; }
      current += char;
    }
    values.push(current.trim());
    return Object.fromEntries(headers.map((h, i) => [h.trim(), values[i] ?? ""]));
  });
}

// Parse "BTC-USDT: bearish / ETH-USDT: bullish / ..." from scan note
function parseBiasNote(note: string): Record<string, string> {
  const biases: Record<string, string> = {};
  const matches = note.matchAll(/(\w+)-USDT:\s*(bearish|bullish|neutral)/gi);
  for (const m of matches) biases[m[1].toUpperCase()] = m[2].toLowerCase();
  return biases;
}

export interface Trade {
  timestamp: string;
  pair: string;
  direction: string;
  tier: string;
  pnl: number;
  status: string;
}

export interface EquityPoint {
  date: string;
  equity: number;
}

export interface TierStats {
  tier: string;
  trades: number;
  wins: number;
  losses: number;
  winRate: number;
  totalPnl: number;
  avgPnl: number;
}

export interface Signal {
  timestamp: string;
  biases: Record<string, string>;
  setupsFound: number;
  action: string;
  note: string;
}

export interface QueuedSetup {
  queuedAt: string;
  pair: string;
  tier: string;
  direction: string;
  price: number;
  rsi: number;
  note: string;
}

export interface BotStats {
  equity: number;
  dailyPnl: number;
  consecutiveLosses: number;
  drawdownPct: number;
  openPositions: number;
  killSwitchActive: boolean;
  lastUpdated: string;
  totalReturn: number;
  winRate: number;
  totalTrades: number;
  expectancy: number;
  equityCurve: EquityPoint[];
  allTrades: Trade[];
  tierBreakdown: TierStats[];
  recentSignals: Signal[];
  queuedSetups: QueuedSetup[];
}

export async function GET() {
  try {
    const [stateRaw, tradesRaw, scansRaw, queuedRaw] = await Promise.all([
      fetchGitHubRaw("journal/state.json"),
      fetchGitHubRaw("journal/trades.csv"),
      fetchGitHubRaw("journal/scans.csv").catch(() => ""),
      fetchGitHubRaw("journal/queued_bc_setups.jsonl").catch(() => ""),
    ]);

    const state = JSON.parse(stateRaw);
    const rows = parseCsv(tradesRaw);

    // Closed trades: rows with a numeric pnl value
    const closed = rows
      .filter((r) => {
        const pnl = parseFloat(r.pnl_usd ?? "");
        return !isNaN(pnl) && (r.status?.startsWith("closed_") || r.exit_reason?.startsWith("closed_"));
      })
      .map((r) => ({
        timestamp: r.timestamp_utc,
        pair: r.pair,
        direction: r.direction,
        tier: r.tier,
        pnl: parseFloat(r.pnl_usd ?? "0"),
        status: r.status || r.exit_reason || "",
      }))
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    const wins = closed.filter((t) => t.pnl > 0).length;
    const winRate = closed.length > 0 ? (wins / closed.length) * 100 : 0;
    const totalPnl = closed.reduce((s, t) => s + t.pnl, 0);
    const expectancy = closed.length > 0 ? totalPnl / closed.length : 0;

    // Equity curve
    let runningEquity = 100;
    const equityCurve: EquityPoint[] = [{ date: "Start", equity: 100 }];
    for (const t of closed) {
      runningEquity += t.pnl;
      equityCurve.push({
        date: t.timestamp.slice(0, 10),
        equity: Math.round(runningEquity * 100) / 100,
      });
    }

    // Tier breakdown
    const TIERS = ["A", "A1H", "B", "C"];
    const tierBreakdown: TierStats[] = TIERS.map((tier) => {
      const trades = closed.filter((t) => t.tier === tier);
      const tw = trades.filter((t) => t.pnl > 0).length;
      const tPnl = trades.reduce((s, t) => s + t.pnl, 0);
      return {
        tier,
        trades: trades.length,
        wins: tw,
        losses: trades.length - tw,
        winRate: trades.length > 0 ? Math.round((tw / trades.length) * 1000) / 10 : 0,
        totalPnl: Math.round(tPnl * 100) / 100,
        avgPnl: trades.length > 0 ? Math.round((tPnl / trades.length) * 100) / 100 : 0,
      };
    });

    // Recent signals from scans.csv (last 25)
    const scanRows = scansRaw ? parseCsv(scansRaw) : [];
    const recentSignals: Signal[] = scanRows
      .slice(-25)
      .reverse()
      .map((r) => {
        const note = r.note ?? r[Object.keys(r).at(-1) ?? ""] ?? "";
        // action_taken may be in different column positions — find the non-empty one near the end
        const action = r.action_taken ?? r.action ?? "no_setup";
        const rawSetups = r.setups_found ?? "0";
        return {
          timestamp: r.timestamp_utc,
          biases: parseBiasNote(note),
          setupsFound: parseInt(rawSetups) || 0,
          action,
          note: note.slice(0, 120),
        };
      });

    // Queued B/C setups (last 10)
    const queuedSetups: QueuedSetup[] = queuedRaw
      ? queuedRaw
          .trim()
          .split("\n")
          .filter(Boolean)
          .slice(-10)
          .reverse()
          .map((line) => {
            try {
              const obj = JSON.parse(line);
              const c = obj.candidate ?? {};
              return {
                queuedAt: obj.queued_at ?? "",
                pair: c.pair ?? "",
                tier: c.tier ?? "",
                direction: c.direction ?? "",
                price: c.price ?? 0,
                rsi: Math.round((c.rsi ?? 0) * 10) / 10,
                note: c.note ?? "",
              };
            } catch { return null; }
          })
          .filter(Boolean) as QueuedSetup[]
      : [];

    const currentEquity: number = state.equity ?? runningEquity;

    return NextResponse.json({
      equity: currentEquity,
      dailyPnl: state.daily_pnl ?? 0,
      consecutiveLosses: state.consecutive_losses ?? 0,
      drawdownPct: state.total_drawdown_pct ?? 0,
      openPositions: state.open_positions ?? 0,
      killSwitchActive: state.kill_switch_active ?? false,
      lastUpdated: state.last_updated ?? "",
      totalReturn: ((currentEquity - 100) / 100) * 100,
      winRate: Math.round(winRate * 10) / 10,
      totalTrades: closed.length,
      expectancy: Math.round(expectancy * 100) / 100,
      equityCurve,
      allTrades: closed.slice().reverse(),
      tierBreakdown,
      recentSignals,
      queuedSetups,
    } satisfies BotStats);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
