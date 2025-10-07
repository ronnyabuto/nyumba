"use client"

import { useState, lazy, Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { useFavorites } from "./favorites-provider"
import { ShoppingCart, Zap, X, Heart, Ruler, Share2 } from "lucide-react"

const SizeGuideModal = lazy(() => import("./size-guide-modal").then((mod) => ({ default: mod.SizeGuideModal })))

interface ProductDetailsModalProps {
  product: {
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
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [isAdding, setIsAdding] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  if (!isOpen) return null

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: `${product.id}-${selectedSize || "default"}`,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      type: product.type,
    })
    setTimeout(() => setIsAdding(false), 600)
  }

  const handleBuyNow = () => {
    addItem({
      id: `${product.id}-${selectedSize || "default"}`,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      type: product.type,
    })
    window.location.href = "/cart"
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} on NYUMBA`,
        url: window.location.href,
      })
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />

        <div className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto glass-strong rounded-2xl sm:rounded-3xl animate-in zoom-in-95 duration-200" style={{ willChange: "transform, opacity" }}>
          <button
            onClick={onClose}
            className="sticky top-2 sm:top-4 right-2 sm:right-4 float-right z-10 glass-strong rounded-full p-2 hover:bg-white/20 transition-colors duration-150"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-6 md:p-8">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden glass">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={90}
                />
                {product.type === "ticket" && product.date && (
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 glass-strong px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold glow-blue">
                    {product.date}
                  </div>
                )}
              </div>

              {product.relatedProducts && product.relatedProducts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-muted-foreground">You might also like</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {product.relatedProducts.map((related) => (
                      <div
                        key={related.id}
                        className="glass rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                        style={{ willChange: "transform" }}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={related.image || "/placeholder.svg"}
                            alt={related.name}
                            fill
                            sizes="(max-width: 768px) 33vw, 16vw"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium truncate">{related.name}</p>
                          <p className="text-xs text-muted-foreground">${related.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-balance">{product.name}</h2>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="glass-strong rounded-full p-2 hover:bg-white/20 flex-shrink-0 transition-colors duration-150"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite(product.id) ? "fill-[var(--nyumba-red)] text-[var(--nyumba-red)]" : ""
                      }`}
                    />
                  </button>
                </div>
                {product.venue && <p className="text-muted-foreground text-sm sm:text-base">{product.venue}</p>}
                <p className="text-2xl sm:text-3xl font-bold text-[var(--nyumba-orange)]">${product.price}</p>
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{product.description}</p>
              )}

              {product.features && (
                <div className="space-y-2">
                  <h3 className="font-bold text-sm sm:text-base">Features</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-[var(--nyumba-orange)] mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.sizes && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base">Select Size</h3>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs sm:text-sm text-[var(--nyumba-orange)] hover:underline flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3 sm:w-4 sm:h-4" />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                          selectedSize === size
                            ? "bg-[var(--nyumba-orange)] text-[var(--nyumba-orange-foreground)] glow-orange"
                            : "glass hover:bg-white/10"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 glass border-[var(--nyumba-orange)]/50 hover:bg-[var(--nyumba-orange)]/10 hover:border-[var(--nyumba-orange)] bg-transparent text-sm sm:text-base transition-colors duration-150"
                  disabled={isAdding}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isAdding ? "Added!" : "Add to Cart"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-[var(--nyumba-orange)] to-[var(--nyumba-red)] hover:opacity-90 glow-orange font-bold text-sm sm:text-base transition-opacity duration-150"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>

              <Button
                onClick={handleShare}
                variant="ghost"
                className="w-full glass hover:bg-white/10 text-sm sm:text-base"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showSizeGuide && (
        <Suspense fallback={null}>
          <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
        </Suspense>
      )}
    </>
  )
}
