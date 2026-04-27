"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FIELDS = [
  {
    id: "stem",
    icon: "💻",
    name: "STEM & Technology",
    color: "emerald",
    desc: "Engineering, Computer Science, Mathematics, Data Science, Biotechnology",
    demand: "Highest",
    programmes: [
      {
        title: "BSc Computer Science",
        duration: "4 years",
        universities: ["University of Ghana", "University of Nairobi"],
      },
      {
        title: "BSc Software Engineering",
        duration: "4 years",
        universities: ["University of Lagos", "University of Nairobi"],
      },
      {
        title: "BSc Electrical Engineering",
        duration: "4 years",
        universities: ["University of Ghana", "Makerere University"],
      },
      {
        title: "BSc Data Science",
        duration: "3 years",
        universities: ["University of Cape Town"],
      },
      {
        title: "BSc Biotechnology",
        duration: "4 years",
        universities: ["Addis Ababa University"],
      },
    ],
  },
  {
    id: "medicine",
    icon: "🏥",
    name: "Medicine & Health",
    color: "rose",
    desc: "Medicine, Pharmacy, Nursing, Public Health, Dentistry",
    demand: "Very High",
    programmes: [
      {
        title: "MBChB Medicine & Surgery",
        duration: "6 years",
        universities: ["University of Lagos", "Addis Ababa University"],
      },
      {
        title: "BPharm Pharmacy",
        duration: "5 years",
        universities: ["University of Ghana"],
      },
      {
        title: "BSc Nursing",
        duration: "4 years",
        universities: ["Makerere University"],
      },
      {
        title: "MPH Public Health",
        duration: "2 years",
        universities: ["University of Nairobi"],
      },
    ],
  },
  {
    id: "business",
    icon: "📊",
    name: "Business & Economics",
    color: "amber",
    desc: "Business Administration, Economics, Finance, Accounting, Entrepreneurship",
    demand: "High",
    programmes: [
      {
        title: "BSc Business Administration",
        duration: "4 years",
        universities: ["University of Ghana", "University of Lagos"],
      },
      {
        title: "BSc Economics",
        duration: "3 years",
        universities: ["University of Cape Town"],
      },
      {
        title: "BCom Accounting",
        duration: "3 years",
        universities: ["University of Cape Town"],
      },
    ],
  },
  {
    id: "law",
    icon: "⚖️",
    name: "Law & Governance",
    color: "violet",
    desc: "LLB Law, International Relations, Political Science, Human Rights",
    demand: "High",
    programmes: [
      {
        title: "LLB Law",
        duration: "4 years",
        universities: ["University of Ghana", "University of Lagos"],
      },
      {
        title: "BA International Relations",
        duration: "3 years",
        universities: ["University of Nairobi"],
      },
      {
        title: "BA Political Science",
        duration: "3 years",
        universities: ["Makerere University"],
      },
    ],
  },
  {
    id: "education",
    icon: "📚",
    name: "Education",
    color: "sky",
    desc: "Bachelor of Education, Educational Psychology, Early Childhood Development",
    demand: "Medium",
    programmes: [
      {
        title: "BEd Primary Education",
        duration: "4 years",
        universities: ["Makerere University", "University of Ghana"],
      },
      {
        title: "BEd Science Education",
        duration: "4 years",
        universities: ["University of Nairobi"],
      },
    ],
  },
  {
    id: "agriculture",
    icon: "🌱",
    name: "Agriculture & Environment",
    color: "teal",
    desc: "Agriculture, Environmental Science, Food Technology, Forestry",
    demand: "Growing",
    programmes: [
      {
        title: "BSc Agriculture",
        duration: "4 years",
        universities: ["Makerere University", "Addis Ababa University"],
      },
      {
        title: "BSc Environmental Science",
        duration: "3 years",
        universities: ["University of Nairobi"],
      },
    ],
  },
];

const DEMAND_COLOR: Record<string, string> = {
  Highest: "text-primary bg-primary/10 border-primary/20",
  "Very High": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  High: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Medium: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Growing: "text-teal-400 bg-teal-400/10 border-teal-400/20",
};

const FIELD_COLORS: Record<string, string> = {
  emerald: "border-primary/20 bg-primary/5",
  rose: "border-rose-500/20 bg-rose-500/5",
  amber: "border-amber-500/20 bg-amber-500/5",
  violet: "border-violet-500/20 bg-violet-500/5",
  sky: "border-sky-500/20 bg-sky-500/5",
  teal: "border-teal-500/20 bg-teal-500/5",
};

export default function CoursesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
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
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        bg-[radial-gradient(ellipse,#10b98110_0%,transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Programmes
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            Choose your field.
            <br />
            <span className="text-primary">We fund the journey.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            NIDC Foundation scholarships cover degree programmes across 6 fields
            of study at our partner universities. Browse what&apos;s available below.
          </p>
        </div>
      </section>

      {/* FIELDS GRID */}
      <section className="py-10 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FIELDS.map((f) => (
              <div key={f.id}>
                {/* Field card */}
                <div
                  onClick={() => setActive(active === f.id ? null : f.id)}
                  className={`scroll-reveal cursor-pointer bg-card border rounded-2xl p-7
                               transition-all duration-300 hover:border-border
                               ${
                                 active === f.id
                                   ? FIELD_COLORS[f.color]
                                   : "border-border/70"
                               }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{f.icon}</span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        DEMAND_COLOR[f.demand]
                      }`}
                    >
                      {f.demand} Demand
                    </span>
                  </div>
                  <h3 className="text-foreground font-semibold text-base mb-2">
                    {f.name}
                  </h3>
                  <p className="text-muted-foreground/80 text-sm mb-4">
                    {f.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground/70 text-xs">
                      {f.programmes.length} programmes
                    </p>
                    <span className="text-primary text-xs">
                      {active === f.id ? "Hide ↑" : "View programmes ↓"}
                    </span>
                  </div>
                </div>

                {/* Expanded programmes */}
                {active === f.id && (
                  <div className="mt-3 space-y-2">
                    {f.programmes.map((p) => (
                      <div
                        key={p.title}
                        className="bg-card border border-border/70 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-foreground font-medium text-sm">
                              {p.title}
                            </p>
                            <p className="text-muted-foreground/80 text-xs mt-1">
                              {p.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.universities.map((u) => (
                            <span
                              key={u}
                              className="text-xs text-muted-foreground bg-muted/40 border border-border/70
                                                     px-2.5 py-1 rounded-full"
                            >
                              {u}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="scroll-reveal mt-10 bg-card border border-border/70 rounded-2xl p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Don&apos;t see your desired programme?{" "}
              <a
                href="mailto:apply@nidcfoundation.org"
                className="text-primary hover:underline"
              >
                Contact our team
              </a>{" "}
              — we&apos;re adding new programmes and partners every quarter.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
