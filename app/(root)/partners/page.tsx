"use client";
// app/(public)/partners/page.tsx
// ============================================================
// NIDC FOUNDATION — Partners Page
// Universities, corporates, NGOs, donor orgs
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const UNIVERSITIES = [
  {
    name: "University of Ghana",
    country: "Ghana 🇬🇭",
    slots: 10,
    programmes: ["Engineering", "Business", "Medicine", "Law"],
  },
  {
    name: "University of Lagos",
    country: "Nigeria 🇳🇬",
    slots: 12,
    programmes: ["Medicine", "Law", "Computer Science", "Economics"],
  },
  {
    name: "University of Nairobi",
    country: "Kenya 🇰🇪",
    slots: 8,
    programmes: ["Engineering", "Agriculture", "Arts", "Business"],
  },
  {
    name: "Makerere University",
    country: "Uganda 🇺🇬",
    slots: 6,
    programmes: ["Medicine", "Education", "Social Sciences"],
  },
  {
    name: "University of Cape Town",
    country: "S. Africa 🇿🇦",
    slots: 5,
    programmes: ["Law", "Engineering", "Business"],
  },
  {
    name: "Addis Ababa University",
    country: "Ethiopia 🇪🇹",
    slots: 7,
    programmes: ["Medicine", "Engineering", "Natural Sciences"],
  },
];

const CORPORATE_PARTNERS = [
  {
    name: "AfricaTech Fund",
    type: "Strategic Donor",
    contribution: "Annual $200K grant",
    icon: "💼",
  },
  {
    name: "West Africa Capital",
    type: "Scholarship Sponsor",
    contribution: "Funds 10 students/year",
    icon: "🏦",
  },
  {
    name: "Stanbic IBTC",
    type: "Financial Partner",
    contribution: "Banking & payments infrastructure",
    icon: "🏛️",
  },
  {
    name: "MTN Foundation",
    type: "Technology Partner",
    contribution: "Internet access for remote students",
    icon: "📡",
  },
  {
    name: "PwC Africa",
    type: "Pro Bono Partner",
    contribution: "Annual audit & governance support",
    icon: "📊",
  },
  {
    name: "Google.org",
    type: "Tech Grant",
    contribution: "$50K Google.org Impact Challenge grant",
    icon: "🔍",
  },
];

const NGO_PARTNERS = [
  {
    name: "Mastercard Foundation",
    role: "Strategic alignment on Scholars Africa Programme",
  },
  {
    name: "Tony Elumelu Foundation",
    role: "Joint mentorship programming for entrepreneurs",
  },
  { name: "UNESCO West Africa", role: "Education data & policy collaboration" },
  { name: "GIZ (Germany)", role: "Co-funding of East Africa hub operations" },
  { name: "CAMFED", role: "Joint referral pipeline for female applicants" },
];

const BENEFITS = [
  {
    icon: "🎓",
    title: "Tuition Guaranteed",
    body: "NIDC pays tuition directly to the university each semester. Zero payment risk.",
  },
  {
    icon: "✅",
    title: "Pre-Vetted Students",
    body: "Every student is rigorously screened — academically capable and genuinely committed.",
  },
  {
    icon: "📊",
    title: "Reporting Support",
    body: "We handle all scholarship reporting. Minimal administrative burden on your team.",
  },
  {
    icon: "🌍",
    title: "Brand Association",
    body: "Be associated with one of Africa's most transparent scholarship programmes.",
  },
  {
    icon: "🤝",
    title: "Access to Alumni",
    body: "Graduates become a pipeline of talent for university research and employer networks.",
  },
  {
    icon: "📋",
    title: "Flexible Arrangements",
    body: "Slot allocations, programme types, and partnership terms are negotiated to suit your institution.",
  },
];

