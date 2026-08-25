import { getAuthToken, getSessionId } from "@/lib/get-auth-token";
import { toUIMessages } from "@/lib/chat-messages";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const token = await getAuthToken(req);
    const sessionId = getSessionId(req);

    if (!token) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    if (!sessionId) {
        return NextResponse.json({ message: 'sessionId needs to passed to the url' }, { status: 400 });
    }

    const session = await prisma.chatSession.findFirst({
        where: { id: sessionId, userId: token.sub! },
        select: { id: true },
    });

    if (!session) {
        return NextResponse.json({ messages: [] });
    }

    const messages = await prisma.message.findMany({
        where: { sessionId },
        orderBy: { createdAt: "asc" },
        select: {
            id: true,
            content: true,
            createdAt: true,
            role: true,
            parts: true,
            attachments: true,
        },
    });

    return NextResponse.json({ messages: toUIMessages(messages) });
};
