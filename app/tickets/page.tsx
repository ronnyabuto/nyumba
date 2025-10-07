"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { SearchFilterBar, type FilterState } from "@/components/search-filter-bar"

const events = [
  {
    id: "jacks-groove",
    name: "JACK'S GROOVE",
    price: 45,
    image: "/mask.png",
    type: "ticket" as const,
    date: "Mar 15, 2025",
    venue: "The Warehouse, Brooklyn",
    description:
      "Experience an unforgettable night of African-inspired electronic music with NYUMBA's signature sound. Limited capacity event featuring special guest DJs and exclusive merch drops.",
    features: [
      "3-hour live DJ set",
      "Exclusive event merchandise",
      "Meet & greet opportunity",
      "Complimentary welcome drink",
      "Limited to 500 attendees",
    ],
    relatedProducts: [
      {
        id: "nyumba-live",
        name: "NYUMBA LIVE: Spring Session",
        price: 55,
        image: "/vibrant-concert-poster-with-african-mask-and-neon-.jpg",
      },
      {
        id: "afro-beats",
        name: "Afro Beats Night",
        price: 35,
        image: "/colorful-african-dance-party-poster-with-geometric.jpg",
      },
      {
        id: "summer-festival",
        name: "NYUMBA Summer Festival",
        price: 85,
        image: "/summer-music-festival-poster-with-african-tribal-a.jpg",
      },
    ],
  },
  {
    id: "nyumba-live",
    name: "NYUMBA LIVE: Spring Session",
    price: 55,
    image: "/vibrant-concert-poster-with-african-mask-and-neon-.jpg",
    type: "ticket" as const,
    date: "Apr 22, 2025",
    venue: "Electric Garden, Manhattan",
    description:
      "Spring into the season with NYUMBA's electrifying live performance. Featuring new tracks and fan favorites in an intimate venue setting.",
    features: [
      "4-hour extended set",
      "New track premieres",
      "Interactive light show",
      "VIP lounge access available",
      "Professional photography",
    ],
    relatedProducts: [
      {
        id: "jacks-groove",
        name: "JACK'S GROOVE",
        price: 45,
        image: "/mask.png",
      },
      {
        id: "summer-festival",
        name: "NYUMBA Summer Festival",
        price: 85,
        image: "/summer-music-festival-poster-with-african-tribal-a.jpg",
      },
      {
        id: "afro-beats",
        name: "Afro Beats Night",
        price: 35,
        image: "/colorful-african-dance-party-poster-with-geometric.jpg",
      },
    ],
  },
  {
    id: "afro-beats",
    name: "Afro Beats Night",
    price: 35,
    image: "/colorful-african-dance-party-poster-with-geometric.jpg",
    type: "ticket" as const,
    date: "May 10, 2025",
    venue: "Rooftop Lounge, Queens",
    description:
      "Dance under the stars at this rooftop celebration of Afro Beats culture. Featuring multiple DJs and a vibrant atmosphere.",
    features: [
      "Rooftop venue with skyline views",
      "Multiple DJ sets",
      "Food and drink vendors",
      "Outdoor dance floor",
      "All ages welcome",
    ],
    relatedProducts: [
      {
        id: "jacks-groove",
        name: "JACK'S GROOVE",
        price: 45,
        image: "/mask.png",
      },
      {
        id: "nyumba-live",
        name: "NYUMBA LIVE: Spring Session",
        price: 55,
        image: "/vibrant-concert-poster-with-african-mask-and-neon-.jpg",
      },
      {
        id: "summer-festival",
        name: "NYUMBA Summer Festival",
        price: 85,
        image: "/summer-music-festival-poster-with-african-tribal-a.jpg",
      },
    ],
  },
  {
    id: "summer-festival",
    name: "NYUMBA Summer Festival",
    price: 85,
    image: "/summer-music-festival-poster-with-african-tribal-a.jpg",
    type: "ticket" as const,
    date: "Jun 28, 2025",
    venue: "Central Park, NYC",
    description:
      "The biggest NYUMBA event of the year. A full-day festival celebrating African music, art, and culture in the heart of NYC.",
    features: [
      "8-hour festival experience",
      "Multiple stages and artists",
      "Art installations",
      "Food court with African cuisine",
      "Festival merchandise exclusive",
    ],
    relatedProducts: [
      {
        id: "jacks-groove",
        name: "JACK'S GROOVE",
        price: 45,
        image: "/mask.png",
      },
      {
        id: "nyumba-live",
        name: "NYUMBA LIVE: Spring Session",
        price: 55,
        image: "/vibrant-concert-poster-with-african-mask-and-neon-.jpg",
      },
      {
        id: "afro-beats",
        name: "Afro Beats Night",
        price: 35,
        image: "/colorful-african-dance-party-poster-with-geometric.jpg",
      },
    ],
  },
]

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200],
    sizes: [],
    sortBy: "name",
  })

  const filteredEvents = useMemo(() => {
    let filtered = events

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    filtered = filtered.filter((event) => event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1])

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
        <div className="mb-8 sm:mb-12 text-center space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-balance px-4">
            <span className="bg-gradient-to-r from-[var(--nyumba-blue)] via-[var(--nyumba-orange)] to-[var(--nyumba-yellow)] bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Experience the rhythm of African-inspired electronic music
          </p>
        </div>

        <div className="mb-8">
          <SearchFilterBar onSearchChange={setSearchQuery} onFilterChange={setFilters} showSizeFilter={false} />
        </div>

        {(searchQuery || filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredEvents.map((event) => (
            <ProductCard key={event.id} {...event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 glass rounded-3xl">
            <p className="text-xl font-bold mb-2">No events found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </main>
  )
}
