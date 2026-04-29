// components/landing/FooterSection.tsx
// ============================================================
// NIDC FOUNDATION — Footer
// ============================================================

import Link from "next/link";

const LINKS = {
  Platform: [
    { label: "Apply for Scholarship", href: "/sign-up" },
    { label: "Donate", href: "/donate" },
    { label: "Transparency Dashboard", href: "/transparency" },
    { label: "Track a Student", href: "/transparency" },
  ],
  Foundation: [
    { label: "About NIDC", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Partner Universities", href: "/universities" },
    {
      label: "Become a Partner",
      href: "mailto:partnerships@nidcfoundation.org",
    },
  ],
  Support: [
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border/70 bg-background">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">NF</span>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">
                  NIDC Foundation
                </p>
                <p className="text-primary/60 text-[10px] tracking-widest uppercase">
                  Education for All
                </p>
              </div>
            </div>
            <p className="text-muted-foreground/80 text-sm leading-relaxed mb-6 max-w-xs">
              Connecting exceptional students from underserved communities with
              fully-funded university placements across Africa.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { label: "Twitter/X", icon: "𝕏", href: "https://twitter.com" },
                { label: "LinkedIn", icon: "in", href: "https://linkedin.com" },
                {
                  label: "Instagram",
                  icon: "ig",
                  href: "https://instagram.com",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-muted/40 hover:bg-muted/70 border border-border/80
                             hover:border-ring/40 rounded-lg flex items-center justify-center
                             text-muted-foreground hover:text-foreground text-xs font-bold transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-foreground font-semibold text-sm mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground/80 hover:text-foreground/80 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="border-t border-border/60">
        <div
          className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row
                        items-center justify-between gap-4"
        >
          <div>
            <p className="text-foreground text-sm font-medium mb-0.5">
              Stay updated
            </p>
            <p className="text-muted-foreground/80 text-xs">
              Get impact reports and student spotlights in your inbox.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-56 bg-muted/40 border border-border/80 text-foreground text-sm
                         placeholder-gray-600 rounded-xl px-4 py-2.5 focus:outline-none
                         focus:border-primary transition-colors"
            />
            <button
              className="px-5 py-2.5 bg-primary hover:bg-accent text-foreground text-sm
                         font-medium rounded-xl transition-colors shrink-0"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div
          className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row
                        items-center justify-between gap-2"
        >
          <p className="text-muted-foreground/70 text-xs">
            © {new Date().getFullYear()} NIDC Foundation. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Built with purpose. Powered by transparency.
          </p>
        </div>
      </div>
    </footer>
  );
}
