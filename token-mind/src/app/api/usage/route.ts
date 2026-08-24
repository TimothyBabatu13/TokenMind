export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getClientIp } from "@/lib/get-client-ip";
import { peekUsage } from "@/lib/rate-limit";
import { GUEST_DAILY_LIMIT } from "@/constants/constants";


export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    return NextResponse.json({ unlimited: true, remaining: GUEST_DAILY_LIMIT });
  }

  const ip = getClientIp(req);
  const fingerprint = req.headers.get("x-fingerprint");
  
  const { remaining } = await peekUsage(ip, fingerprint, GUEST_DAILY_LIMIT);

  return NextResponse.json({ unlimited: false, remaining });
}