export default function PartnersPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current?.querySelectorAll(".hero-el") || [],
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      }
    );
    pageRef.current?.querySelectorAll(".scroll-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%" },
        }
      );
    });
  }, []);

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Our Partners
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            We don't do this alone.
            <br />
            <span className="text-primary">
              Our partners make it possible.
            </span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-8">
            From universities that open their doors, to corporations that fund
            the journey, to NGOs that share our vision — the NIDC network is
            growing.
          </p>
          <div className="hero-el flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partnerships@nidcfoundation.org"
              className="px-8 py-4 bg-primary hover:bg-accent text-foreground
                         font-medium rounded-2xl transition-all"
            >
              Become a Partner →
            </a>
            <Link
              href="#universities"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#universities")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border border-border hover:border-ring/50 text-foreground/80 hover:text-foreground rounded-2xl transition-all"
            >
              View Universities
            </Link>
          </div>
        </div>
      </section>

      {/* UNIVERSITY PARTNERS */}
      <section id="universities" className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal mb-12">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Academic Partners
            </p>
            <h2 className="font-display text-4xl font-light text-foreground">
              Partner Universities
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIVERSITIES.map((u) => (
              <div
                key={u.name}
                className="scroll-reveal bg-card border border-border/70
                                           rounded-2xl p-6 hover:border-primary/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-foreground font-semibold text-sm mb-0.5">
                      {u.name}
                    </p>
                    <p className="text-muted-foreground/80 text-xs">{u.country}</p>
                  </div>
                  <span
                    className="text-xs bg-primary/10 text-primary border border-primary/20
                                   px-2.5 py-1 rounded-full shrink-0 ml-2"
                  >
                    {u.slots} slots
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {u.programmes.map((p) => (
                    <span
                      key={p}
                      className="text-xs text-muted-foreground/80 bg-muted/40 border border-border/70
                                             px-2.5 py-1 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITY BENEFITS */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Why Partner With Us
            </p>
            <h2 className="font-display text-4xl font-light text-foreground">
              What universities get
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="scroll-reveal bg-card border border-border/70
                                            rounded-2xl p-6 hover:border-border transition-all"
              >
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="text-foreground font-semibold text-sm mb-2">
                  {b.title}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE & NGO PARTNERS */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          <div>
            <div className="scroll-reveal mb-8">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
                Corporate Partners
              </p>
              <h2 className="font-display text-3xl font-light text-foreground">
                Companies that fund impact
              </h2>
            </div>
            <div className="space-y-3">
              {CORPORATE_PARTNERS.map((c) => (
                <div
                  key={c.name}
                  className="scroll-reveal flex items-start gap-4 bg-card
                                             border border-border/70 rounded-xl p-5 hover:border-border transition-all"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-foreground font-semibold text-sm">
                        {c.name}
                      </p>
                      <span
                        className="text-xs text-primary bg-primary/10 border border-primary/20
                                       px-2 py-0.5 rounded-full"
                      >
                        {c.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground/80 text-xs">{c.contribution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="scroll-reveal mb-8">
              <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
                NGO & Development Partners
              </p>
              <h2 className="font-display text-3xl font-light text-foreground">
                Organisations aligned with our mission
              </h2>
            </div>
            <div className="space-y-3">
              {NGO_PARTNERS.map((n) => (
                <div
                  key={n.name}
                  className="scroll-reveal bg-card border border-border/70
                                             rounded-xl p-5 hover:border-border transition-all"
                >
                  <p className="text-foreground font-semibold text-sm mb-1">
                    {n.name}
                  </p>
                  <p className="text-muted-foreground/80 text-xs leading-relaxed">
                    {n.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="scroll-reveal max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl font-light text-foreground mb-4">
            Interested in partnering with NIDC?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Whether you're a university, corporation, or development
            organisation — we'd love to explore how we can work together.
          </p>
          <a
            href="mailto:partnerships@nidcfoundation.org"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-accent
                       text-foreground font-medium rounded-2xl transition-all"
          >
            Get in touch →
          </a>
        </div>
      </section>
    </div>
  );
}
