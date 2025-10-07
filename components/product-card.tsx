"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { useFavorites } from "./favorites-provider"
import { ShoppingCart, Zap, Heart } from "lucide-react"
import { ProductDetailsModal } from "./product-details-modal"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  type: "merch" | "ticket"
  sizes?: string[]
  date?: string
  venue?: string
  description?: string
  features?: string[]
  relatedProducts?: Array<{
    id: string
    name: string
    price: number
    image: string
  }>
}

export function ProductCard({
  id,
  name,
  price,
  image,
  type,
  sizes,
  date,
  venue,
  description,
  features,
  relatedProducts,
}: ProductCardProps) {
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [selectedSize, setSelectedSize] = useState(sizes?.[0])
  const [isAdding, setIsAdding] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: `${id}-${selectedSize || "default"}`,
      name,
      price,
      image,
      size: selectedSize,
      type,
    })
    setTimeout(() => setIsAdding(false), 600)
  }

  const handleBuyNow = () => {
    addItem({
      id: `${id}-${selectedSize || "default"}`,
      name,
      price,
      image,
      size: selectedSize,
      type,
    })
    window.location.href = "/cart"
  }

  return (
    <>
      <div className="group glass rounded-3xl overflow-hidden transition-transform duration-200 hover:scale-[1.02]" style={{ willChange: "transform" }}>
        <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => setShowModal(true)}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ willChange: "transform" }}
            loading="lazy"
          />
          {type === "ticket" && date && (
            <div className="absolute top-4 right-4 glass-strong px-3 py-1.5 rounded-full text-xs font-bold glow-blue">
              {date}
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(id)
            }}
            className="absolute top-4 left-4 glass-strong rounded-full p-2 hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ willChange: "opacity" }}
          >
            <Heart className={`w-4 h-4 ${isFavorite(id) ? "fill-[var(--nyumba-red)] text-[var(--nyumba-red)]" : ""}`} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="cursor-pointer" onClick={() => setShowModal(true)}>
            <h3 className="text-xl font-bold text-balance hover:text-[var(--nyumba-orange)] transition-colors duration-200">
              {name}
            </h3>
            {venue && <p className="text-sm text-muted-foreground mt-1">{venue}</p>}
          </div>

          {sizes && (
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    selectedSize === size
                      ? "bg-[var(--nyumba-orange)] text-[var(--nyumba-orange-foreground)] glow-orange"
                      : "glass hover:bg-white/10"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold">${price}</span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1 glass border-[var(--nyumba-orange)]/50 hover:bg-[var(--nyumba-orange)]/10 hover:border-[var(--nyumba-orange)] bg-transparent transition-colors duration-150"
              disabled={isAdding}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isAdding ? "Added!" : "Add"}
            </Button>
            <Button
              onClick={handleBuyNow}
              className="flex-1 bg-gradient-to-r from-[var(--nyumba-orange)] to-[var(--nyumba-red)] hover:opacity-90 glow-orange font-bold transition-opacity duration-150"
            >
              <Zap className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <ProductDetailsModal
        product={{ id, name, price, image, type, sizes, date, venue, description, features, relatedProducts }}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}
