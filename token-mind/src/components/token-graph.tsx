"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TokenResponse } from "../../ai/agent/get-token-info/type"


const chartConfig = {
  price: {
    label: "Price",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

const SUBSCRIPTS = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"]

function formatPrice(price: number): string {
  if (!Number.isFinite(price)) return "—"
  if (price === 0) return "$0.00"
  if (price >= 1) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
  if (price >= 0.01) return `$${price.toFixed(4)}`

  const fixed = price.toFixed(18)
  const [, decimals = ""] = fixed.split(".")
  let zeroCount = 0
  while (decimals[zeroCount] === "0") zeroCount++

  const significant = decimals.slice(zeroCount, zeroCount + 4)
  const subscript = String(zeroCount)
    .split("")
    .map((d) => SUBSCRIPTS[Number(d)])
    .join("")

  return `$0.0${subscript}${significant}`
}

function formatPct(pct: number | undefined): string {
  if (pct === undefined || !Number.isFinite(pct)) return "—"
  const sign = pct > 0 ? "+" : ""
  return `${sign}${pct.toFixed(1)}%`
}

type TimeframeKey = "1m" | "5m" | "30m" | "1h" | "2h" | "4h" | "8h" | "24h"

const TIMEFRAMES: { key: TimeframeKey; historyField: keyof TokenResponse['data']; pctField: keyof TokenResponse['data'] }[] = [
  { key: "1m", historyField: "history1mPrice", pctField: "priceChange1mPercent" },
  { key: "5m", historyField: "history5mPrice", pctField: "priceChange5mPercent" },
  { key: "30m", historyField: "history30mPrice", pctField: "priceChange30mPercent" },
  { key: "1h", historyField: "history1hPrice", pctField: "priceChange1hPercent" },
  { key: "2h", historyField: "history2hPrice", pctField: "priceChange2hPercent" },
  { key: "4h", historyField: "history4hPrice", pctField: "priceChange4hPercent" },
  { key: "8h", historyField: "history8hPrice", pctField: "priceChange8hPercent" },
  { key: "24h", historyField: "history24hPrice", pctField: "priceChange24hPercent" },
]

export function TokenPriceHistory({
  token,
  symbol,
}: {
  token: TokenResponse['data']
  symbol?: string
}) {
  // Oldest -> newest, so the chart reads left-to-right as a timeline.
  const chartData = React.useMemo(
    () => [
      { label: "24h", price: token.history24hPrice },
      { label: "8h", price: token.history8hPrice },
      { label: "4h", price: token.history4hPrice },
      { label: "2h", price: token.history2hPrice },
      { label: "1h", price: token.history1hPrice },
      { label: "30m", price: token.history30mPrice },
      { label: "5m", price: token.history5mPrice },
      { label: "1m", price: token.history1mPrice },
      { label: "Now", price: token.price },
    ],
    [token]
  )

  const trendUp = token.price >= token.history24hPrice
  const trendColor = trendUp ? "hsl(152 65% 42%)" : "hsl(4 75% 55%)"
  const dayPct = token.priceChange24hPercent

  return (
    <div className="rounded-xl border border-border bg-card p-5 text-card-foreground">
      {/* Header: live price ticker */}
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {symbol ?? "Token"} · Price
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums">
            {formatPrice(token.price)}
          </div>
        </div>
        <div
          className="rounded-md px-2 py-1 font-mono text-sm font-medium tabular-nums"
        >
          {formatPct(dayPct)} · 24h
        </div>
      </div>

      {/* Trend area chart across lookback windows */}
      <ChartContainer config={chartConfig} className="mt-4 aspect-auto h-[160px] w-full">
        <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="tokenPriceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={trendColor} stopOpacity={0.35} />
              <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={11}
          />
          <YAxis hide domain={["auto", "auto"]} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => formatPrice(Number(value))}
                labelKey="label"
              />
            }
          />
          <Area
            dataKey="price"
            type="monotone"
            stroke={trendColor}
            strokeWidth={2}
            fill="url(#tokenPriceFill)"
          />
        </AreaChart>
      </ChartContainer>

      {/* Momentum strip: every timeframe's % change, heat-colored */}
      <div className="mt-4 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
        {TIMEFRAMES.map(({ key, pctField }) => (
          <div
            key={key}
            className="flex flex-col items-center gap-0.5 rounded-md px-1.5 py-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
              {key}
            </span>
            <span className="font-mono text-xs font-semibold tabular-nums">
              {formatPct(token[pctField] as number)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}