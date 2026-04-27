"use client";
// app/(public)/apply/page.tsx
// ============================================================
// NIDC FOUNDATION — Apply Page
// Eligibility, what you get, process, FAQ, CTA to form
// ============================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ELIGIBILITY = [
  {
    icon: "🎓",
    title: "Academic Excellence",
    body: "Strong academic record or demonstrated exceptional ability in your field, even without formal grades.",
  },
  {
    icon: "💰",
    title: "Financial Need",
    body: "Household income that makes university attendance genuinely impossible without assistance.",
  },
  {
    icon: "📍",
    title: "African Citizen",
    body: "Currently residing in an African country. Diaspora applications reviewed case-by-case.",
  },
  {
    icon: "🎂",
    title: "Age 16–30",
    body: "Open to secondary school completers and those who missed their window due to financial hardship.",
  },
  {
    icon: "💬",
    title: "English Proficiency",
    body: "Courses at partner universities are taught in English. Basic proficiency required.",
  },
  {
    icon: "🌟",
    title: "Drive & Character",
    body: "Beyond grades — we look for resilience, leadership potential, and a desire to give back.",
  },
];

const WHAT_YOU_GET = [
  {
    label: "Full Tuition",
    value: "100%",
    desc: "Tuition covered entirely for your chosen programme at a partner university.",
  },
  {
    label: "Monthly Stipend",
    value: "$150–$300",
    desc: "Living allowance so you can focus on studies, not survival.",
  },
  {
    label: "Housing Support",
    value: "Up to $200",
    desc: "Monthly housing contribution or on-campus accommodation coordination.",
  },
  {
    label: "Textbooks & Kit",
    value: "Included",
    desc: "Course materials, laptop access, and learning tools provided.",
  },
  {
    label: "Health Insurance",
    value: "Covered",
    desc: "Basic health insurance for the duration of your programme.",
  },
  {
    label: "Mentorship",
    value: "1-on-1",
    desc: "Paired with a professional mentor in your field of study.",
  },
];

const FAQS = [
  {
    q: "How long does the application process take?",
    a: "From submission to decision is typically 10–15 business days. We review every application individually — no automated rejections.",
  },
  {
    q: "Can I choose any university?",
    a: "You can apply to any of our partner universities. We're adding new partners every quarter. Check the Partners page for the current list.",
  },
  {
    q: "What documents do I need?",
    a: "ID/passport, most recent school transcripts or results, a personal statement, and any supporting documents (proof of financial need, reference letters).",
  },
  {
    q: "Can I reapply if I'm rejected?",
    a: "Yes. You can reapply in the next intake cycle (every 6 months). We'll provide feedback on your application so you can strengthen it.",
  },
  {
    q: "Is the scholarship renewable each year?",
    a: "Yes — funding renews each academic year provided you maintain satisfactory academic progress and remain in good standing.",
  },
  {
    q: "Do I have to repay the scholarship?",
    a: "No. This is a grant, not a loan. The only thing we ask is that you consider mentoring the next generation of NIDC students once you're established.",
  },
];

export default function ApplyPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const items = pageRef.current?.querySelectorAll(".reveal") || [];
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%" },
        }
      );
    });
    gsap.fromTo(
      pageRef.current?.querySelectorAll(".hero-el") || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                          bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_65%)]"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Scholarship Applications
          </p>
          <h1
            className="hero-el font-display text-5xl sm:text-6xl lg:text-7xl font-light
                         leading-tight tracking-tight text-foreground mb-6"
          >
            Your education.
            <br />
            <span className="text-primary">Fully funded.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Applications are open for the next intake. If you have the drive,
            NIDC Foundation will handle the rest — tuition, housing, stipend,
            mentorship, and job placement.
          </p>
          <div className="hero-el flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-primary hover:bg-accent text-foreground
                         font-medium rounded-2xl transition-all shadow-xl shadow-primary/25"
            >
              Start Your Application →
            </Link>
            <a
              href="#eligibility"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#eligibility")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border border-border hover:border-ring/50 text-foreground/80
                         hover:text-foreground rounded-2xl transition-all"
            >
              Check Eligibility
            </a>
          </div>
          {/* Intake deadline */}
          <div
            className="hero-el mt-8 inline-flex items-center gap-3 bg-amber-400/8
                          border border-amber-400/20 rounded-xl px-5 py-3"
          >
            <span className="text-amber-400">⏰</span>
            <p className="text-amber-300 text-sm">
              <span className="font-semibold">Next intake deadline:</span>{" "}
              Rolling applications — apply any time.
            </p>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section id="eligibility" className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Eligibility
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground leading-tight mb-4">
              Who can apply?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We're looking for students who are brilliant but have been locked
              out by circumstance — not those who simply haven't worked hard
              enough.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ELIGIBILITY.map((e) => (
              <div
                key={e.title}
                className="reveal bg-card border border-border/70
                                            rounded-2xl p-7 hover:border-primary/15 transition-all"
              >
                <div className="text-3xl mb-4">{e.icon}</div>
                <h3 className="text-foreground font-semibold text-base mb-2">
                  {e.title}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              The Package
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground leading-tight">
              What you receive
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_YOU_GET.map((item) => (
              <div
                key={item.label}
                className="reveal bg-card border border-border/70
                                               rounded-2xl p-6 flex gap-4 items-start"
              >
                <div className="shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="text-foreground font-semibold text-sm">
                      {item.label}
                    </p>
                    <p className="text-primary font-bold text-sm">
                      {item.value}
                    </p>
                  </div>
                  <p className="text-muted-foreground/80 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION STEPS ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              The Process
            </p>
            <h2 className="font-display text-4xl font-light text-foreground leading-tight">
              4 steps to your scholarship
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                n: 1,
                title: "Create an account",
                body: "Register on the NIDC platform with your email and basic details.",
              },
              {
                n: 2,
                title: "Complete the application",
                body: "Fill in your personal info, write your story, select a university, and upload your documents.",
              },
              {
                n: 3,
                title: "Wait for review",
                body: "Our team reviews your application within 10 business days. You'll get a status update by email.",
              },
              {
                n: 4,
                title: "Get funded & enroll",
                body: "Accepted students receive their offer letter, funding confirmation, and university enrollment support.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="reveal flex gap-5 items-start bg-card border
                                         border-border/70 rounded-2xl p-6 hover:border-primary/15 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25
                                flex items-center justify-center text-primary font-bold text-sm shrink-0"
                >
                  {s.n}
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-1">{s.title}</p>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              FAQ
            </p>
            <h2 className="font-display text-4xl font-light text-foreground leading-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="reveal bg-card border border-border/70 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <p className="text-foreground text-sm font-medium">{faq.q}</p>
                  <span
                    className={`text-primary text-lg transition-transform duration-300 shrink-0
                                   ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-border/60">
                    <p className="text-muted-foreground text-sm leading-relaxed pt-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="reveal max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl font-light text-foreground mb-4">
            Ready to apply?
          </h2>
          <p className="text-muted-foreground mb-8">
            It takes 10 minutes. Your future could be on the other side.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary hover:bg-accent
                       text-foreground font-medium rounded-2xl transition-all shadow-xl shadow-primary/25"
          >
            Start Application →
          </Link>
          <p className="text-muted-foreground/70 text-xs mt-4">
            Questions? Email us at{" "}
            <a
              href="mailto:apply@nidcfoundation.org"
              className="text-primary hover:underline"
            >
              apply@nidcfoundation.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
