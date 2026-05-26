import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChainQuest Ke | Web, AI & Blockchain Solutions",
  description:
    "Empowering Digital Growth through Web Development, AI Automation, and Blockchain Education. Expert training, portfolio creation, and business transformation in Kenya.",
  keywords: [
    "web development Kenya",
    "blockchain education",
    "crypto trading",
    "AI solutions",
    "digital transformation",
    "ChainQuest",
  ],
  openGraph: {
    title: "ChainQuest Ke | Web, AI & Blockchain Solutions",
    description:
      "Empowering Digital Growth through Web, AI & Blockchain in Kenya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#080e1e] text-[#f0f4ff]">
        {children}
      </body>
    </html>
  );
}
