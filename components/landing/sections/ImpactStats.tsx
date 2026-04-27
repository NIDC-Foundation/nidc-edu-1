"use client";
// components/landing/ImpactStatsSection.tsx
// ============================================================
// NIDC FOUNDATION — Impact Stats
// Animated counters triggered on scroll. ScrollTrigger + GSAP.
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: 124,
    suffix: "+",
    label: "Students Funded",
    desc: "From 14 countries across Africa",
    color: "text-primary",
    glow: "shadow-emerald-500/20",
    icon: "🎓",
  },
  {
    value: 1200000,
    prefix: "$",
    suffix: "",
    label: "Scholarships Awarded",
    desc: "In tuition, housing, and living costs",
    color: "text-amber-400",
    glow: "shadow-amber-500/20",
    icon: "💰",
    format: "money",
  },
  {
    value: 18,
    suffix: "",
    label: "Partner Universities",
    desc: "Across Ghana, Nigeria, Kenya & beyond",
    color: "text-sky-400",
    glow: "shadow-sky-500/20",
    icon: "🏛️",
  },
  {
    value: 94,
    suffix: "%",
    label: "Graduation Rate",
    desc: "Among all funded students",
    color: "text-violet-400",
    glow: "shadow-violet-500/20",
    icon: "📈",
  },
];

function formatMoney(val: number) {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
}

export default function ImpactStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Section reveal
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // Counter animations
    STATS.forEach((stat, i) => {
      const el = countersRef.current[i];
      if (!el) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        delay: i * 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        onUpdate() {
          if (stat.format === "money") {
            el.textContent = formatMoney(Math.floor(obj.val));
          } else {
            el.textContent = `${stat.prefix || ""}${Math.floor(obj.val)}${
              stat.suffix
            }`;
          }
        },
      });
    });

    // Cards stagger
    gsap.fromTo(
      sectionRef.current?.querySelectorAll(".stat-card") || [],
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                        from-transparent via-border to-transparent"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r
                        from-transparent via-border to-transparent"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[300px] bg-primary/5 blur-3xl rounded-full"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            Our Impact
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl font-light text-foreground
                         leading-tight tracking-tight"
          >
            Numbers that tell a<br />
            <span className="text-primary">human story</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-card group relative bg-card border border-border/70
                          rounded-2xl p-7 overflow-hidden
                          hover:border-border transition-all duration-500
                          shadow-xl ${stat.glow}`}
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${
                    stat.color.includes("emerald")
                      ? "#10b98108"
                      : stat.color.includes("amber")
                      ? "#f59e0b08"
                      : stat.color.includes("sky")
                      ? "#0ea5e908"
                      : "#8b5cf608"
                  } 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div className="text-2xl mb-5">{stat.icon}</div>

              {/* Counter */}
              <p
                className={`font-display text-4xl font-semibold ${stat.color} mb-1`}
              >
                <span
                  ref={(el) => {
                    countersRef.current[i] = el;
                  }}
                >
                  {stat.prefix || ""}
                  {0}
                  {stat.suffix}
                </span>
              </p>

              {/* Label */}
              <p className="text-foreground font-medium text-base mb-1.5">
                {stat.label}
              </p>
              <p className="text-muted-foreground/80 text-sm leading-snug">{stat.desc}</p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-px
                               bg-gradient-to-r from-transparent
                               ${
                                 stat.color.includes("emerald")
                                   ? "via-primary/40"
                                   : stat.color.includes("amber")
                                   ? "via-amber-500/40"
                                   : stat.color.includes("sky")
                                   ? "via-sky-500/40"
                                   : "via-violet-500/40"
                               }
                               to-transparent`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
