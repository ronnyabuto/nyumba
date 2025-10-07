"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchFilterBarProps {
  onSearchChange: (query: string) => void
  onFilterChange: (filters: FilterState) => void
  showSizeFilter?: boolean
}

export interface FilterState {
  priceRange: [number, number]
  sizes: string[]
  sortBy: "price-asc" | "price-desc" | "name"
}

export function SearchFilterBar({ onSearchChange, onFilterChange, showSizeFilter = true }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200],
    sizes: [],
    sortBy: "name",
  })

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange(value)
  }

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 200],
      sizes: [],
      sortBy: "name",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = filters.sizes.length > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 200

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--nyumba-orange)] text-base transition-shadow duration-150"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="glass border-[var(--nyumba-orange)]/50 hover:bg-[var(--nyumba-orange)]/10 bg-transparent"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && <span className="ml-2 w-2 h-2 rounded-full bg-[var(--nyumba-orange)]" />}
        </Button>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-[var(--nyumba-orange)] hover:underline">
            Clear all
          </button>
        )}
      </div>

      {showFilters && (
        <div className="glass rounded-2xl p-6 space-y-6 animate-in slide-in-from-top duration-200">
          <div className="space-y-3">
            <label className="text-sm font-bold">Sort By</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "name", label: "Name" },
                { value: "price-asc", label: "Price: Low to High" },
                { value: "price-desc", label: "Price: High to Low" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange({ sortBy: option.value as FilterState["sortBy"] })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    filters.sortBy === option.value
                      ? "bg-[var(--nyumba-orange)] text-[var(--nyumba-orange-foreground)] glow-orange"
                      : "glass hover:bg-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {showSizeFilter && (
            <div className="space-y-3">
              <label className="text-sm font-bold">Size</label>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      const newSizes = filters.sizes.includes(size)
                        ? filters.sizes.filter((s) => s !== size)
                        : [...filters.sizes, size]
                      handleFilterChange({ sizes: newSizes })
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      filters.sizes.includes(size)
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

          <div className="space-y-3">
            <label className="text-sm font-bold">Price Range</label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange({ priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)] })
                }
                className="w-full accent-[var(--nyumba-orange)]"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
