"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BOARD = [
  {
    name: "Prof. Ama Owusu",
    title: "Board Chair",
    country: "🇬🇭",
    bg: "bg-primary/20 text-primary",
    bio: "Professor of Development Economics, University of Ghana. 30 years in education policy.",
  },
  {
    name: "Chidi Okonkwo",
    title: "Vice Chair",
    country: "🇳🇬",
    bg: "bg-amber-500/20 text-amber-400",
    bio: "Managing Partner, West Africa Capital. Former World Bank Senior Economist.",
  },
  {
    name: "Dr. Grace Muthoni",
    title: "Treasurer",
    country: "🇰🇪",
    bg: "bg-sky-500/20 text-sky-400",
    bio: "Chartered Accountant. Former CFO of Kenya Education Trust.",
  },
  {
    name: "Yaw Darko",
    title: "Secretary",
    country: "🇬🇭",
    bg: "bg-violet-500/20 text-violet-400",
    bio: "Lawyer specialising in nonprofit governance and African development law.",
  },
  {
    name: "Dr. Amina Ibrahim",
    title: "Independent Director",
    country: "🇸🇳",
    bg: "bg-rose-500/20 text-rose-400",
    bio: "UNESCO Regional Director for Sub-Saharan Africa, Education Division.",
  },
  {
    name: "Kweku Mensah",
    title: "Independent Director",
    country: "🇬🇭",
    bg: "bg-teal-500/20 text-teal-400",
    bio: "Founder, AfricaTech Fund. Champion of youth entrepreneurship and education.",
  },
];

const POLICIES = [
  {
    icon: "📋",
    title: "Scholarship Selection Policy",
    desc: "How students are identified, scored, and selected — criteria, weighting, and the review process.",
  },
  {
    icon: "💰",
    title: "Fund Allocation Policy",
    desc: "How donations are held, disbursed, and audited. Breakdown of what percentage goes to students vs. operations.",
  },
  {
    icon: "🔒",
    title: "Data Protection Policy",
    desc: "How student and donor data is collected, stored, and protected under GDPR and local data laws.",
  },
  {
    icon: "⚖️",
    title: "Conflicts of Interest Policy",
    desc: "Rules governing board members, staff, and advisors who may have personal interests in foundation decisions.",
  },
  {
    icon: "🧾",
    title: "Complaints & Whistleblowing",
    desc: "How students, donors, or staff can raise concerns — confidentially and without fear of retaliation.",
  },
  {
    icon: "🌍",
    title: "Environmental & Social Policy",
    desc: "Our commitment to sustainable operations and equitable treatment across all programmes.",
  },
];

const FINANCIALS = [
  {
    year: "2022",
    raised: "$320,000",
    disbursed: "$280,000",
    admin: "12.5%",
    students: 32,
  },
  {
    year: "2023",
    raised: "$680,000",
    disbursed: "$600,000",
    admin: "11.8%",
    students: 78,
  },
  {
    year: "2024",
    raised: "$1,210,000",
    disbursed: "$1,080,000",
    admin: "10.7%",
    students: 124,
  },
];

export default function GovernanceClient() {
  const pageRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Governance & Accountability
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            Trust is built through
            <br />
            <span className="text-primary">radical accountability.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Every policy, every board decision, and every financial record is
            publicly available. We believe donors and students deserve nothing
            less.
          </p>
        </div>
      </section>

      {/* BOARD */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Leadership
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground leading-tight">
              Board of Directors
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Our board provides independent oversight of all foundation
              activities. Members serve 3-year terms and are elected by the
              foundation&apos;s membership.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BOARD.map((m) => (
              <div
                key={m.name}
                className="scroll-reveal bg-card border border-border/70
                                           rounded-2xl p-6 hover:border-border transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center
                                   font-bold text-sm shrink-0 ${m.bg}`}
                  >
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-foreground font-semibold text-sm">
                        {m.name}
                      </p>
                      <span>{m.country}</span>
                    </div>
                    <p className="text-primary text-xs">{m.title}</p>
                  </div>
                </div>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCIAL TRANSPARENCY */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Finances
            </p>
            <h2 className="font-display text-4xl font-light text-foreground leading-tight">
              Annual financial summary
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
              Full audited accounts are published each year. Below is a
              high-level summary.
            </p>
          </div>
          <div className="scroll-reveal overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/80">
                  {[
                    "Year",
                    "Total Raised",
                    "Disbursed to Students",
                    "Admin %",
                    "Students Funded",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-muted-foreground/80 text-xs uppercase tracking-wider pb-4 pr-6"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {FINANCIALS.map((row) => (
                  <tr
                    key={row.year}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 pr-6 text-foreground font-semibold">
                      {row.year}
                    </td>
                    <td className="py-4 pr-6 text-primary font-semibold">
                      {row.raised}
                    </td>
                    <td className="py-4 pr-6 text-foreground/80">{row.disbursed}</td>
                    <td className="py-4 pr-6">
                      <span
                        className="bg-amber-400/10 text-amber-400 border border-amber-400/20
                                       px-2 py-0.5 rounded-full text-xs"
                      >
                        {row.admin}
                      </span>
                    </td>
                    <td className="py-4 text-foreground/80">{row.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="scroll-reveal mt-6 flex gap-4">
            {[
              "2024 Annual Report (PDF)",
              "2023 Audited Accounts (PDF)",
              "2022 Audited Accounts (PDF)",
            ].map((doc) => (
              <a
                key={doc}
                href="#"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary
                                               border border-border/80 hover:border-primary/30 px-4 py-2.5
                                               rounded-xl transition-all"
              >
                📄 {doc}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Policies
            </p>
            <h2 className="font-display text-4xl font-light text-foreground leading-tight">
              How we operate
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POLICIES.map((p) => (
              <div
                key={p.title}
                className="scroll-reveal bg-card border border-border/70 rounded-2xl p-7
                                            hover:border-primary/15 transition-all group cursor-pointer"
              >
                <div className="text-2xl mb-4">{p.icon}</div>
                <h3 className="text-foreground font-semibold text-sm mb-2">
                  {p.title}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed mb-4">
                  {p.desc}
                </p>
                <span className="text-primary text-xs group-hover:underline">
                  Download PDF →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE BADGES */}
      <section className="py-16 px-6 border-t border-border/70">
        <div className="max-w-4xl mx-auto scroll-reveal">
          <div className="bg-card border border-border/70 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground/80 text-sm mb-6 uppercase tracking-widest text-xs">
              Registered & Compliant With
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                "Ghana NGO Authority",
                "Nigeria CAC (Nonprofit)",
                "Kenya NGO Coordination Board",
                "INGO Network",
                "Charity Commission UK",
              ].map((body) => (
                <div
                  key={body}
                  className="flex items-center gap-2 bg-muted/40 border border-border/80
                                           rounded-xl px-4 py-2.5"
                >
                  <span className="text-primary text-xs">✓</span>
                  <span className="text-muted-foreground text-xs">{body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
