"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

type TokenInfo = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
    tags: string[];
    daily_volume: number;
    created_at: string;
    freeze_authority: string | null;
    mint_authority: string | null;
    permanent_delegate: string | null;
    minted_at: string | null;
    extensions: {
      coingeckoId?: string;
      [key: string]: any;
    };
  };
  
  type GetTrendingTokenUIProps = {
    data: TokenInfo[];
  };




export const GetTrendingTokenUI = ({data}: GetTrendingTokenUIProps) => {


  const [copied, setCopied] = useState(false);
  const [text, setText] = useState('');
  
  const copyToClipboard = async (address: string) => {
    setText(address);
    await navigator.clipboard.writeText(address);
    if (data) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Trending Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          {
            data.map(datum => {
                return(
                <div key={crypto.randomUUID()} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full overflow-hidden bg-muted">
                    <img
                      src={datum.logoURI || "/placeholder.svg"}
                      alt={`${datum.name} logo`}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover"
                      draggable={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{datum.name}</h3>
                    <p className="text-muted-foreground">{datum.symbol}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Price:</span>
                    {/* datum.toFixed(2) */}
                    <span className="font-medium">${0}</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Wallet Address:</label>
                    <div className="flex items-center">
                      <div className="bg-muted p-2 rounded-l-md overflow-hidden text-ellipsis flex-1">
                        <code className="text-xs sm:text-sm break-all">{datum.address}</code>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none h-[42px] cursor-pointer"
                        onClick={()=>copyToClipboard(datum.address)}
                      >
                        {copied && text === datum.address ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy address</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>)
              })  
          }
        </CardContent>
      </Card>
    </div>
  )
}