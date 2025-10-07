import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export function SocialLinks() {
  const socials = [
    { icon: Instagram, href: "https://instagram.com/nyumba", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/nyumba", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/nyumba", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com/nyumba", label: "YouTube" },
  ]

  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => {
        const Icon = social.icon
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-strong rounded-full p-2.5 hover:bg-[var(--nyumba-orange)]/20 hover:text-[var(--nyumba-orange)] transition-colors duration-200"
            aria-label={social.label}
            style={{ willChange: "background-color, color" }}
          >
            <Icon className="w-5 h-5" />
          </a>
        )
      })}
    </div>
  )
}
