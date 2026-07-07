"use client";

import { motion } from "framer-motion";
import { Zap, Clock, AlertCircle } from "lucide-react";
import type { Signal, QueuedSetup } from "@/app/api/bot-stats/route";

const BIAS_STYLE: Record<string, string> = {
  bearish: "bg-red-500/10 text-red-400",
  bullish: "bg-emerald-500/10 text-emerald-400",
  neutral: "bg-white/5 text-[#8fa3c8]",
};

const ACTION_STYLE: Record<string, string> = {
  executed:   "bg-[#f5c218]/10 text-[#f5c218] border border-[#f5c218]/20",
  approved:   "bg-[#f5c218]/10 text-[#f5c218] border border-[#f5c218]/20",
  queued:     "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  no_setup:   "bg-white/5 text-[#8fa3c8]",
  stand_down: "bg-white/5 text-[#8fa3c8]",
};

function actionLabel(action: string) {
  if (action.toLowerCase().includes("execut")) return "Executed";
  if (action.toLowerCase().includes("queue")) return "Queued";
  return "Stand Down";
}

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function SignalFeed({
  signals,
  queued,
}: {
  signals: Signal[];
  queued: QueuedSetup[];
}) {
  const PAIRS = ["BTC", "ETH", "SOL", "XRP"];

  return (
    <div className="space-y-8">
      {/* Queued B/C setups */}
      {queued.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={14} className="text-blue-400" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8fa3c8]">
              Recent Tier B/C Signals (Queued for Approval)
            </h3>
          </div>
          <div className="space-y-2">
            {queued.map((s, i) => (
              <motion.div
                key={i}
                className="flex flex-wrap items-center gap-3 bg-blue-500/5 border border-blue-500/10 rounded-xl px-4 py-3 text-sm"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <span className="text-[#8fa3c8] text-xs whitespace-nowrap">{s.queuedAt.slice(0, 10)}</span>
                <span className="font-semibold text-[#f0f4ff]">{s.pair.replace("-USDT", "")}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.direction === "long" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                  {s.direction === "long" ? "▲ Long" : "▼ Short"}
                </span>
                <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-semibold">
                  Tier {s.tier}
                </span>
                <span className="text-xs text-[#8fa3c8]">${s.price.toLocaleString()} · RSI {s.rsi}</span>
                <span className="text-xs text-[#8fa3c8] hidden sm:block flex-1 truncate">{s.note}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recent scan ticks */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-[#f5c218]" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8fa3c8]">
            Recent Scan Ticks
          </h3>
        </div>
        <div className="space-y-1.5">
          {signals.length === 0 ? (
            <p className="text-[#8fa3c8] text-sm">No scan data yet.</p>
          ) : (
            signals.map((s, i) => {
              const actionKey = s.action.toLowerCase();
              const styleKey = Object.keys(ACTION_STYLE).find((k) => actionKey.includes(k)) ?? "no_setup";
              return (
                <motion.div
                  key={i}
                  className="flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/[0.02] transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.02 }}
                >
                  <span className="flex items-center gap-1 text-xs text-[#8fa3c8] w-20 shrink-0">
                    <Clock size={10} />
                    {timeAgo(s.timestamp)}
                  </span>

                  {/* Pair biases */}
                  <div className="flex gap-1">
                    {PAIRS.map((p) => {
                      const bias = s.biases[p];
                      if (!bias) return null;
                      return (
                        <span
                          key={p}
                          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${BIAS_STYLE[bias] ?? "text-[#8fa3c8]"}`}
                        >
                          {p} {bias === "bullish" ? "↑" : bias === "bearish" ? "↓" : "—"}
                        </span>
                      );
                    })}
                  </div>

                  {/* Action */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${ACTION_STYLE[styleKey]}`}>
                    {actionLabel(s.action)}
                  </span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
