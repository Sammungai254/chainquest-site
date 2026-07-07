"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { EquityPoint } from "@/app/api/bot-stats/route";

interface Props {
  data: EquityPoint[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const value: number = payload[0].value;
  const diff = value - 100;
  return (
    <div className="bg-[#0d1526] border border-white/10 rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="text-[#8fa3c8] mb-1">{label}</p>
      <p className="text-[#f0f4ff] font-bold">${value.toFixed(2)}</p>
      <p className={diff >= 0 ? "text-emerald-400" : "text-red-400"}>
        {diff >= 0 ? "+" : ""}
        {diff.toFixed(2)} ({((diff / 100) * 100).toFixed(1)}%)
      </p>
    </div>
  );
}

export default function EquityChart({ data }: Props) {
  if (data.length < 2) {
    return (
      <div className="h-48 flex items-center justify-center text-[#8fa3c8] text-sm">
        Awaiting first closed trade…
      </div>
    );
  }

  const min = Math.min(...data.map((d) => d.equity));
  const max = Math.max(...data.map((d) => d.equity));
  const pad = (max - min) * 0.15 || 2;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="lineGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5c218" />
            <stop offset="100%" stopColor="#fad857" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: "#8fa3c8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[min - pad, max + pad]}
          tick={{ fill: "#8fa3c8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v.toFixed(0)}`}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={100} stroke="#f5c21830" strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="equity"
          stroke="url(#lineGold)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4, fill: "#f5c218", strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
