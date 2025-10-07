"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Minus, Plus, Trash2, CreditCard } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()

  const handleCheckout = () => {
    alert("Checkout functionality would integrate with payment provider (Stripe, Apple Pay, etc.)")
    clearCart()
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">Add some items to get started</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[var(--nyumba-orange)] to-[var(--nyumba-red)] hover:opacity-90 glow-orange">
                  Shop Merch
                </Button>
              </Link>
              <Link href="/tickets">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[var(--nyumba-blue)] to-[var(--nyumba-orange)] hover:opacity-90 glow-blue">
                  Get Tickets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-balance">
          <span className="bg-gradient-to-r from-[var(--nyumba-orange)] to-[var(--nyumba-red)] bg-clip-text text-transparent">
            Your Cart
          </span>
        </h1>

        <div className="space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg truncate">{item.name}</h3>
                  {item.size && <p className="text-xs sm:text-sm text-muted-foreground">Size: {item.size}</p>}
                  <p className="text-base sm:text-lg font-bold text-[var(--nyumba-orange)]">${item.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>

                  {item.type === "merch" && (
                    <div className="flex items-center gap-1 sm:gap-2 glass rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 sm:w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-base sm:text-lg">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t border-border/50 pt-2 sm:pt-3 flex justify-between text-xl sm:text-2xl font-bold">
                <span>Total</span>
                <span className="text-[var(--nyumba-orange)]">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-[var(--nyumba-orange)] via-[var(--nyumba-red)] to-[var(--nyumba-blue)] hover:opacity-90 transition-all glow-orange"
            >
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Checkout Now
            </Button>

            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              Secure checkout powered by Apple Pay & Stripe
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
