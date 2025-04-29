"use client"

import Link from "next/link"
import { ExternalLink, Globe, MessageCircle, Twitter } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { shortenWalletAddress } from "@/hooks/use-shorten-wallet"

type tokenInfo ={
  mint: string;
        standard: string;
        name: string;
        symbol: string; 
        logo: string;
        decimals: string;
        metaplex: {
            metadataUri: string;
            masterEdition: boolean;
            isMutable: boolean; 
            sellerFeeBasisPoints: number;
            updateAuthority: string;
            primarySaleHappened: number; 
        };
        fullyDilutedValue: string; 
        totalSupply: string; 
        totalSupplyFormatted: string;
        links: {
            reddit?: string;
            telegram?: string;
            twitter?: string;
            website?: string;
            moralis?: string;
    };
    description: string | null;
    isVerifiedContract: boolean;
}

export default function TokenCard({ data } : {
  data: tokenInfo
}) {
    const info = data;


  const formatNumber = (num: string) => {
    return Number.parseFloat(num).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })
  }
  

  return (
    <Card className="w-full max-w-md overflow-hidden border-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-slate-200 bg-white shadow-sm dark:border-slate-700">
            <img draggable={false} src={info?.logo} alt={info?.name} className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{info.name}</h2>
              {info.isVerifiedContract && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                >
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="font-mono uppercase">{info.symbol}</span>
              <span>•</span>
              <span className="capitalize">{info.standard}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-6 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500">Total Supply</p>
            <p className="font-medium">{formatNumber(info.totalSupplyFormatted)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Fully Diluted Value</p>
            <p className="font-medium">${formatNumber(info.fullyDilutedValue)}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-xs text-slate-500">Token Address</p>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm">{shortenWalletAddress(info.mint)}</p>
            <Button
                asChild
              variant="ghost"
              size="icon"
              className="h-6 w-6"
            >
             <a href={`https://solscan.io/token/${info.mint}`}
             >
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">Copy address</span>
             </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500">Decimals</p>
            <p className="font-medium">{info.decimals}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Seller Fee</p>
            <p className="font-medium">{info.metaplex.sellerFeeBasisPoints / 100}%</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t bg-slate-50 p-4 dark:bg-slate-800/50">
        <div className="flex gap-2">
          {info.links.website && (
            <Link href={info.links.website} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Website</span>
              </Button>
            </Link>
          )}
          {info.links.twitter && (
            <Link href={info.links.twitter} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
          )}
          {info.links.telegram && (
            <Link href={info.links.telegram} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Telegram</span>
              </Button>
            </Link>
          )}
        </div>
        <Link href={info.links.moralis || ''} target="_blank" rel="noopener noreferrer">
          <Button variant="default" size="sm">
            <a href="">
                View on Solscan
            </a>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
