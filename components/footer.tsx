import { NewsletterSignup } from "./newsletter-signup"
import { SocialLinks } from "./social-links"

export function Footer() {
  return (
    <footer className="border-t border-white/10 backdrop-blur-xl bg-black/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto mb-12">
          <NewsletterSignup />
        </div>

        <div className="flex flex-col items-center justify-center space-y-6">
          <SocialLinks />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} NYUMBA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
