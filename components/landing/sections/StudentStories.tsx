"use client";
// components/landing/StudentStoriesSection.tsx
// ============================================================
// NIDC FOUNDATION — Student Stories
// Testimonial cards with country flags, university, stage badge.
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// In production these would come from Supabase — static for landing
const STORIES = [
  {
    name: "Amara Diallo",
    country: "Guinea",
    flag: "🇬🇳",
    university: "University of Ghana",
    stage: "Year 2",
    stageColor: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    quote:
      "I was selling water on the streets when I found NIDC Foundation. Today I'm studying Computer Science at UG. I never thought this was possible for someone like me.",
    field: "Computer Science",
    avatar: "AD",
    avatarBg: "bg-primary/20 text-primary",
  },
  {
    name: "Fatima Al-Hassan",
    country: "Nigeria",
    flag: "🇳🇬",
    university: "University of Lagos",
    stage: "Graduated",
    stageColor: "text-primary bg-primary/10 border-primary/20",
    quote:
      "I graduated top of my class in Medicine. NIDC didn't just fund my degree — they mentored me, connected me to hospitals, and now I'm a practicing doctor in Lagos.",
    field: "Medicine",
    avatar: "FA",
    avatarBg: "bg-amber-500/20 text-amber-400",
  },
  {
    name: "David Mwangi",
    country: "Kenya",
    flag: "🇰🇪",
    university: "University of Nairobi",
    stage: "Employed",
    stageColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    quote:
      "From a small village in Kisumu to a Software Engineer at a top fintech — NIDC Foundation made the impossible happen. I now mentor the next class of NIDC students.",
    field: "Software Engineering",
    avatar: "DM",
    avatarBg: "bg-sky-500/20 text-sky-400",
  },
];

export default function StudentStoriesSection() {
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
      sectionRef.current?.querySelectorAll(".story-card") || [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
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
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[400px] bg-primary/3 blur-3xl rounded-full"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="section-header flex flex-col lg:flex-row lg:items-end
                        justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Student Stories
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl font-light text-foreground
                           leading-tight tracking-tight"
            >
              Real people.
              <br />
              <span className="text-primary">Extraordinary journeys.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-sm leading-relaxed lg:text-right">
            Every number in our stats is a person who defied the odds. Here are
            just three of them.
          </p>
        </div>

        {/* Story cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {STORIES.map((story, i) => (
            <div
              key={story.name}
              className={`story-card group relative bg-card border border-border/70
                          rounded-2xl p-7 flex flex-col gap-5 overflow-hidden
                          hover:border-border transition-all duration-500
                          ${i === 1 ? "lg:mt-6" : ""}`}
            >
              {/* Quote mark */}
              <div
                className="absolute top-5 right-6 font-display text-7xl text-foreground/5
                              leading-none select-none group-hover:text-foreground/8
                              transition-colors duration-500"
              >
                "
              </div>

              {/* Stage badge */}
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium
                                  px-2.5 py-1 rounded-full border ${story.stageColor}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {story.stage}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/80 text-sm leading-relaxed flex-1">
                "{story.quote}"
              </blockquote>

              {/* Divider */}
              <div className="h-px bg-muted/50" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                                 text-xs font-bold shrink-0 ${story.avatarBg}`}
                >
                  {story.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-medium text-sm">
                      {story.name}
                    </p>
                    <span className="text-base">{story.flag}</span>
                  </div>
                  <p className="text-muted-foreground/80 text-xs truncate">
                    {story.field} · {story.university}
                  </p>
                </div>
              </div>

              {/* Hover bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5
                              bg-gradient-to-r from-transparent via-primary/0
                              group-hover:via-primary/40 to-transparent
                              transition-all duration-700"
              />
            </div>
          ))}
        </div>

        {/* See all CTA */}
        <div className="text-center mt-12">
          <button
            className="text-muted-foreground/80 hover:text-primary text-sm transition-colors
                       border border-border/80 hover:border-primary/30 px-6 py-3 rounded-xl"
          >
            Read more student stories →
          </button>
        </div>
      </div>
    </section>
  );
}
