"use client";
// components/landing/HowItWorksSection.tsx
// ============================================================
// NIDC FOUNDATION — How It Works
// 4-step process. Vertical timeline on mobile, horizontal on desktop.
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Apply Online",
    body: "Fill out our scholarship application — your story, your background, your university of choice. It takes about 10 minutes.",
    icon: "✍️",
    cta: { label: "Start Application", href: "/register" },
  },
  {
    number: "02",
    title: "We Review & Select",
    body: "Our admissions team carefully reviews every application. Selected students are notified within 10 business days.",
    icon: "🔍",
  },
  {
    number: "03",
    title: "Get Fully Funded",
    body: "Accepted students receive funding covering tuition, housing, and a living stipend — sourced from our transparent donor pool.",
    icon: "💳",
  },
  {
    number: "04",
    title: "Mentorship & Beyond",
    body: "From enrollment to graduation and first job — we stay with you. Access mentors, job placements, and an alumni network.",
    icon: "🤝",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading reveal
    gsap.fromTo(
      sectionRef.current?.querySelector(".section-header"),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );

    // Steps stagger
    gsap.fromTo(
      sectionRef.current?.querySelectorAll(".step-card") || [],
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );

    // Line draw
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                        from-transparent via-border to-transparent"
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px]
                        bg-[radial-gradient(ellipse,_#d4a84306_0%,_transparent_70%)]"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="section-header text-center mb-20">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            The Journey
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl font-light text-foreground
                         leading-tight tracking-tight mb-5"
          >
            From application to
            <span className="text-amber-400"> graduation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            A clear, transparent process — so you always know exactly where you
            stand.
          </p>
        </div>

        {/* Desktop: horizontal connector line */}
        <div className="hidden lg:block relative mb-0">
          <div
            className="absolute top-10 left-[calc(12.5%)] right-[calc(12.5%)] h-px
                          bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
          >
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/60 via-emerald-400 to-emerald-500/60"
            />
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {STEPS.map((step, i) => (
            <div key={step.number} className="step-card group relative">
              {/* Mobile: vertical connector */}
              {i < STEPS.length - 1 && (
                <div
                  className="lg:hidden absolute left-7 top-20 bottom-0 w-px
                                bg-gradient-to-b from-emerald-500/30 to-transparent"
                />
              )}

              <div
                className="relative bg-card border border-border/70 rounded-2xl p-7
                              hover:border-primary/20 transition-all duration-500
                              group-hover:bg-[#0a1428]"
              >
                {/* Step number + icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20
                                    flex items-center justify-center text-2xl
                                    group-hover:bg-accent/15 group-hover:border-primary/30
                                    transition-all duration-300"
                    >
                      {step.icon}
                    </div>
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-primary/10 blur-md
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                  <span
                    className="font-display text-5xl font-light text-foreground/10
                                   group-hover:text-foreground/12 transition-colors duration-300
                                   select-none"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-foreground font-semibold text-lg mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  {step.body}
                </p>

                {/* Optional CTA */}
                {step.cta && (
                  <Link
                    href={step.cta.href}
                    className="inline-flex items-center gap-1.5 mt-5 text-primary
                               hover:text-accent text-sm font-medium transition-colors"
                  >
                    {step.cta.label}
                    <svg
                      className="w-3.5 h-3.5"
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
                )}

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px
                                bg-gradient-to-r from-transparent via-primary/0
                                group-hover:via-primary/30 to-transparent
                                transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
