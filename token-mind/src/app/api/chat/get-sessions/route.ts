import { getAuthToken } from "@/lib/get-auth-token";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => { 
    const token = await getAuthToken(req);
    
    if (!token) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    
    const sessions = await prisma.chatSession.findMany({
        where: { userId: token!.sub! },
        orderBy: { updatedAt: "desc" },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    
    return NextResponse.json({ sessions });
}