"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  ShieldAlert,
  BarChart2,
} from "lucide-react";
import type { BotStats } from "@/app/api/bot-stats/route";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  positive,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  positive?: boolean;
  delay: number;
}) {
  const valueColor =
    positive === undefined
      ? "text-[#f0f4ff]"
      : positive
      ? "text-emerald-400"
      : "text-red-400";

  return (
    <motion.div
      className="bg-[#0d1526] border border-white/5 rounded-2xl p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8fa3c8]">
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#f5c218]/10 flex items-center justify-center">
          <Icon size={15} className="text-[#f5c218]" />
        </div>
      </div>
      <div>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        {sub && <p className="text-xs text-[#8fa3c8] mt-1">{sub}</p>}
      </div>
    </motion.div>
  );
}

export default function StatsGrid({ stats }: { stats: BotStats }) {
  const returnPositive = stats.totalReturn >= 0;
  const dailyPositive = stats.dailyPnl >= 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <StatCard
        label="Equity"
        value={`$${stats.equity.toFixed(2)}`}
        sub={`${returnPositive ? "+" : ""}${stats.totalReturn.toFixed(2)}% all time`}
        icon={TrendingUp}
        positive={returnPositive}
        delay={0}
      />
      <StatCard
        label="Daily PnL"
        value={`${dailyPositive ? "+" : ""}$${stats.dailyPnl.toFixed(2)}`}
        icon={dailyPositive ? TrendingUp : TrendingDown}
        positive={dailyPositive}
        delay={0.05}
      />
      <StatCard
        label="Win Rate"
        value={`${stats.winRate.toFixed(1)}%`}
        sub={`${stats.totalTrades} closed trades`}
        icon={Target}
        positive={stats.winRate >= 50}
        delay={0.1}
      />
      <StatCard
        label="Expectancy"
        value={`${stats.expectancy >= 0 ? "+" : ""}$${stats.expectancy.toFixed(2)}`}
        sub="per trade avg"
        icon={BarChart2}
        positive={stats.expectancy >= 0}
        delay={0.15}
      />
      <StatCard
        label="Max Drawdown"
        value={`${stats.drawdownPct.toFixed(2)}%`}
        sub="from peak equity"
        icon={ShieldAlert}
        positive={stats.drawdownPct < 10}
        delay={0.2}
      />
      <StatCard
        label="Open Positions"
        value={String(stats.openPositions)}
        sub={stats.consecutiveLosses > 0 ? `${stats.consecutiveLosses} loss streak` : "No loss streak"}
        icon={Activity}
        delay={0.25}
      />
    </div>
  );
}
