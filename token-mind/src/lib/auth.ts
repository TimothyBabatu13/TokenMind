import type { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.id) {
        await prisma.user.upsert({
          where: { id: user.id },
          update: { email: user.email, name: user.name, image: user.image },
          create: {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },
  },
};