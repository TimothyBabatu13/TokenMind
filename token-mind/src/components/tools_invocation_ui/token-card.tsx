"use client"

import Link from "next/link"
import { ExternalLink, Globe, MessageCircle, Twitter } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { shortenWalletAddress } from "@/hooks/use-shorten-wallet"
import { TokenDetails } from "../../../ai/agent/get-token-info/type"
import TokenDisplay from "../token-display"

const formatNumber = (num: string) => {
    return Number.parseFloat(num).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })
  }

export default function TokenCard({ data } : {
  data: TokenDetails['body']
}) {
  
  const info = data;
  console.log(info)

  return <TokenDisplay token={info}/>
//   const isTokenIfo = Boolean(info) && Boolean(info.links)
//   return (
//     <Card className="w-full max-w-md overflow-hidden border border-gray-700 
//   bg-gradient-to-br from-black to-gray-900 text-white">
//   <CardHeader className="pb-0">
//     <div className="flex items-center gap-4">
//       <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-600 bg-gray-800 shadow-sm">
//         <img draggable={false} src={info?.logo} alt={info?.name} className="object-cover" />
//       </div>
//       <div>
//         <h2 className="text-2xl font-bold text-white">{info.name}</h2>
//         <div className="flex items-center gap-2 text-gray-400">
//           <span className="font-mono uppercase">{info.symbol}</span>
//           <span>•</span>
//           <span className="capitalize">{info.standard}</span>
//         </div>
//       </div>
//     </div>
//   </CardHeader>

//   <CardContent className="mt-6 grid gap-4">
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <p className="text-xs text-gray-400">Total Supply</p>
//         <p className="font-medium text-white">{formatNumber(info.totalSupplyFormatted)}</p>
//       </div>
//       <div>
//         <p className="text-xs text-gray-400">Fully Diluted Value</p>
//         <p className="font-medium text-white">${formatNumber(info.fullyDilutedValue)}</p>
//       </div>
//     </div>
//     <Separator className="bg-gray-700" />
//     <div>
//       <p className="text-xs text-gray-400">Token Address</p>
//       <div className="flex items-center gap-2">
//         <p className="font-mono text-sm text-white">{shortenWalletAddress(info.mint)}</p>
//         <Button variant="outline" size="icon" className="h-6 w-6 border-gray-600 text-gray-200 hover:bg-gray-800">
//           <ExternalLink className="h-3 w-3" />
//         </Button>
//       </div>
//     </div>
//   </CardContent>

//   <CardFooter className="flex justify-between border-t border-gray-700 bg-gray-800 p-4">
//     <div className="flex gap-2">
//       {isTokenIfo && info.links.website && (
//         <Link href={info.links.website} target="_blank">
//           <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-600 text-gray-200 hover:bg-gray-700">
//             <Globe className="h-4 w-4" />
//           </Button>
//         </Link>
//       )}
//       {isTokenIfo && info.links.twitter && (
//         <Link href={info.links.twitter} target="_blank">
//           <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-600 text-gray-200 hover:bg-gray-700">
//             <Twitter className="h-4 w-4" />
//           </Button>
//         </Link>
//       )}
//     </div>
//     <Link href={`https://solscan.io/token/${info.mint}`} target="_blank">
//       <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
//         View on Solscan
//       </Button>
//     </Link>
//   </CardFooter>
// </Card>

//   )
}
