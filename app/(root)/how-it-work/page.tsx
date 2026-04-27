"use client";
// app/(public)/how-it-works/page.tsx
// ============================================================
// NIDC FOUNDATION — How It Works (Full Page)
// Detailed process for all 3 user types: Students, Donors, Universities
// ============================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: "students", label: "For Students", icon: "🎓" },
  { id: "donors", label: "For Donors", icon: "💳" },
  { id: "universities", label: "For Universities", icon: "🏛️" },
];

const STUDENT_STEPS = [
  {
    n: "01",
    title: "Create your account",
    body: "Register with your email. Takes 2 minutes. No payment required — ever.",
    icon: "👤",
  },
  {
    n: "02",
    title: "Complete your application",
    body: "Tell your story. Share your financial situation. Pick your dream university. Upload your documents.",
    icon: "✍️",
  },
  {
    n: "03",
    title: "Application reviewed",
    body: "Our panel reviews every application individually — no algorithm, no auto-rejection. You'll know within 10 business days.",
    icon: "🔍",
  },
  {
    n: "04",
    title: "Receive your offer",
    body: "Accepted students get a formal offer letter with full details of the scholarship package.",
    icon: "📬",
  },
  {
    n: "05",
    title: "Enroll at university",
    body: "We coordinate directly with the university to confirm your place. You just need to show up.",
    icon: "🎒",
  },
  {
    n: "06",
    title: "Funded throughout",
    body: "Tuition paid directly to the university. Stipend deposited monthly. Housing supported. You focus on studying.",
    icon: "💰",
  },
  {
    n: "07",
    title: "Track your progress",
    body: "Log into your dashboard to update your progress. Your donors see your journey — and celebrate with you.",
    icon: "📊",
  },
  {
    n: "08",
    title: "Graduate & give back",
    body: "After graduation, you're invited into our mentorship programme to guide the next generation of NIDC students.",
    icon: "🤝",
  },
];

const DONOR_STEPS = [
  {
    n: "01",
    title: "Choose how to give",
    body: "Donate once, monthly, or sponsor a specific student. Choose your amount — every dollar matters.",
    icon: "🎯",
  },
  {
    n: "02",
    title: "Secure payment",
    body: "Payments processed via Stripe. Receipt issued immediately. Tax deductible in eligible regions.",
    icon: "🔒",
  },
  {
    n: "03",
    title: "See your impact",
    body: "Your donation appears on the live public ledger within minutes, showing exactly where it's allocated.",
    icon: "📡",
  },
  {
    n: "04",
    title: "Follow the student",
    body: "If you sponsor a specific student, you'll receive updates as they progress through their academic journey.",
    icon: "👁️",
  },
  {
    n: "05",
    title: "Annual impact report",
    body: "Every year, NIDC publishes a full financial and impact report. Your contribution is accounted for.",
    icon: "📋",
  },
];

const UNI_STEPS = [
  {
    n: "01",
    title: "Express interest",
    body: "Email partnerships@nidcfoundation.org or fill out the partner registration form online.",
    icon: "📩",
  },
  {
    n: "02",
    title: "Due diligence",
    body: "We review your institution's accreditation, track record, and available programmes.",
    icon: "🔎",
  },
  {
    n: "03",
    title: "Partnership agreement",
    body: "Sign a Memorandum of Understanding outlining slot allocation, tuition rates, and reporting requirements.",
    icon: "🖊️",
  },
  {
    n: "04",
    title: "Receive students",
    body: "NIDC forwards applications from accepted students to your admissions team. You enroll them through standard channels.",
    icon: "🎓",
  },
  {
    n: "05",
    title: "Tuition paid directly",
    body: "NIDC pays tuition directly to the university on a semester basis. No chasing students for fees.",
    icon: "💳",
  },
  {
    n: "06",
    title: "Report & renew",
    body: "Submit a short annual progress report. Partnership renews automatically if standards are maintained.",
    icon: "🔄",
  },
];

const CONTENT: Record<string, typeof STUDENT_STEPS> = {
  students: STUDENT_STEPS,
  donors: DONOR_STEPS,
  universities: UNI_STEPS,
};

const CTA: Record<string, { label: string; href: string }> = {
  students: { label: "Start Your Application", href: "/apply" },
  donors: { label: "Make a Donation", href: "/donate" },
  universities: { label: "Become a Partner University", href: "/contact" },
};

export default function HowItWorksPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState("students");

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

  useEffect(() => {
    const steps = document.querySelectorAll(".step-item");
    gsap.fromTo(
      steps,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }
    );
  }, [tab]);

  const steps = CONTENT[tab];

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
            The Process
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            Simple, transparent,
            <br />
            <span className="text-primary">life-changing.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            NIDC Foundation was built to remove barriers — not create them.
            Here&apos;s exactly how everything works, for every person involved.
          </p>
        </div>
      </section>

      {/* TAB SWITCHER */}
      <section className="py-10 px-6 border-t border-border/70">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div
            className="scroll-reveal flex flex-wrap gap-2 bg-card border border-border/80
                          p-1.5 rounded-2xl mb-12 w-fit mx-auto"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                            transition-all duration-300 ${
                              tab === t.id
                                ? "bg-primary text-foreground shadow-lg shadow-primary/30"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Steps */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-6 bottom-6 w-px
                            bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent"
            />

            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={step.n} className="step-item flex gap-6 items-start">
                  {/* Step indicator */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-full bg-card border-2
                                  border-primary/40 flex items-center justify-center shrink-0"
                  >
                    <span className="text-lg">{step.icon}</span>
                  </div>
                  {/* Content */}
                  <div
                    className={`flex-1 bg-card border border-border/70 rounded-2xl p-6
                                   hover:border-primary/15 transition-all duration-300
                                   ${
                                     i === 0
                                       ? "border-primary/20 bg-primary/5"
                                       : ""
                                   }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-primary text-xs font-semibold mb-1">
                          Step {step.n}
                        </p>
                        <h3 className="text-foreground font-semibold text-base mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA after steps */}
            <div className="mt-12 text-center">
              <Link
                href={CTA[tab].href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-accent
                           text-foreground font-medium rounded-2xl transition-all shadow-xl shadow-primary/25"
              >
                {CTA[tab].label} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ STRIP */}
      <section className="py-20 px-6 border-t border-border/70">
        <div className="max-w-3xl mx-auto scroll-reveal text-center">
          <p className="text-muted-foreground/80 text-sm mb-6">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply#faq"
              className="px-6 py-3 border border-border hover:border-ring/50
                                               text-foreground/80 hover:text-foreground rounded-xl text-sm transition-all"
            >
              Read the FAQ
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-primary/30 hover:border-primary/60
                                             text-primary hover:text-accent rounded-xl text-sm transition-all"
            >
              Contact us directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
