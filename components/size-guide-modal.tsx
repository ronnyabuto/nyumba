"use client"

import { X } from "lucide-react"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-6 md:p-8 animate-in zoom-in-95 duration-200" style={{ willChange: "transform, opacity" }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass-strong rounded-full p-2 hover:bg-white/20 transition-colors duration-150"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-bold mb-6">Size Guide</h2>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--nyumba-orange)]">T-Shirts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Size</th>
                    <th className="text-left py-3 px-4">Chest (inches)</th>
                    <th className="text-left py-3 px-4">Length (inches)</th>
                    <th className="text-left py-3 px-4">Sleeve (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">34-36</td>
                    <td className="py-3 px-4">27</td>
                    <td className="py-3 px-4">8</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">38-40</td>
                    <td className="py-3 px-4">28</td>
                    <td className="py-3 px-4">8.5</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">42-44</td>
                    <td className="py-3 px-4">29</td>
                    <td className="py-3 px-4">9</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">46-48</td>
                    <td className="py-3 px-4">30</td>
                    <td className="py-3 px-4">9.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--nyumba-blue)]">Hoodies</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Size</th>
                    <th className="text-left py-3 px-4">Chest (inches)</th>
                    <th className="text-left py-3 px-4">Length (inches)</th>
                    <th className="text-left py-3 px-4">Sleeve (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">36-38</td>
                    <td className="py-3 px-4">26</td>
                    <td className="py-3 px-4">33</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">40-42</td>
                    <td className="py-3 px-4">27</td>
                    <td className="py-3 px-4">34</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">44-46</td>
                    <td className="py-3 px-4">28</td>
                    <td className="py-3 px-4">35</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">48-50</td>
                    <td className="py-3 px-4">29</td>
                    <td className="py-3 px-4">36</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">XXL</td>
                    <td className="py-3 px-4">52-54</td>
                    <td className="py-3 px-4">30</td>
                    <td className="py-3 px-4">37</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-[var(--nyumba-yellow)]">How to Measure</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[var(--nyumba-orange)] mt-1">•</span>
                <span>
                  <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--nyumba-orange)] mt-1">•</span>
                <span>
                  <strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--nyumba-orange)] mt-1">•</span>
                <span>
                  <strong>Sleeve:</strong> Measure from the center back of the neck to the end of the sleeve
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
