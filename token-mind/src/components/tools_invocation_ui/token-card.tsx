"use client"

import { TokenResponse } from "../../../ai/agent/get-token-info/type"
import TokenDisplay from "../token-display"

export default function TokenCard({ data } : {
  data: TokenResponse['data']
}) {

  return <TokenDisplay token={data}/>
}
