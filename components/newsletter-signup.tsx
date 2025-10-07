"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && email.includes("@")) {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 3000)
    } else {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <div className="glass rounded-3xl p-8 space-y-4">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-strong glow-orange mb-2">
          <Mail className="w-6 h-6 text-[var(--nyumba-orange)]" />
        </div>
        <h3 className="text-2xl font-bold">Stay in the Loop</h3>
        <p className="text-muted-foreground text-sm">
          Get exclusive drops, event announcements, and special offers delivered to your inbox
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-[var(--nyumba-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--nyumba-orange)]/20 transition-all bg-transparent placeholder:text-muted-foreground"
            disabled={status === "loading" || status === "success"}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[var(--nyumba-orange)] to-[var(--nyumba-red)] hover:opacity-90 glow-orange font-bold transition-opacity duration-150"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" && "Subscribing..."}
          {status === "success" && "Subscribed!"}
          {status === "error" && "Try Again"}
          {status === "idle" && "Subscribe"}
        </Button>

        {status === "success" && (
          <p className="text-sm text-center text-[var(--nyumba-orange)] animate-in fade-in duration-200">
            Welcome to the NYUMBA family!
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-center text-[var(--nyumba-red)] animate-in fade-in duration-200">
            Please enter a valid email address
          </p>
        )}
      </form>

      <p className="text-xs text-center text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
    </div>
  )
}
