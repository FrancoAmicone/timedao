import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TimeDAO - Decentralized Time Marketplace",
  description: "Tokenize time commitments and manage on-chain relationships with TimeDAO. A decentralized platform for time trading and partnership management.",
  keywords: ["TimeDAO", "Web3", "Blockchain", "DeFi", "Time Marketplace", "Marriage DAO"],
  authors: [{ name: "TimeDAO Team" }],
  openGraph: {
    title: "TimeDAO - Decentralized Time Marketplace",
    description: "Your time is your most valuable asset. Make it count.",
    type: "website",
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
        <Navbar showWallet />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer showSocial />
      </body>
    </html>
  );
}
