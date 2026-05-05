import type { Metadata } from "next";
import { Inter, Space_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  weight: ["700", "800"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grey Golus | Optical Engineering",
  description: "Grey's Personal Portfolio Website",
  openGraph: {
    title: "Grey Golus | Optical Engineering",
    description: "Grey's Personal Portfolio Website",
    url: 'https://greygolus.com',
    siteName: 'Grey Golus Portfolio',
    images: [
      {
        url: '/logo.png',
        alt: 'Grey Golus Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Grey Golus | Optical Engineering",
    description: "Grey's Personal Portfolio Website",
    images: ['/logo.png'],
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
        className={`${inter.variable} ${spaceMono.variable} ${outfit.variable} ${syne.variable} antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}
