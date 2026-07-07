"use client";

import dynamic from "next/dynamic";
import type { EquityPoint } from "@/app/api/bot-stats/route";

const EquityChart = dynamic(() => import("./EquityChart"), {
  ssr: false,
  loading: () => (
    <div className="h-[220px] flex items-center justify-center text-[#8fa3c8] text-sm animate-pulse">
      Loading chart…
    </div>
  ),
});

export default function EquityChartWrapper({ data }: { data: EquityPoint[] }) {
  return <EquityChart data={data} />;
}
