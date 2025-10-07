"use client"

import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { useCart } from "./cart-provider"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Navigation() {
  const { items } = useCart()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-xl sm:text-2xl font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-[var(--nyumba-orange)] via-[var(--nyumba-blue)] to-[var(--nyumba-red)] bg-clip-text text-transparent">
                NYUMBA
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-150 hover:text-[var(--nyumba-orange)] ${
                pathname === "/" ? "text-[var(--nyumba-orange)]" : "text-foreground/80"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/tickets"
              className={`text-sm font-medium transition-colors duration-150 hover:text-[var(--nyumba-blue)] ${
                pathname === "/tickets" ? "text-[var(--nyumba-blue)]" : "text-foreground/80"
              }`}
            >
              Tickets
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-lg transition-colors duration-150">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--nyumba-orange)] text-[var(--nyumba-orange-foreground)] text-xs font-bold rounded-full flex items-center justify-center glow-orange">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-lg transition-colors duration-150">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--nyumba-orange)] text-[var(--nyumba-orange-foreground)] text-xs font-bold rounded-full flex items-center justify-center glow-orange">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-150"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 py-4 space-y-2 animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                pathname === "/" ? "bg-[var(--nyumba-orange)]/10 text-[var(--nyumba-orange)]" : "hover:bg-white/5"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/tickets"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                pathname === "/tickets" ? "bg-[var(--nyumba-blue)]/10 text-[var(--nyumba-blue)]" : "hover:bg-white/5"
              }`}
            >
              Tickets
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
