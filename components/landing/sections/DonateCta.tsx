"use client";
// components/landing/DonateCTASection.tsx
// ============================================================
// NIDC FOUNDATION — Donate CTA Section
// High-conversion, emotional CTA before footer.
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const AMOUNTS = [25, 50, 100, 250];

export default function DonateCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current?.querySelectorAll(".reveal") || [],
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                        from-transparent via-border to-transparent"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[500px]
                        bg-[radial-gradient(ellipse,_#10b98112_0%,_transparent_65%)]"
        />
        {/* Decorative ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[600px] rounded-full border border-primary/5"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[400px] h-[400px] rounded-full border border-primary/8"
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="reveal">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            Make a Difference
          </p>
        </div>

        {/* Headline */}
        <h2
          className="reveal font-display text-4xl sm:text-5xl lg:text-6xl font-light
                       text-foreground leading-tight tracking-tight mb-6"
        >
          One donation.
          <br />
          <span className="text-primary">One life changed forever.</span>
        </h2>

        {/* Sub */}
        <p className="reveal text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-10">
          $50 covers a student's textbooks for a semester. $250 pays a month's
          housing. Every amount matters — and every cent is publicly tracked.
        </p>

        {/* Quick amount selector */}
        <div className="reveal flex flex-wrap items-center justify-center gap-3 mb-6">
          {AMOUNTS.map((amount) => (
            <Link
              key={amount}
              href={`/donate?amount=${amount}`}
              className="group px-6 py-3 bg-muted/40 hover:bg-primary
                         border border-border hover:border-primary
                         text-foreground/80 hover:text-foreground font-medium rounded-xl
                         transition-all duration-300 text-sm"
            >
              ${amount}
            </Link>
          ))}
          <Link
            href="/donate"
            className="px-6 py-3 border border-dashed border-border/90 hover:border-ring/40
                       text-muted-foreground hover:text-foreground text-sm rounded-xl transition-all duration-300"
          >
            Custom amount
          </Link>
        </div>

        {/* Primary CTA */}
        <div className="reveal">
          <Link
            href="/donate"
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary
                       hover:bg-accent text-foreground font-medium rounded-2xl
                       transition-all duration-300 shadow-2xl shadow-primary/30
                       hover:shadow-primary/40 hover:-translate-y-0.5 text-base"
          >
            <span>Donate Now</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Link>

          <p className="text-muted-foreground/70 text-xs mt-4">
            100% transparent · Secure payments via Stripe · Tax deductible in
            eligible regions
          </p>
        </div>
      </div>
    </section>
  );
}
