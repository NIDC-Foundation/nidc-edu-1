"use client";
// app/(public)/impact/page.tsx
// ============================================================
// NIDC FOUNDATION — Impact Page
// Data, outcomes, student journeys, country breakdown
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OUTCOMES = [
  {
    value: "94%",
    label: "Graduation Rate",
    desc: "Of all NIDC students who enroll, 94% complete their degree.",
    icon: "🎓",
    color: "text-primary",
  },
  {
    value: "87%",
    label: "Employed Within 6mo",
    desc: "Of graduates find employment within 6 months of finishing.",
    icon: "💼",
    color: "text-amber-400",
  },
  {
    value: "3.2×",
    label: "Income Multiplier",
    desc: "Average income increase vs. family baseline within 3 years.",
    icon: "📈",
    color: "text-sky-400",
  },
  {
    value: "68%",
    label: "Support Family",
    desc: "Of employed alumni send financial support back to their families.",
    icon: "👨‍👩‍👧",
    color: "text-violet-400",
  },
];

const COUNTRIES = [
  { flag: "🇬🇭", name: "Ghana", students: 42, graduated: 14, employed: 12 },
  { flag: "🇳🇬", name: "Nigeria", students: 38, graduated: 10, employed: 9 },
  { flag: "🇰🇪", name: "Kenya", students: 22, graduated: 6, employed: 5 },
  { flag: "🇺🇬", name: "Uganda", students: 8, graduated: 2, employed: 2 },
  { flag: "🇸🇳", name: "Senegal", students: 7, graduated: 1, employed: 1 },
  { flag: "🇿🇦", name: "South Africa", students: 5, graduated: 1, employed: 1 },
  { flag: "🇪🇹", name: "Ethiopia", students: 2, graduated: 0, employed: 0 },
];

const FIELDS = [
  { field: "Computer Science & Engineering", count: 34, pct: 27 },
  { field: "Medicine & Health Sciences", count: 24, pct: 19 },
  { field: "Business & Economics", count: 22, pct: 18 },
  { field: "Law", count: 15, pct: 12 },
  { field: "Education", count: 14, pct: 11 },
  { field: "Agriculture & Environment", count: 9, pct: 7 },
  { field: "Arts & Social Sciences", count: 6, pct: 5 },
];

const STORIES = [
  {
    name: "Amara Diallo",
    country: "Guinea 🇬🇳",
    field: "Computer Science",
    university: "University of Ghana",
    year: "Year 2",
    color: "bg-primary/20 text-primary",
    quote:
      "I come from a village with no electricity. NIDC gave me a laptop, a stipend, and a future in tech. I'm building apps that could help my community.",
  },
  {
    name: "Dr. Fatima Al-Hassan",
    country: "Nigeria 🇳🇬",
    field: "Medicine",
    university: "University of Lagos",
    year: "Graduated 2024",
    color: "bg-amber-500/20 text-amber-400",
    quote:
      "I'm the first doctor in my family's history. First in my village. I'm now working in Lagos and sending money home every month.",
  },
  {
    name: "David Mwangi",
    country: "Kenya 🇰🇪",
    field: "Software Engineering",
    university: "University of Nairobi",
    year: "Employed",
    color: "bg-sky-500/20 text-sky-400",
    quote:
      "From selling vegetables in Kisumu to working at a fintech startup in Nairobi. I mentor NIDC students now. I know what they're going through.",
  },
];

export default function ImpactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

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

    // Animate outcome counters
    [
      { val: 94, suffix: "%" },
      { val: 87, suffix: "%" },
      { val: 3.2, suffix: "×" },
      { val: 68, suffix: "%" },
    ].forEach((c, i) => {
      const el = countersRef.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: c.val,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".outcomes-trigger",
          start: "top 78%",
          once: true,
        },
        onUpdate() {
          el.textContent = `${
            c.val % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val)
          }${c.suffix}`;
        },
      });
    });
  }, []);

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        bg-[radial-gradient(ellipse,_#10b98112_0%,_transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Our Impact
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            Not just scholarships.
            <br />
            <span className="text-primary">Transformed lives.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Every data point below is a real person — with a name, a family, a
            community. Here&apos;s what NIDC Foundation has made possible.
          </p>
        </div>
      </section>

      {/* OUTCOME STATS */}
      <section className="outcomes-trigger py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {OUTCOMES.map((o, i) => (
            <div
              key={o.label}
              className="scroll-reveal bg-card border border-border/70
                                          rounded-2xl p-7 text-center hover:border-border transition-all"
            >
              <div className="text-3xl mb-4">{o.icon}</div>
              <p
                className={`font-display text-4xl font-semibold mb-2 ${o.color}`}
              >
                <span
                  ref={(el) => {
                    countersRef.current[i] = el;
                  }}
                >
                  0
                </span>
              </p>
              <p className="text-foreground font-medium text-sm mb-2">{o.label}</p>
              <p className="text-muted-foreground/80 text-xs leading-snug">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FIELD OF STUDY BREAKDOWN */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal mb-12">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              By Field of Study
            </p>
            <h2 className="font-display text-3xl font-light text-foreground">
              Where students are studying
            </h2>
          </div>
          <div className="space-y-4">
            {FIELDS.map((f) => (
              <div key={f.field} className="scroll-reveal">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-foreground/80 text-sm">{f.field}</p>
                  <p className="text-muted-foreground/80 text-xs">
                    {f.count} students · {f.pct}%
                  </p>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-2 rounded-full
                                  transition-all duration-700"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRY BREAKDOWN */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              By Country
            </p>
            <h2 className="font-display text-3xl font-light text-foreground">
              Where our students are from
            </h2>
          </div>
          <div className="scroll-reveal overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/80">
                  {["Country", "Active Students", "Graduated", "Employed"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-muted-foreground/80 text-xs uppercase tracking-wider pb-4 pr-6"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COUNTRIES.map((c) => (
                  <tr
                    key={c.name}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.flag}</span>
                        <span className="text-foreground font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-primary font-semibold">
                      {c.students}
                    </td>
                    <td className="py-4 pr-6 text-amber-400">{c.graduated}</td>
                    <td className="py-4 text-sky-400">{c.employed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* STUDENT STORIES */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Stories
            </p>
            <h2 className="font-display text-4xl font-light text-foreground">
              Behind the numbers
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {STORIES.map((s) => (
              <div
                key={s.name}
                className="scroll-reveal bg-card border border-border/70
                                           rounded-2xl p-7 flex flex-col gap-5"
              >
                <blockquote className="text-foreground/80 text-sm leading-relaxed flex-1">
                  "{s.quote}"
                </blockquote>
                <div className="h-px bg-muted/50" />
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                                   font-bold text-xs shrink-0 ${s.color}`}
                  >
                    {s.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">{s.name}</p>
                    <p className="text-muted-foreground/80 text-xs">
                      {s.field} · {s.country}
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs bg-muted/50 border border-border/80
                                   text-muted-foreground px-2 py-1 rounded-full"
                  >
                    {s.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
