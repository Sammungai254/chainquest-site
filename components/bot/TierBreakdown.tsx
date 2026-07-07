"use client";

import { motion } from "framer-motion";
import type { TierStats } from "@/app/api/bot-stats/route";

const TIER_DESCRIPTIONS: Record<string, string> = {
  A:   "15m textbook — RSI + EMA + volume confluence",
  A1H: "1H entry — higher timeframe, wider SL gate (2.5%)",
  B:   "15m setup — queued for manual approval only",
  C:   "Reversal candle — queued for manual approval only",
};

const TIER_COLORS: Record<string, string> = {
  A:   "from-[#f5c218]/20 to-[#f5c218]/5 border-[#f5c218]/20",
  A1H: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
  B:   "from-purple-500/20 to-purple-500/5 border-purple-500/20",
  C:   "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
};

const TIER_ACCENT: Record<string, string> = {
  A: "#f5c218", A1H: "#60a5fa", B: "#a78bfa", C: "#22d3ee",
};

export default function TierBreakdown({ tiers }: { tiers: TierStats[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tiers.map((t, i) => {
        const accent = TIER_ACCENT[t.tier] ?? "#f5c218";
        const isEmpty = t.trades === 0;
        return (
          <motion.div
            key={t.tier}
            className={`bg-gradient-to-br ${TIER_COLORS[t.tier] ?? "from-white/5 to-transparent border-white/10"} border rounded-2xl p-5`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-black px-2.5 py-0.5 rounded-lg"
                  style={{ background: `${accent}20`, color: accent }}
                >
                  Tier {t.tier}
                </span>
                {(t.tier === "B" || t.tier === "C") && (
                  <span className="text-[10px] bg-white/5 text-[#8fa3c8] px-2 py-0.5 rounded-full">
                    Approval only
                  </span>
                )}
              </div>
              <span className="text-xs text-[#8fa3c8]">{t.trades} trades</span>
            </div>

            <p className="text-[11px] text-[#8fa3c8] mb-4 leading-relaxed">
              {TIER_DESCRIPTIONS[t.tier]}
            </p>

            {isEmpty ? (
              <p className="text-xs text-[#8fa3c8] italic">No closed trades yet</p>
            ) : (
              <>
                {/* Win rate bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#8fa3c8]">Win rate</span>
                    <span
                      className="font-bold"
                      style={{ color: t.winRate >= 50 ? "#34d399" : "#f87171" }}
                    >
                      {t.winRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: t.winRate >= 50 ? "#34d399" : "#f87171" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.winRate}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.08 + 0.2 }}
                    />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "W / L", value: `${t.wins} / ${t.losses}` },
                    { label: "Total PnL", value: `${t.totalPnl >= 0 ? "+" : ""}$${t.totalPnl.toFixed(2)}`, positive: t.totalPnl >= 0 },
                    { label: "Avg / trade", value: `${t.avgPnl >= 0 ? "+" : ""}$${t.avgPnl.toFixed(2)}`, positive: t.avgPnl >= 0 },
                  ].map((s) => (
                    <div key={s.label} className="bg-black/20 rounded-xl py-2">
                      <p className={`text-sm font-bold ${s.positive === undefined ? "text-[#f0f4ff]" : s.positive ? "text-emerald-400" : "text-red-400"}`}>
                        {s.value}
                      </p>
                      <p className="text-[10px] text-[#8fa3c8] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
