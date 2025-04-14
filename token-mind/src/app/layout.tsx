import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSession from "@/context/AuthSession";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "TokenMind";
const DESCRIPTION = `AI Crypto Assistant: Discover trending tokens, get real-time news, and swap tokens seamlessly with our intelligent AI agent.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    siteId: '',
    creator: 'timothy_akanbii',
    images: ''
  },
  openGraph : {
    title: TITLE,
    description: DESCRIPTION,
    url: 'WEBSITE_URL',
    siteName: TITLE,
    locale: 'en_US',
    type: 'website',
    images: ''
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSession>
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
