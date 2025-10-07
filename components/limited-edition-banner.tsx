"use client"

import Image from "next/image"
import { CountdownTimer } from "./countdown-timer"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface LimitedEditionBannerProps {
  title: string
  subtitle?: string
  targetDate: Date
  image: string
  ctaText?: string
  ctaLink?: string
}

export function LimitedEditionBanner({
  title,
  subtitle,
  targetDate,
  image,
  ctaText = "Shop Now",
  ctaLink = "/",
}: LimitedEditionBannerProps) {
  return (
    <div className="relative glass rounded-2xl sm:rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--nyumba-orange)]/20 via-[var(--nyumba-red)]/20 to-[var(--nyumba-blue)]/20" />

      <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-12">
        <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 glass-strong px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit glow-orange">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--nyumba-orange)]" />
            <span className="text-xs sm:text-sm font-bold">LIMITED EDITION</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance leading-tight">
              <span className="bg-gradient-to-r from-[var(--nyumba-orange)] via-[var(--nyumba-yellow)] to-[var(--nyumba-red)] bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {subtitle && <p className="text-base sm:text-lg text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">Drops in</p>
            <CountdownTimer targetDate={targetDate} />
          </div>

          <Button
            onClick={() => (window.location.href = ctaLink)}
            className="w-full sm:w-auto bg-gradient-to-r from-[var(--nyumba-orange)] to-[var(--nyumba-red)] hover:opacity-90 glow-orange font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
          >
            {ctaText}
          </Button>
        </div>

        <div className="relative aspect-square md:aspect-auto min-h-[250px] sm:min-h-[300px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
