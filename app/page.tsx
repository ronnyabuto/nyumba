"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { LimitedEditionBanner } from "@/components/limited-edition-banner"
import { SearchFilterBar, type FilterState } from "@/components/search-filter-bar"

const products = [
  {
    id: "hoodie-black",
    name: "NYUMBA Signature Hoodie",
    price: 65,
    image: "/black-hoodie-with-colorful-african-mask-logo-nyumb.jpg",
    type: "merch" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "hoodie",
    description:
      "Premium heavyweight hoodie featuring the iconic NYUMBA mask design. Crafted from 100% organic cotton for ultimate comfort and durability.",
    features: [
      "100% organic cotton fleece",
      "Screen-printed artwork",
      "Ribbed cuffs and waistband",
      "Kangaroo pocket",
      "Unisex fit",
    ],
    relatedProducts: [
      {
        id: "tee-white",
        name: "Classic NYUMBA Tee",
        price: 35,
        image: "/white-t-shirt-with-vibrant-african-mask-design.jpg",
      },
      {
        id: "hoodie-orange",
        name: "Limited Edition Orange Hoodie",
        price: 75,
        image: "/orange-hoodie-with-geometric-african-patterns.jpg",
      },
      {
        id: "tee-black",
        name: "NYUMBA Tour Tee",
        price: 40,
        image: "/black-t-shirt-with-colorful-tribal-mask-graphic.jpg",
      },
    ],
  },
  {
    id: "tee-white",
    name: "Classic NYUMBA Tee",
    price: 35,
    image: "/white-t-shirt-with-vibrant-african-mask-design.jpg",
    type: "merch" as const,
    sizes: ["S", "M", "L", "XL"],
    category: "tee",
    description:
      "Essential crew neck tee with vibrant NYUMBA artwork. Soft, breathable fabric perfect for everyday wear.",
    features: [
      "100% premium cotton",
      "Vibrant screen-printed design",
      "Pre-shrunk fabric",
      "Reinforced shoulder seams",
      "Classic fit",
    ],
    relatedProducts: [
      {
        id: "hoodie-black",
        name: "NYUMBA Signature Hoodie",
        price: 65,
        image: "/black-hoodie-with-colorful-african-mask-logo-nyumb.jpg",
      },
      {
        id: "tee-black",
        name: "NYUMBA Tour Tee",
        price: 40,
        image: "/black-t-shirt-with-colorful-tribal-mask-graphic.jpg",
      },
      {
        id: "tee-red",
        name: "Fire Red Performance Tee",
        price: 38,
        image: "/red-athletic-t-shirt-with-bold-african-design.jpg",
      },
    ],
  },
  {
    id: "hoodie-orange",
    name: "Limited Edition Orange Hoodie",
    price: 75,
    image: "/orange-hoodie-with-geometric-african-patterns.jpg",
    type: "merch" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "hoodie",
    description:
      "Exclusive limited run featuring bold geometric patterns inspired by traditional African art. Only 100 pieces available.",
    features: [
      "Limited to 100 pieces",
      "Premium heavyweight fleece",
      "Unique geometric pattern design",
      "Numbered certificate of authenticity",
      "Oversized fit",
    ],
    relatedProducts: [
      {
        id: "hoodie-black",
        name: "NYUMBA Signature Hoodie",
        price: 65,
        image: "/black-hoodie-with-colorful-african-mask-logo-nyumb.jpg",
      },
      {
        id: "hoodie-blue",
        name: "Electric Blue Hoodie",
        price: 70,
        image: "/electric-blue-hoodie-with-neon-african-mask.jpg",
      },
      {
        id: "tee-white",
        name: "Classic NYUMBA Tee",
        price: 35,
        image: "/white-t-shirt-with-vibrant-african-mask-design.jpg",
      },
    ],
  },
  {
    id: "tee-black",
    name: "NYUMBA Tour Tee",
    price: 40,
    image: "/black-t-shirt-with-colorful-tribal-mask-graphic.jpg",
    type: "merch" as const,
    sizes: ["S", "M", "L", "XL"],
    category: "tee",
    description:
      "Official tour merchandise featuring exclusive tribal mask graphic. Commemorate the NYUMBA experience.",
    features: [
      "Tour exclusive design",
      "Soft-hand screen print",
      "100% ring-spun cotton",
      "Tear-away label",
      "Slim fit",
    ],
    relatedProducts: [
      {
        id: "tee-white",
        name: "Classic NYUMBA Tee",
        price: 35,
        image: "/white-t-shirt-with-vibrant-african-mask-design.jpg",
      },
      {
        id: "tee-red",
        name: "Fire Red Performance Tee",
        price: 38,
        image: "/red-athletic-t-shirt-with-bold-african-design.jpg",
      },
      {
        id: "hoodie-black",
        name: "NYUMBA Signature Hoodie",
        price: 65,
        image: "/black-hoodie-with-colorful-african-mask-logo-nyumb.jpg",
      },
    ],
  },
  {
    id: "hoodie-blue",
    name: "Electric Blue Hoodie",
    price: 70,
    image: "/electric-blue-hoodie-with-neon-african-mask.jpg",
    type: "merch" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "hoodie",
    description:
      "Stand out with this electric blue hoodie featuring neon-inspired mask artwork. Perfect for night events.",
    features: [
      "Vibrant electric blue color",
      "Glow-in-the-dark elements",
      "Premium cotton blend",
      "Adjustable drawstring hood",
      "Regular fit",
    ],
    relatedProducts: [
      {
        id: "hoodie-orange",
        name: "Limited Edition Orange Hoodie",
        price: 75,
        image: "/orange-hoodie-with-geometric-african-patterns.jpg",
      },
      {
        id: "hoodie-black",
        name: "NYUMBA Signature Hoodie",
        price: 65,
        image: "/black-hoodie-with-colorful-african-mask-logo-nyumb.jpg",
      },
      {
        id: "tee-black",
        name: "NYUMBA Tour Tee",
        price: 40,
        image: "/black-t-shirt-with-colorful-tribal-mask-graphic.jpg",
      },
    ],
  },
  {
    id: "tee-red",
    name: "Fire Red Performance Tee",
    price: 38,
    image: "/red-athletic-t-shirt-with-bold-african-design.jpg",
    type: "merch" as const,
    sizes: ["S", "M", "L", "XL"],
    category: "tee",
    description: "High-performance athletic tee with moisture-wicking technology. Bold design meets functionality.",
    features: [
      "Moisture-wicking fabric",
      "Breathable mesh panels",
      "Anti-odor technology",
      "Reflective details",
      "Athletic fit",
    ],
    relatedProducts: [
      {
        id: "tee-white",
        name: "Classic NYUMBA Tee",
        price: 35,
        image: "/white-t-shirt-with-vibrant-african-mask-design.jpg",
      },
      {
        id: "tee-black",
        name: "NYUMBA Tour Tee",
        price: 40,
        image: "/black-t-shirt-with-colorful-tribal-mask-graphic.jpg",
      },
      {
        id: "hoodie-blue",
        name: "Electric Blue Hoodie",
        price: 70,
        image: "/electric-blue-hoodie-with-neon-african-mask.jpg",
      },
    ],
  },
]

