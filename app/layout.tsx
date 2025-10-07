import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { FavoritesProvider } from "@/components/favorites-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "NYUMBA - Premium African-Inspired Streetwear & Events",
  description:
    "Official store for NYUMBA - DJ, music producer, and event brand. Shop exclusive streetwear, hoodies, tees, and get tickets to unforgettable African-inspired electronic music events.",
  keywords: [
    "NYUMBA",
    "African streetwear",
    "DJ merch",
    "electronic music",
    "event tickets",
    "premium hoodies",
    "music producer",
    "African-inspired fashion",
  ],
  authors: [{ name: "NYUMBA" }],
  creator: "spacebar creatives",
  publisher: "NYUMBA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nyumba.com",
    siteName: "NYUMBA",
    title: "NYUMBA - Premium African-Inspired Streetwear & Events",
    description:
      "Shop exclusive NYUMBA merchandise and get tickets to unforgettable African-inspired electronic music events.",
    images: [
      {
        url: "/mask.png",
        width: 1200,
        height: 630,
        alt: "NYUMBA Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NYUMBA - Premium African-Inspired Streetwear & Events",
    description: "Shop exclusive merch and get tickets to unforgettable events.",
    images: ["/mask.png"],
    creator: "@nyumba",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NYUMBA",
              description: "DJ, music producer, and event brand specializing in African-inspired electronic music",
              url: "https://nyumba.com",
              logo: "https://nyumba.com/mask.png",
              sameAs: [
                "https://instagram.com/nyumba",
                "https://twitter.com/nyumba",
                "https://facebook.com/nyumba",
                "https://youtube.com/nyumba",
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <FavoritesProvider>
            <CartProvider>
              <Navigation />
              {children}
              <Footer />
            </CartProvider>
          </FavoritesProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
