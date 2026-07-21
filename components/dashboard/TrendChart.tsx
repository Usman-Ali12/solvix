"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export type ChartPoint = { label: string; value: number };

export default function TrendChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#33E6D8" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#33E6D8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--slate-line))" vertical={false} />
          <XAxis
            dataKey="label"
            stroke="rgb(var(--slate-soft))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgb(var(--slate-soft))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(var(--void-soft))",
              border: "1px solid rgb(var(--slate-line))",
              borderRadius: "10px",
              fontSize: "12px",
              color: "rgb(var(--paper))",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#33E6D8"
            strokeWidth={2}
            fill="url(#trendFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
