import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const getAuthToken = async (req: NextRequest) => {
  const authToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return authToken
}

export const getSessionId = (req: NextRequest) => {
    const sessionId = req.nextUrl.searchParams.get("sessionId") as string;
    return sessionId
}