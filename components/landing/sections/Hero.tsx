"use client";
// components/landing/HeroSection.tsx
// ============================================================
// NIDC FOUNDATION — Hero Section
// Full viewport. Editorial serif headline. Animated ticker.
// Grain texture. Gradient mesh. GSAP staggered reveal.
// ============================================================

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        headlineRef.current?.querySelectorAll(".word") || [],
        { opacity: 0, y: 40, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.2"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        tickerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      );
  }, []);

  const headline = "Every Brilliant Mind Deserves A Chance To Shine".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center
                 px-6 pt-28 pb-16 overflow-hidden"
    >
      {/* ── Background: layered gradient mesh ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep base */}
        <div className="absolute inset-0 bg-background" />

        {/* Radial emerald glow — top centre */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2
                        w-[900px] h-[700px] rounded-full
                        bg-[radial-gradient(ellipse_at_center,_#10b98118_0%,_transparent_65%)]"
        />

        {/* Gold warmth — bottom left */}
        <div
          className="absolute bottom-[-5%] left-[-5%]
                        w-[500px] h-[500px] rounded-full
                        bg-[radial-gradient(ellipse_at_center,_#d4a84308_0%,_transparent_70%)]"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
          }}
        />

        {/* Decorative circle — top right */}
        <div className="absolute top-32 right-10 w-72 h-72 rounded-full border border-primary/8" />
        <div className="absolute top-40 right-18 w-52 h-52 rounded-full border border-primary/5" />
        {/* Floating dot accents */}
        <div className="absolute top-48 right-32 w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="absolute top-64 right-20 w-1 h-1 rounded-full bg-primary/30" />
        <div className="absolute top-56 left-20 w-1 h-1 rounded-full bg-amber-400/30" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
          <span
            className="flex items-center gap-2 bg-primary/10 border border-primary/25
                           text-primary text-xs font-medium px-4 py-2 rounded-full
                           backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Funding bright futures since 2024
          </span>
        </div>

        {/* Headline — word-by-word animation */}
        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                     font-light leading-[1.05] tracking-[-0.02em] text-foreground mb-8"
        >
          {headline.map((word, i) => {
            // "Shine" gets the gold accent
            const isAccent = word === "Shine";
            // "Brilliant" and "Mind" get emerald
            const isEmerald = word === "Brilliant" || word === "Mind";
            return (
              <span key={i} className="word inline-block mr-[0.22em]">
                <span
                  className={
                    isAccent
                      ? "text-amber-400"
                      : isEmerald
                      ? "text-primary"
                      : "text-foreground"
                  }
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Sub-headline */}
        <p
          ref={subRef}
          className="font-body text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto
                     leading-relaxed mb-10"
        >
          NIDC Foundation connects exceptional students from underserved
          communities with fully-funded university placements — and tracks every
          shilling of impact.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/sign-up"
            className="group relative px-8 py-4 bg-primary hover:bg-accent
                       text-foreground font-medium rounded-2xl transition-all duration-300
                       shadow-xl shadow-primary/30 hover:shadow-primary/40
                       hover:-translate-y-0.5"
          >
            <span className="relative z-10">Apply for a Scholarship</span>
            <span
              className="absolute inset-0 rounded-2xl bg-foreground/10 opacity-0
                             group-hover:opacity-100 transition-opacity"
            />
          </Link>

          <Link
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-2.5 px-8 py-4 border border-border
                       hover:border-ring/50 text-foreground/80 hover:text-foreground font-medium
                       rounded-2xl transition-all duration-300 backdrop-blur-sm"
          >
            See how it works
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Live ticker row */}
        <div ref={tickerRef}>
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-border" />
            <p className="text-muted-foreground/70 text-xs uppercase tracking-widest">
              Live impact
            </p>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-border" />
          </div>

          <div
            className="inline-flex flex-wrap justify-center gap-6 bg-card/80
                          border border-border/70 rounded-2xl px-8 py-5 backdrop-blur-sm"
          >
            {[
              { value: "124", label: "Students Funded", suffix: "+" },
              { value: "$1.2M", label: "Scholarships Awarded", suffix: "" },
              { value: "18", label: "Partner Universities", suffix: "" },
              { value: "94%", label: "Graduation Rate", suffix: "" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p className="text-foreground font-display text-2xl font-semibold">
                  {stat.value}
                  <span className="text-primary">{stat.suffix}</span>
                </p>
                <p className="text-muted-foreground/80 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-5 h-8 border border-border rounded-full flex items-start
                        justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-primary/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
