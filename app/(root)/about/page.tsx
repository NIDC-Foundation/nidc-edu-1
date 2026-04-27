"use client";
// app/(public)/about/page.tsx
// ============================================================
// NIDC FOUNDATION — About Page
// Mission, Story, Values, Team
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    icon: "🔍",
    title: "Radical Transparency",
    body: "Every dollar is publicly traceable from donor to student. No exceptions.",
  },
  {
    icon: "⚖️",
    title: "Merit & Need",
    body: "We select students based on both academic promise and genuine financial need.",
  },
  {
    icon: "🤝",
    title: "Long-Term Commitment",
    body: "We don't drop students at graduation — we stay through their first job and beyond.",
  },
  {
    icon: "🌍",
    title: "Pan-African Vision",
    body: "Africa's future depends on its youth. We start here and we think continent-wide.",
  },
  {
    icon: "📊",
    title: "Data-Driven Impact",
    body: "Every decision is backed by outcome data — graduation rates, employment, earnings.",
  },
  {
    icon: "🏗️",
    title: "Systems Change",
    body: "Individual scholarships matter. But we're working to change the system entirely.",
  },
];

const TEAM = [
  {
    name: "Dr. Emmanuel Osei",
    role: "Executive Director",
    country: "🇬🇭",
    bio: "Former UNESCO education advisor. 20+ years in access-to-education programs.",
  },
  {
    name: "Aisha Bello",
    role: "Head of Scholarships",
    country: "🇳🇬",
    bio: "Rhodes Scholar. Built Nigeria's first rural education fund.",
  },
  {
    name: "James Kariuki",
    role: "Head of Partnerships",
    country: "🇰🇪",
    bio: "Former World Bank consultant. Connected 30+ universities to NGO networks.",
  },
  {
    name: "Nana Amponsah",
    role: "Head of Technology",
    country: "🇬🇭",
    bio: "Ex-Google engineer. Built the NIDC platform from the ground up.",
  },
  {
    name: "Dr. Fatou Diallo",
    role: "Head of Student Welfare",
    country: "🇸🇳",
    bio: "Child psychologist specialising in first-generation university students.",
  },
  {
    name: "Marcus Adeyemi",
    role: "Head of Fundraising",
    country: "🇳🇬",
    bio: "Raised $4M+ for education causes across Sub-Saharan Africa.",
  },
];

const MILESTONES = [
  {
    year: "2021",
    event: "NIDC Foundation incorporated. First 5 students selected.",
  },
  {
    year: "2022",
    event:
      "Partnered with University of Ghana and University of Lagos. 32 students funded.",
  },
  {
    year: "2023",
    event:
      "Launched transparency dashboard. Raised $500K in donations. 78 students active.",
  },
  {
    year: "2024",
    event:
      "Expanded to 6 universities. First graduating class of 14 students. 124 students total.",
  },
  {
    year: "2025",
    event:
      "Launched Talent Pipeline program. First NIDC alumni employed in 8 countries.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.querySelectorAll(".hero-item") || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    const sections = pageRef.current?.querySelectorAll(".scroll-reveal") || [];
    sections.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        }
      );
    });

    gsap.fromTo(
      pageRef.current?.querySelectorAll(".card-reveal") || [],
      { opacity: 0, y: 24, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cards-trigger", start: "top 78%" },
      }
    );
  }, []);

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px]
                          bg-[radial-gradient(ellipse,_#10b98112_0%,_transparent_65%)]"
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        <div ref={heroRef} className="relative max-w-4xl mx-auto text-center">
          <p className="hero-item text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            About NIDC Foundation
          </p>
          <h1
            className="hero-item font-display text-5xl sm:text-6xl lg:text-7xl font-light
                         leading-tight tracking-tight text-foreground mb-6"
          >
            We exist because
            <br />
            <span className="text-primary">talent is universal</span>
            <br />
            but opportunity is not.
          </h1>
          <p className="hero-item text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            NIDC Foundation is a nonprofit scholarship platform that funds,
            tracks, and supports exceptional students from underserved
            communities — all the way from application to employment.
          </p>
        </div>
      </section>

      {/* ── MISSION / VISION ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          {[
            {
              tag: "Our Mission",
              headline: "Fund the unfunded.",
              body: "We identify students with exceptional academic potential who cannot access university due to financial barriers. We connect them with partner universities, fund their education completely, and support them through to graduation and first employment.",
              color: "emerald",
            },
            {
              tag: "Our Vision",
              headline: "A continent of educated leaders.",
              body: "We envision an Africa where every brilliant young person — regardless of their postcode, family income, or circumstance of birth — has an equal shot at a world-class education and a fulfilling career.",
              color: "amber",
            },
          ].map((item) => (
            <div
              key={item.tag}
              className="scroll-reveal bg-card border border-border/70
                                           rounded-2xl p-10"
            >
              <p
                className={`text-xs font-semibold tracking-widest uppercase mb-4
                             ${
                               item.color === "emerald"
                                 ? "text-primary"
                                 : "text-amber-400"
                             }`}
              >
                {item.tag}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-5 leading-tight">
                {item.headline}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY / TIMELINE ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground leading-tight">
              How we got here
            </h2>
          </div>
          <div className="relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b
                            from-emerald-500/40 via-emerald-500/20 to-transparent"
            />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className="scroll-reveal flex gap-8 pl-16 relative"
                >
                  <div
                    className="absolute left-0 w-12 h-12 rounded-full bg-card border-2
                                  border-primary/40 flex items-center justify-center shrink-0"
                  >
                    <span className="text-primary text-xs font-bold">
                      {m.year.slice(2)}
                    </span>
                  </div>
                  <div className="bg-card border border-border/70 rounded-xl p-5 flex-1">
                    <p className="text-primary text-xs font-semibold mb-1">
                      {m.year}
                    </p>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground leading-tight">
              Our core values
            </h2>
          </div>
          <div className="cards-trigger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="card-reveal bg-card border border-border/70
                                            rounded-2xl p-7 hover:border-primary/20
                                            transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-foreground font-semibold text-base mb-2">
                  {v.title}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              The People
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground leading-tight">
              Meet our team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="scroll-reveal bg-card border border-border/70
                                                rounded-2xl p-6 hover:border-border
                                                transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full bg-primary/15 border border-primary/20
                                  flex items-center justify-center text-primary font-bold text-sm"
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-foreground font-semibold text-sm">
                        {member.name}
                      </p>
                      <span>{member.country}</span>
                    </div>
                    <p className="text-primary text-xs">{member.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="scroll-reveal max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl font-light text-foreground mb-5">
            Ready to be part of the story?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-primary hover:bg-accent
                                           text-foreground font-medium rounded-2xl transition-all"
            >
              Apply for a Scholarship
            </Link>
            <Link
              href="/donate"
              className="px-8 py-4 border border-border hover:border-ring/50
                                            text-foreground/80 hover:text-foreground rounded-2xl transition-all"
            >
              Support a Student
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
