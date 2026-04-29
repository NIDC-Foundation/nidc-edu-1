"use client";
// app/(public)/news/page.tsx
// ============================================================
// NIDC FOUNDATION — News & Updates Page
// ============================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  "All",
  "Foundation News",
  "Student Stories",
  "Partner Updates",
  "Reports",
  "Press",
];

const ARTICLES = [
  {
    category: "Foundation News",
    tag: "Announcement",
    date: "12 Apr 2025",
    title:
      "NIDC Foundation opens applications for 2025 intake — 50 scholarships available",
    excerpt:
      "We are thrilled to announce our largest intake yet. Applications are now open for 50 fully-funded scholarships across 8 partner universities in 4 countries.",
    readTime: "3 min read",
    featured: true,
  },
  {
    category: "Student Stories",
    tag: "Story",
    date: "28 Mar 2025",
    title:
      "From street vendor to Software Engineer: David Mwangi's NIDC journey",
    excerpt:
      "David sold vegetables on the streets of Kisumu to support his family. Four years later, he's a Software Engineer at one of Nairobi's fastest-growing fintechs.",
    readTime: "6 min read",
    featured: true,
  },
  {
    category: "Partner Updates",
    tag: "Partnership",
    date: "15 Mar 2025",
    title:
      "NIDC Foundation welcomes Addis Ababa University as our newest partner",
    excerpt:
      "We're proud to announce our first Ethiopian university partner, adding 8 new scholarship slots for students from Ethiopia and the Horn of Africa.",
    readTime: "2 min read",
    featured: false,
  },
  {
    category: "Reports",
    tag: "Report",
    date: "1 Mar 2025",
    title:
      "2024 Annual Impact Report: 124 students, $1.2M disbursed, 94% graduation rate",
    excerpt:
      "Read our full 2024 Annual Impact Report — covering everything from financial performance to individual student outcomes.",
    readTime: "12 min read",
    featured: false,
  },
  {
    category: "Press",
    tag: "Media",
    date: "18 Feb 2025",
    title:
      "NIDC Foundation featured in The Guardian: 'The NGO redefining African education funding'",
    excerpt:
      "The Guardian's international development section published a feature on our transparency-first model and how it's changing donor trust in Africa.",
    readTime: "4 min read",
    featured: false,
  },
  {
    category: "Foundation News",
    tag: "Update",
    date: "5 Feb 2025",
    title:
      "Launching the NIDC Talent Pipeline: connecting graduates to top employers",
    excerpt:
      "After two years of watching our graduates struggle to find their first role, we built something about it. Introducing the NIDC Talent Pipeline.",
    readTime: "4 min read",
    featured: false,
  },
  {
    category: "Student Stories",
    tag: "Story",
    date: "20 Jan 2025",
    title:
      "Dr. Fatima Al-Hassan graduates with first class — now practising medicine in Lagos",
    excerpt:
      "Fatima was the first person in her family to attend university. Now she's a doctor. Read her story.",
    readTime: "5 min read",
    featured: false,
  },
  {
    category: "Partner Updates",
    tag: "Partnership",
    date: "8 Jan 2025",
    title:
      "University of Cape Town joins NIDC network — bringing 5 new scholarship slots",
    excerpt:
      "South Africa's top-ranked university has committed 5 annual scholarship placements to NIDC Foundation students.",
    readTime: "2 min read",
    featured: false,
  },
];

const TAG_COLORS: Record<string, string> = {
  Announcement: "text-primary bg-primary/10 border-primary/20",
  Story: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Partnership: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Report: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Media: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  Update: "text-teal-400 bg-teal-400/10 border-teal-400/20",
};

export default function NewsClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeTab === "All" || a.category === activeTab;
    const matchSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((a) => a.featured);
  const regular = filtered.filter((a) => !a.featured);

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
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".article-card",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }
    );
  }, [activeTab, searchQuery]);

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]
                        bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            News & Stories
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            Stories of change.
            <br />
            <span className="text-primary">Updates that matter.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Student spotlights, partnership announcements, impact reports, and
            updates from the NIDC Foundation team.
          </p>
          {/* Search */}
          <div className="hero-el relative max-w-sm mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border text-foreground text-sm pl-10 pr-4
                         py-3 rounded-xl placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="px-6 pb-6 border-b border-border/70">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveTab(c)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                activeTab === c
                  ? "bg-primary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground border border-border/80 hover:border-ring/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      {featured.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-5">
              {featured.map((a) => (
                <div
                  key={a.title}
                  className="article-card group bg-card border border-border/70
                                              rounded-2xl p-7 hover:border-border transition-all
                                              cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        TAG_COLORS[a.tag]
                      }`}
                    >
                      {a.tag}
                    </span>
                    <span className="text-muted-foreground/70 text-xs">{a.date}</span>
                  </div>
                  <h2
                    className="text-foreground font-semibold text-lg leading-snug mb-3
                                 group-hover:text-primary transition-colors"
                  >
                    {a.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {a.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground/70 text-xs">{a.readTime}</span>
                    <span className="text-primary text-sm group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REGULAR ARTICLES */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {regular.length === 0 && filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-muted-foreground/80">No articles match your search.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {regular.map((a) => (
                <div
                  key={a.title}
                  className="article-card group bg-card border border-border/70
                                              rounded-2xl p-6 hover:border-border transition-all
                                              cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          TAG_COLORS[a.tag]
                        }`}
                      >
                        {a.tag}
                      </span>
                      <span className="text-muted-foreground/70 text-xs">{a.date}</span>
                      <span className="text-muted-foreground/60 text-xs">
                        {a.readTime}
                      </span>
                    </div>
                    <h3
                      className="text-foreground font-semibold text-base mb-1 leading-snug
                                   group-hover:text-primary transition-colors"
                    >
                      {a.title}
                    </h3>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed line-clamp-2">
                      {a.excerpt}
                    </p>
                  </div>
                  <span className="text-primary text-sm shrink-0 group-hover:underline">
                    Read →
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
