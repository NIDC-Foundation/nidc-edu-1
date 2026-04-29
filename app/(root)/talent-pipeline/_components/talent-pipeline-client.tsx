"use client";
// app/(public)/talent-pipeline/page.tsx
// ============================================================
// NIDC FOUNDATION — Talent Pipeline
// Connects NIDC graduates to employers. Two audiences: employers + alumni.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HOW_IT_WORKS = [
  {
    icon: "🎓",
    title: "Graduate from NIDC programme",
    body: "Students complete their degree at a partner university, fully funded by NIDC Foundation.",
  },
  {
    icon: "📋",
    title: "Build your graduate profile",
    body: "Alumni create a public profile showcasing their skills, field, university, and availability.",
  },
  {
    icon: "🔍",
    title: "Employers discover talent",
    body: "Vetted employers search the NIDC talent directory and reach out directly to candidates.",
  },
  {
    icon: "🤝",
    title: "Match & interview",
    body: "NIDC coordinates introductions and preparation support so alumni are set up to succeed.",
  },
  {
    icon: "💼",
    title: "Land the role",
    body: "Graduates enter the workforce — and are tracked in our impact data for 3 years post-graduation.",
  },
  {
    icon: "🔄",
    title: "Give back as a mentor",
    body: "Employed alumni are invited to mentor current NIDC students — paying it forward.",
  },
];

const ALUMNI_PROFILES = [
  {
    name: "David Mwangi",
    field: "Software Engineering",
    country: "Kenya 🇰🇪",
    university: "University of Nairobi",
    graduated: "2024",
    skills: ["React", "Node.js", "Python", "AWS"],
    status: "Employed",
    employer: "Cellulant",
    color: "bg-primary/20 text-primary",
  },
  {
    name: "Dr. Fatima Al-Hassan",
    field: "Medicine",
    country: "Nigeria 🇳🇬",
    university: "University of Lagos",
    graduated: "2024",
    skills: ["General Practice", "Pediatrics", "Public Health"],
    status: "Employed",
    employer: "Lagos University Teaching Hospital",
    color: "bg-amber-500/20 text-amber-400",
  },
  {
    name: "Grace Amponsah",
    field: "Business & Finance",
    country: "Ghana 🇬🇭",
    university: "University of Ghana",
    graduated: "2024",
    skills: ["Financial Analysis", "Excel", "PowerBI", "Strategy"],
    status: "Available",
    color: "bg-sky-500/20 text-sky-400",
  },
  {
    name: "Ibrahim Sesay",
    field: "Electrical Engineering",
    country: "Sierra Leone 🇸🇱",
    university: "University of Ghana",
    graduated: "2023",
    skills: ["AutoCAD", "Circuit Design", "Power Systems", "Matlab"],
    status: "Employed",
    employer: "Amandi Energy",
    color: "bg-violet-500/20 text-violet-400",
  },
];

const EMPLOYER_BENEFITS = [
  {
    icon: "✅",
    title: "Pre-Vetted Talent",
    body: "Every NIDC graduate passed our rigorous selection process. We only fund exceptional students.",
  },
  {
    icon: "🌍",
    title: "Pan-African Coverage",
    body: "Access talent from Ghana, Nigeria, Kenya, Uganda, Ethiopia, and more.",
  },
  {
    icon: "💼",
    title: "Diverse Fields",
    body: "Tech, medicine, law, business, agriculture, education — across all sectors.",
  },
  {
    icon: "📊",
    title: "Performance Data",
    body: "Access academic records and NIDC progress reports for every candidate.",
  },
  {
    icon: "🤝",
    title: "CSR Alignment",
    body: "Hiring NIDC alumni supports your ESG goals and African development commitments.",
  },
  {
    icon: "🆓",
    title: "No Recruitment Fee",
    body: "Access the talent directory and make introductions at no cost.",
  },
];

const FIELDS_AVAILABLE = [
  { field: "Technology", count: 28, icon: "💻" },
  { field: "Healthcare", count: 19, icon: "🏥" },
  { field: "Finance", count: 16, icon: "📊" },
  { field: "Law", count: 11, icon: "⚖️" },
  { field: "Education", count: 9, icon: "📚" },
  { field: "Agriculture", count: 6, icon: "🌱" },
];

