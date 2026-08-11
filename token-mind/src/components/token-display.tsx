"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  Check,
  CircleHelp,
  Copy,
  ExternalLink,
  Globe,
  Link2,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { TokenDetails } from "../../ai/agent/get-token-info/type"
import { ChartLineLinear } from "./token-graph"


type PricePoint = { label?: string; value: number }

const fallbackHistory: PricePoint[] = [
  { label: "09:00", value: 6.72 }, { label: "10:00", value: 6.91 },
  { label: "11:00", value: 6.84 }, { label: "12:00", value: 7.12 },
  { label: "13:00", value: 7.03 }, { label: "14:00", value: 7.28 },
  { label: "15:00", value: 7.23 },
]

function formatCurrency(value?: number) {
  if (value === undefined || value === null) return "—"
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: value > 1000 ? "compact" : "standard", maximumFractionDigits: value < 1 ? 6 : 2 }).format(value)
}

function shortAddress(address: string) {
  return address.length > 28 ? `${address.slice(0, 15)}...${address.slice(-10)}` : address
}

export default function TokenDisplay({ token, priceHistory = fallbackHistory }: { token: TokenDetails['body']; priceHistory?: PricePoint[] }) {
  const [copied, setCopied] = useState(false)
  const [range, setRange] = useState("24H")
  const data = token
  const address = data.mint
  const currentPrice = token.price;
  console.log(currentPrice)
  const history = priceHistory.length ? priceHistory : fallbackHistory
  const chart = useMemo(() => {
    const width = 720, height = 220, pad = 18
    const values = history.map((point) => point.value)
    const min = Math.min(...values), max = Math.max(...values)
    const points = history.map((point, index) => {
      const x = pad + (index / Math.max(history.length - 1, 1)) * (width - pad * 2)
      const y = height - pad - ((point.value - min) / Math.max(max - min, 0.01)) * (height - pad * 2)
      return `${x},${y}`
    }).join(" ")
    return { points, area: `${pad},${height - pad} ${points} ${width - pad},${height - pad}` }
  }, [history])

  async function copyAddress() {
    if (!address) return
    await navigator.clipboard.writeText(address)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const links = [
    ["Website", data.links.website, Globe], ["X / Twitter", data.links.twitter, ExternalLink],
    ["Telegram", data.links.telegram, Link2], ["Moralis", data.links.moralis, ExternalLink], ["Reddit", data.links.reddit, Link2], ["Solscan", `https://solscan.io/token/${address}`, Link2]
  ].filter(([, href]) => href) as [string, string, typeof Globe][]

  const stats = [
    ["Fully diluted value", formatCurrency(Number(data.fullyDilutedValue))],
    ["Total supply", data.totalSupplyFormatted], ["Decimals", data.decimals],
    ["Contract", data.isVerifiedContract ? "Verified" : "Unverified"],
    ["Standard", data.standard], ["Mutable", data.metaplex.isMutable ? "Yes" : "No"],
    ["Primary sale", data.metaplex.primarySaleHappened ? "Completed" : "Not recorded"],
    ["Royalty", `${data.metaplex.sellerFeeBasisPoints / 100}%`],
  ]

  return (
    <main className="w-full bg-[#080a0d] px-2 py-2 text-[#f5f7f8] sm:px-3 sm:py-3">
      <div className="space-y-3">
        <Card className="overflow-hidden border-[#20262b] bg-[#0e1216] shadow-xl shadow-black/20">
          <CardHeader className="border-b border-[#20262b] p-5 sm:p-7">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#2b3439] bg-[#171d21] text-2xl font-semibold text-[#70e2b2]">
                  {data.logo ? <img src={data.logo} alt={`${data.name ?? "Token"} logo`} className="h-full w-full object-cover" /> : data.symbol?.slice(0, 1) ?? "?"}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">{data.name}</h1>
                    {data.isVerifiedContract && <span className="inline-flex items-center gap-1 rounded-full bg-[#143c2d] px-2 py-1 text-xs font-medium text-[#7cf0b8]"><ShieldCheck className="h-3.5 w-3.5" /> Verified</span>}
                  </div>
                  <p className="mt-1 text-sm text-[#8f9aa1]">{`${data.symbol}`} <span className="px-1 text-[#465057]">·</span> {data.standard ?? "Token"}</p>
                </div>
              </div>
              <div className="text-left md:text-right"><p className="text-xs uppercase tracking-[0.16em] text-[#77838a]">Current price</p><p className="mt-1 text-3xl font-semibold tracking-tight text-[#7cf0b8]">{formatCurrency(currentPrice)}</p><p className="mt-1 text-xs text-[#6f7a80]">Live market snapshot <ArrowUpRight className="ml-1 inline h-3 w-3" /></p></div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1 rounded-xl border border-[#283136] bg-[#12181c] px-3 py-2.5"><p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[#6f7a80]">Mint address</p><code className="block truncate text-xs text-[#c4cdd1]" title={address}>{shortAddress(address)}</code></div>
              <Button variant="outline" onClick={copyAddress} className="h-11 border-[#344047] bg-transparent text-[#dbe4e7] hover:bg-[#182126] hover:text-white"><span className="mr-2">{copied ? "Copied" : "Copy address"}</span>{copied ? <Check className="h-4 w-4 text-[#7cf0b8]" /> : <Copy className="h-4 w-4" />}</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-7 p-5 sm:p-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#202a2f] bg-[#202a2f] sm:grid-cols-4">{stats.map(([label, value]) => <div key={label} className="bg-[#11171b] p-4"><p className="text-xs text-[#78848b]">{label}</p><p className="mt-2 truncate text-sm font-medium text-[#e8edef]">{value}</p></div>)}</div>
            {data.description && <section><h2 className="mb-2 text-sm font-semibold text-[#e9eff0]">About this token</h2><p className="max-w-3xl text-sm leading-6 text-[#9ca7ac]">{data.description}</p></section>}
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <section><h2 className="mb-3 text-sm font-semibold text-[#e9eff0]">Explore links</h2>{links.length ? <div className="flex flex-wrap gap-2">{links.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#293238] bg-[#131a1e] px-3 py-2 text-xs text-[#b9c5c9] transition hover:border-[#4b8f70] hover:text-[#7cf0b8]"><Icon className="h-3.5 w-3.5" />{label}</a>)}</div> : <p className="text-sm text-[#78848b]">No external links available.</p>}</section>
            </div>
          </CardContent>
        </Card>


            <ChartLineLinear />
      </div>
    </main>
  )
}
