import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GA_TRACKING_ID } from "../lib/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UpShiftRx - AI-Powered Drug Repurposing",
  description: "Discovering new uses for existing drugs through advanced AI and literature mining. Accelerating healthcare innovation for better patient outcomes.",
  keywords: "drug repurposing, AI, healthcare, medical research, pharmaceutical, biotech",
  authors: [{ name: "UpShiftRx LLC" }],
  openGraph: {
    title: "UpShiftRx - AI-Powered Drug Repurposing",
    description: "Accelerating healthcare innovation through AI-driven drug repurposing",
    url: "https://upshiftrx.ai",
    siteName: "UpShiftRx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpShiftRx - AI-Powered Drug Repurposing",
    description: "Accelerating healthcare innovation through AI-driven drug repurposing",
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
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