export default function TalentPipelineClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"graduates" | "employers">("graduates");

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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                        bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Talent Pipeline
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            Africa's most exceptional
            <br />
            <span className="text-primary">graduates. Ready to work.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            The NIDC Talent Pipeline connects our fully-funded graduates with
            employers who value character, resilience, and raw talent — not just
            pedigree.
          </p>
          {/* Audience toggle */}
          <div
            className="hero-el flex gap-2 bg-card border border-border/80 p-1.5 rounded-2xl
                          w-fit mx-auto mb-10"
          >
            {(["graduates", "employers"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                  view === v
                    ? "bg-primary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v === "graduates" ? "I'm a Graduate" : "I'm an Employer"}
              </button>
            ))}
          </div>

          {view === "graduates" ? (
            <div className="hero-el flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-4 bg-primary hover:bg-accent text-foreground
                                             font-medium rounded-2xl transition-all"
              >
                Create Your Profile →
              </Link>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 border border-border hover:border-ring/50 text-foreground/80 hover:text-foreground rounded-2xl transition-all"
              >
                How It Works
              </a>
            </div>
          ) : (
            <div className="hero-el flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:talent@nidcfoundation.org"
                className="px-8 py-4 bg-primary hover:bg-accent text-foreground font-medium rounded-2xl transition-all"
              >
                Access Talent Directory →
              </a>
              <a
                href="#employer-benefits"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#employer-benefits")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 border border-border hover:border-ring/50 text-foreground/80 hover:text-foreground rounded-2xl transition-all"
              >
                Why Hire NIDC Graduates
              </a>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              The Process
            </p>
            <h2 className="font-display text-4xl font-light text-foreground">
              From graduation to employment
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((s, i) => (
              <div
                key={s.title}
                className="scroll-reveal bg-card border border-border/70
                                            rounded-2xl p-7 hover:border-primary/15 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="font-display text-4xl text-foreground/8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-foreground font-semibold text-sm mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI PROFILES PREVIEW */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
                The Talent
              </p>
              <h2 className="font-display text-4xl font-light text-foreground">
                Meet some of our alumni
              </h2>
            </div>
            <p className="text-muted-foreground/80 text-sm text-right max-w-xs">
              89 graduates in the pipeline across 6 fields of study.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ALUMNI_PROFILES.map((p) => (
              <div
                key={p.name}
                className="scroll-reveal bg-card border border-border/70
                                           rounded-2xl p-6 hover:border-border transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center
                                     font-bold text-sm shrink-0 ${p.color}`}
                    >
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">{p.name}</p>
                      <p className="text-muted-foreground/80 text-xs">
                        {p.field} · {p.country}
                      </p>
                      <p className="text-muted-foreground/70 text-xs">
                        {p.university} · Class of {p.graduated}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${
                      p.status === "Available"
                        ? "text-primary bg-primary/10 border-primary/20"
                        : "text-muted-foreground/80 bg-muted/50 border-border"
                    }`}
                  >
                    {p.status === "Employed" ? `At ${p.employer}` : "Available"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-muted-foreground bg-muted/40 border border-border/70
                                             px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal text-center mt-8">
            <a
              href="mailto:talent@nidcfoundation.org"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30
                         hover:border-primary/60 text-primary text-sm rounded-xl transition-all"
            >
              Access full talent directory →
            </a>
          </div>
        </div>
      </section>

      {/* EMPLOYER BENEFITS */}
      <section
        id="employer-benefits"
        className="py-20 px-6 border-t border-border/70"
      >
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              For Employers
            </p>
            <h2 className="font-display text-4xl font-light text-foreground">
              Why hire NIDC graduates?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EMPLOYER_BENEFITS.map((b) => (
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
          <div className="scroll-reveal mt-10 text-center">
            <a
              href="mailto:talent@nidcfoundation.org"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-accent
                         text-foreground font-medium rounded-2xl transition-all"
            >
              Partner with NIDC Talent Pipeline →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
