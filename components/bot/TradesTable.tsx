"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Trade } from "@/app/api/bot-stats/route";

const PAIR_COLORS: Record<string, string> = {
  "BTC-USDT": "text-amber-400",
  "ETH-USDT": "text-blue-400",
  "SOL-USDT": "text-purple-400",
  "XRP-USDT": "text-cyan-400",
};

const PAGE_SIZE = 15;

const PAIRS = ["All", "BTC", "ETH", "SOL", "XRP"];
const DIRS = ["All", "Long", "Short"];
const TIERS = ["All", "A", "A1H", "B", "C"];

export default function TradesTable({ trades }: { trades: Trade[] }) {
  const [pair, setPair] = useState("All");
  const [dir, setDir] = useState("All");
  const [tier, setTier] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return trades.filter((t) => {
      if (pair !== "All" && !t.pair.startsWith(pair)) return false;
      if (dir !== "All" && t.direction !== dir.toLowerCase()) return false;
      if (tier !== "All" && t.tier !== tier) return false;
      return true;
    });
  }, [trades, pair, dir, tier]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageSlice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const wins = filtered.filter((t) => t.pnl > 0).length;
  const totalPnl = filtered.reduce((s, t) => s + t.pnl, 0);
  const winRate = filtered.length > 0 ? (wins / filtered.length) * 100 : 0;

  function FilterPills({
    options,
    value,
    onChange,
  }: {
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => { onChange(o); setPage(1); }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              value === o
                ? "bg-[#f5c218] text-[#080e1e]"
                : "bg-white/5 text-[#8fa3c8] hover:bg-white/10"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    );
  }

  if (trades.length === 0) {
    return (
      <div className="text-center py-12 text-[#8fa3c8] text-sm">
        No closed trades yet — the bot is live and scanning.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-start">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-[#8fa3c8] font-semibold">Pair</p>
          <FilterPills options={PAIRS} value={pair} onChange={setPair} />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-[#8fa3c8] font-semibold">Direction</p>
          <FilterPills options={DIRS} value={dir} onChange={setDir} />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-[#8fa3c8] font-semibold">Tier</p>
          <FilterPills options={TIERS} value={tier} onChange={setTier} />
        </div>
      </div>

      {/* Filtered summary bar */}
      <div className="flex items-center gap-4 py-2 px-3 bg-white/[0.03] rounded-xl text-xs text-[#8fa3c8] border border-white/5">
        <span><Search size={11} className="inline mr-1" />{filtered.length} trades</span>
        <span>Win rate: <span className={winRate >= 50 ? "text-emerald-400" : "text-red-400"}>{winRate.toFixed(1)}%</span></span>
        <span>Total PnL: <span className={totalPnl >= 0 ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>{totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}</span></span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {["Date", "Pair", "Direction", "Tier", "PnL"].map((h) => (
                <th key={h} className="text-left pb-3 text-xs uppercase tracking-widest text-[#8fa3c8] font-semibold pr-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageSlice.map((t, i) => (
              <motion.tr
                key={`${t.timestamp}-${i}`}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
              >
                <td className="py-3 pr-4 text-[#8fa3c8] whitespace-nowrap">{t.timestamp.slice(0, 10)}</td>
                <td className={`py-3 pr-4 font-medium ${PAIR_COLORS[t.pair] ?? "text-[#f0f4ff]"}`}>
                  {t.pair.replace("-USDT", "")}
                </td>
                <td className="py-3 pr-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    t.direction === "long"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {t.direction === "long" ? "▲ Long" : "▼ Short"}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs bg-[#f5c218]/10 text-[#f5c218] px-2 py-0.5 rounded-full font-semibold">
                    {t.tier}
                  </span>
                </td>
                <td className={`py-3 font-bold ${t.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {t.pnl >= 0 ? "+" : ""}${t.pnl.toFixed(2)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#8fa3c8]">
            Page {safePage} of {totalPages} · {filtered.length} trades
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="p-1.5 rounded-lg bg-white/5 text-[#8fa3c8] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="p-1.5 rounded-lg bg-white/5 text-[#8fa3c8] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