export default function ShopPage() {
  const jacksGrooveDate = new Date("2025-03-15T20:00:00")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200],
    sizes: [],
    sortBy: "name",
  })

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => product.sizes?.some((size) => filters.sizes.includes(size)))
    }

    filtered = [...filtered].sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.price - b.price
      if (filters.sortBy === "price-desc") return b.price - a.price
      return a.name.localeCompare(b.name)
    })

    return filtered
  }, [searchQuery, filters])

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <LimitedEditionBanner
          title="JACK'S GROOVE"
          subtitle="Exclusive event merch drops with your ticket"
          targetDate={jacksGrooveDate}
          image="/mask.png"
          ctaText="Get Tickets"
          ctaLink="/tickets"
        />

        <div>
          <div className="mb-8 sm:mb-12 text-center space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-balance px-4">
              <span className="bg-gradient-to-r from-[var(--nyumba-orange)] via-[var(--nyumba-yellow)] to-[var(--nyumba-red)] bg-clip-text text-transparent">
                Official Merch
              </span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">Premium streetwear inspired by Nyumba</p>
          </div>

          <div className="mb-8">
            <SearchFilterBar onSearchChange={setSearchQuery} onFilterChange={setFilters} showSizeFilter={true} />
          </div>

          {(searchQuery || filters.sizes.length > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 glass rounded-3xl">
              <p className="text-xl font-bold mb-2">No products found</p>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
