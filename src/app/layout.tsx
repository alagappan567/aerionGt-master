import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aerion GT | Elevate Your Drive to Extraordinary Heights",
  description:
    "Aerion GT — crafting power, performance, and style for the ultimate driving experience. Discover the pinnacle of luxury sports cars.",
  keywords: ["Aerion GT", "sports car", "luxury car", "supercar", "performance car"],
  openGraph: {
    title: "Aerion GT | Elevate Your Drive to Extraordinary Heights",
    description:
      "Crafting Power, Performance, and Style for the Ultimate Driving Experience.",
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
      className={`${geistSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
