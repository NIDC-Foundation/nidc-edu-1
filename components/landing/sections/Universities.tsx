"use client";
// components/landing/UniversitiesSection.tsx
// ============================================================
// NIDC FOUNDATION — Partner Universities
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UNIVERSITIES = [
  {
    name: "University of Ghana",
    country: "Ghana",
    flag: "🇬🇭",
    slots: 10,
    founded: "1948",
  },
  {
    name: "University of Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    slots: 12,
    founded: "1962",
  },
  {
    name: "University of Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    slots: 8,
    founded: "1956",
  },
  {
    name: "Makerere University",
    country: "Uganda",
    flag: "🇺🇬",
    slots: 6,
    founded: "1922",
  },
  {
    name: "University of Cape Town",
    country: "S. Africa",
    flag: "🇿🇦",
    slots: 5,
    founded: "1829",
  },
  {
    name: "Addis Ababa University",
    country: "Ethiopia",
    flag: "🇪🇹",
    slots: 7,
    founded: "1950",
  },
];

export default function UniversitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
    gsap.fromTo(
      sectionRef.current?.querySelectorAll(".uni-card") || [],
      { opacity: 0, scale: 0.97, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="universities"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                        from-transparent via-border to-transparent"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px]
                        bg-[radial-gradient(ellipse,_#10b9810a_0%,_transparent_70%)]"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="section-header text-center mb-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            Our Partners
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl font-light text-foreground
                         leading-tight tracking-tight mb-5"
          >
            World-class universities.
            <br />
            <span className="text-primary">Open to every student.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            We partner with leading African universities who are committed to
            opening their doors to exceptional students, regardless of financial
            means.
          </p>
        </div>

        {/* University grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UNIVERSITIES.map((uni) => (
            <div
              key={uni.name}
              className="uni-card group bg-card border border-border/70 rounded-2xl p-6
                         hover:border-primary/20 transition-all duration-400 cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{uni.flag}</div>
                <span
                  className="text-xs text-muted-foreground/70 bg-muted/40 border border-border/60
                                 px-2.5 py-1 rounded-full"
                >
                  Est. {uni.founded}
                </span>
              </div>

              <h3
                className="text-foreground font-semibold text-base mb-1 leading-snug
                             group-hover:text-primary transition-colors duration-300"
              >
                {uni.name}
              </h3>
              <p className="text-muted-foreground/80 text-sm mb-4">{uni.country}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: Math.min(uni.slots, 8) }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.floor(uni.slots * 0.6)
                              ? "bg-primary"
                              : "bg-foreground/10"
                          }`}
                        />
                      )
                    )}
                    {uni.slots > 8 && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/80">
                  <span className="text-primary font-medium">
                    {uni.slots}
                  </span>{" "}
                  slots open
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner CTA */}
        <div
          className="mt-14 bg-card border border-border/70 rounded-2xl p-8
                        flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-foreground font-semibold text-lg mb-1">
              Are you a university?
            </p>
            <p className="text-muted-foreground text-sm max-w-sm">
              Partner with NIDC Foundation and help us place exceptional
              students at your institution.
            </p>
          </div>
          <a
            href="mailto:partnerships@nidcfoundation.org"
            className="shrink-0 px-6 py-3 border border-primary/40 hover:border-primary/70
                       text-primary hover:text-accent text-sm font-medium rounded-xl
                       transition-all duration-300 hover:bg-accent/5"
          >
            Become a Partner →
          </a>
        </div>
      </div>
    </section>
  );
}
