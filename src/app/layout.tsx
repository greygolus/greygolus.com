import type { Metadata } from "next";
import { Inter, Space_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

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
  description: "Grey Golus is an Optical and Multimedia Designer specializing in Wave Optics and Quantum Systems.",
  openGraph: {
    title: "Grey Golus | Optical Engineering",
    description: "Grey Golus is an Optical and Multimedia Designer specializing in Wave Optics and Quantum Systems.",
    url: 'https://greygolus.com',
    siteName: 'Grey Golus Portfolio',
    images: [
      {
        url: '/projects/interferometer.png', // Using the sleek generated interferometer graphic as the default preview
        width: 1200,
        height: 630,
        alt: 'Grey Golus Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Grey Golus | Optical Engineering",
    description: "Grey Golus is an Optical and Multimedia Designer.",
    images: ['/projects/interferometer.png'],
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
        </SmoothScroll>
      </body>
    </html>
  );
}
