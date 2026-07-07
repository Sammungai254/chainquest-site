import type { Metadata } from "next";
import { Bot, Wifi, WifiOff, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsGrid from "@/components/bot/StatsGrid";
import TradesTable from "@/components/bot/TradesTable";
import EquityChartWrapper from "@/components/bot/EquityChartWrapper";
import TierBreakdown from "@/components/bot/TierBreakdown";
import SignalFeed from "@/components/bot/SignalFeed";
import type { BotStats } from "@/app/api/bot-stats/route";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Trading Bot",
  description:
    "Real-time performance dashboard for the ChainQuest OKX perpetual-swap trading bot — equity curve, win rate, and live trade history.",
};

async function fetchStats(): Promise<BotStats | null> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chainquest.co.ke";
    const res = await fetch(`${base}/api/bot-stats`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function minutesAgo(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
}

export default async function BotPage() {
  const stats = await fetchStats();

  if (!stats) {
    return (
      <main className="min-h-screen bg-[#080e1e]">
        <Navbar />
        <section className="py-32 text-center text-[#8fa3c8]">
          <Bot size={40} className="mx-auto mb-4 text-[#f5c218]" />
          <p className="text-lg">Bot data temporarily unavailable — check back in a moment.</p>
          <p className="text-sm mt-2">
            Make sure <code className="text-[#f5c218]">GITHUB_TOKEN</code> is set in your deployment env.
          </p>
        </section>
        <Footer />
      </main>
    );
  }

  const ago = minutesAgo(stats.lastUpdated);
  const isOnline = ago < 20;

  return (
    <main className="min-h-screen bg-[#080e1e]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-8 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#f5c218]/10 border border-[#f5c218]/20 flex items-center justify-center">
              <Bot size={22} className="text-[#f5c218]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#f0f4ff]">OKX Trading Bot</h1>
              <p className="text-xs text-[#8fa3c8]">Perpetual swaps · BTC · ETH · SOL · XRP</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold ${
                isOnline
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isOnline ? "LIVE" : "OFFLINE"}
            </span>
            <span className="flex items-center gap-1.5 text-[#8fa3c8]">
              <Clock size={12} />
              Last scan {ago < 1 ? "just now" : `${ago}m ago`}
            </span>
            {stats.killSwitchActive && (
              <span className="px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-semibold">
                ⛔ Kill switch
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-4 sm:px-6 pb-12 max-w-5xl mx-auto">
        <SectionHeading
          badge="Performance"
          title="Live "
          highlight="Stats"
          centered={false}
        />
        <StatsGrid stats={stats} />
      </section>

      {/* ── Equity Curve ── */}
      <section className="px-4 sm:px-6 pb-12 max-w-5xl mx-auto">
        <SectionHeading
          badge="Equity Curve"
          title="Account "
          highlight="Growth"
          centered={false}
        />
        <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6">
          <EquityChartWrapper data={stats.equityCurve} />
        </div>
      </section>

      {/* ── Tier Breakdown ── */}
      <section className="px-4 sm:px-6 pb-12 max-w-5xl mx-auto">
        <SectionHeading
          badge="By Strategy"
          title="Tier "
          highlight="Breakdown"
          centered={false}
        />
        <TierBreakdown tiers={stats.tierBreakdown ?? []} />
      </section>

      {/* ── Signals ── */}
      <section className="px-4 sm:px-6 pb-12 max-w-5xl mx-auto">
        <SectionHeading
          badge="Signal Activity"
          title="Recent "
          highlight="Signals"
          centered={false}
        />
        <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6">
          <SignalFeed signals={stats.recentSignals ?? []} queued={stats.queuedSetups ?? []} />
        </div>
      </section>

      {/* ── Trades ── */}
      <section className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto">
        <SectionHeading
          badge="Trade History"
          title="Recent "
          highlight="Trades"
          centered={false}
        />
        <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6">
          <TradesTable trades={stats.allTrades} />
        </div>
        <p className="mt-4 text-xs text-[#8fa3c8] text-center">
          Data refreshes every 60 seconds from live journal · Powered by ChainQuest
        </p>
      </section>

      <Footer />
    </main>
  );
}
