"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { createClient } from "@/lib/client";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SCHEMA
// ============================================================

const donationSchema = z.object({
  full_name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  amount: z.number().min(1, "Please enter an amount"),
  message: z.string().max(300, "Max 300 characters").optional(),
  is_anonymous: z.boolean().default(false),
  frequency: z.enum(["once", "monthly"]).default("once"),
  student_id: z.string().optional(),
});

type DonationForm = z.infer<typeof donationSchema>;

// ============================================================
// CONSTANTS
// ============================================================

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const IMPACT_MAP: Record<number, { icon: string; desc: string }> = {
  25: { icon: "📚", desc: "Covers a student's textbooks for a semester." },
  50: { icon: "🚌", desc: "Pays one month of transport to university." },
  100: { icon: "🏠", desc: "Covers a student's monthly living stipend." },
  250: { icon: "🛏️", desc: "Funds one month of university accommodation." },
  500: { icon: "🎓", desc: "Pays a full semester of tuition fees." },
  1000: {
    icon: "⭐",
    desc: "Sponsors an entire academic year for one student.",
  },
};

// ============================================================
// COMPONENT
// ============================================================

export default function DonatePage() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();
  const pageRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<any>(null);
  const [selectedAmt, setSelectedAmt] = useState<number>(100);
  const [customAmt, setCustomAmt] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [donationRef, setDonationRef] = useState<string>("");

  const effectiveAmount = isCustom ? parseFloat(customAmt) || 0 : selectedAmt;

  const impactKey = Object.keys(IMPACT_MAP)
    .map(Number)
    .filter((k) => k <= effectiveAmount)
    .pop();
  const impact = impactKey ? IMPACT_MAP[impactKey] : null;

  // Pre-fill amount from URL (?amount=250)
  useEffect(() => {
    const amt = params.get("amount");
    if (amt && PRESET_AMOUNTS.includes(Number(amt))) {
      setSelectedAmt(Number(amt));
    }
  }, [params]);

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase]);

  // GSAP entrance
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
          scrollTrigger: { trigger: el, start: "top 86%" },
        }
      );
    });
  }, []);

  // Success animation
  useEffect(() => {
    if (step === "success") {
      gsap.fromTo(
        ".success-card",
        { opacity: 0, scale: 0.95, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [step]);

  // ── Form setup ──
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      frequency: "once",
      is_anonymous: false,
      amount: 100,
    },
  });

  // Sync amount into form
  useEffect(() => {
    setValue("amount", effectiveAmount);
  }, [effectiveAmount, setValue]);

  // Pre-fill name/email if logged in
  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data?.full_name) setValue("full_name", data.full_name);
          if (data?.email) setValue("email", data.email);
        });
    }
  }, [user, supabase, setValue]);

  // ── Submit ──
  const onSubmit = async (data: DonationForm) => {
    setSubmitting(true);
    setStep("processing");

    try {
      // Call Stripe/Paystack API route
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(data.amount * 100), // cents
          currency: "usd",
          email: data.email,
          full_name: data.full_name,
          message: data.message,
          is_anonymous: data.is_anonymous,
          frequency: data.frequency,
          student_id: data.student_id || null,
          user_id: user?.id || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Payment failed");

      // For Stripe Checkout: redirect to Stripe
      if (result.url) {
        window.location.href = result.url;
        return;
      }

      // For inline success (e.g. Paystack callback)
      setDonationRef(result.reference || "NIDC-" + Date.now());
      setStep("success");
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
      setStep("form");
    } finally {
      setSubmitting(false);
    }
  };

  const frequency = watch("frequency");
  const isAnonymous = watch("is_anonymous");

  // ============================================================
  // SUCCESS SCREEN
  // ============================================================
  if (step === "success") {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center px-6 py-20">
        <div className="success-card w-full max-w-lg text-center">
          {/* Celebration */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center">
              <span className="text-5xl">🎉</span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
          </div>

          <h1 className="font-display text-4xl font-light text-foreground mb-3">
            Thank you for giving!
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Your donation of{" "}
            <span className="text-primary font-semibold">
              ${effectiveAmount.toLocaleString()}
            </span>{" "}
            {frequency === "monthly" ? "per month " : ""}has been received.
          </p>
          <p className="text-muted-foreground/70 text-sm mb-8">
            Reference:{" "}
            <span className="text-muted-foreground font-mono">{donationRef}</span>
          </p>

          {/* Impact reminder */}
          {impact && (
            <div className="bg-primary/8 border border-primary/20 rounded-2xl px-6 py-5 mb-8">
              <p className="text-2xl mb-2">{impact.icon}</p>
              <p className="text-accent text-sm">{impact.desc}</p>
            </div>
          )}

          {/* Account creation prompt — only show if NOT logged in */}
          {!user && (
            <div className="bg-card border border-border rounded-2xl p-7 mb-6 text-left">
              <p className="text-foreground font-semibold text-lg mb-2">
                Want to track your impact?
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Create a free NIDC account to see exactly which student your
                money is funding, follow their progress from enrollment to
                graduation, and access your tax receipts anytime.
              </p>
              <div className="space-y-2.5">
                {[
                  "✓  Track the student you funded",
                  "✓  See their progress — year by year",
                  "✓  Download tax receipts",
                  "✓  Get notified when they graduate",
                ].map((item) => (
                  <p key={item} className="text-foreground/80 text-sm">
                    {item}
                  </p>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  href={`/register?role=donor&email=${encodeURIComponent(
                    watch("email") || ""
                  )}`}
                  className="flex-1 text-center py-3 bg-primary hover:bg-accent
                             text-foreground font-medium rounded-xl transition-all text-sm"
                >
                  Create Free Account →
                </Link>
                <Link
                  href="/"
                  className="flex-1 text-center py-3 border border-border hover:border-ring/50
                             text-muted-foreground hover:text-foreground rounded-xl transition-all text-sm"
                >
                  No thanks
                </Link>
              </div>
            </div>
          )}

          {/* Already logged in */}
          {user && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/donor/dashboard"
                className="flex-1 text-center py-3 bg-primary hover:bg-accent
                           text-foreground font-medium rounded-xl transition-all text-sm"
              >
                View My Dashboard →
              </Link>
              <Link
                href="/transparency"
                className="flex-1 text-center py-3 border border-border hover:border-ring/50
                           text-foreground/80 hover:text-foreground rounded-xl transition-all text-sm"
              >
                See Live Impact
              </Link>
            </div>
          )}

          <p className="text-muted-foreground/60 text-xs mt-6">
            A receipt has been sent to your email address.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // PROCESSING SCREEN
  // ============================================================
  if (step === "processing") {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-14 h-14 border-2 border-primary border-t-transparent
                          rounded-full animate-spin mx-auto mb-5"
          />
          <p className="text-foreground font-medium mb-2">
            Processing your donation...
          </p>
          <p className="text-muted-foreground/80 text-sm">Please don't close this tab.</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // DONATION FORM
  // ============================================================
  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                        bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="hero-el text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Give Today
          </p>
          <h1 className="hero-el font-display text-5xl sm:text-6xl font-light text-foreground mb-4 leading-tight">
            Turn your generosity into
            <br />
            <span className="text-primary">someone's opportunity.</span>
          </h1>
          <p className="hero-el text-muted-foreground text-base max-w-lg mx-auto leading-relaxed mb-3">
            No account needed. Donate in under 2 minutes. 100% of your donation
            goes to student scholarships — every cent publicly tracked.
          </p>
          {/* Guest reassurance */}
          <div className="hero-el inline-flex items-center gap-2 text-muted-foreground/80 text-xs">
            <span className="text-primary">✓</span> No login required
            <span className="mx-2 text-foreground/12">|</span>
            <span className="text-primary">✓</span> Secure payment
            <span className="mx-2 text-foreground/12">|</span>
            <span className="text-primary">✓</span> Receipt by email
          </div>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="py-10 px-6 pb-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* ── DONATION FORM (3 cols) ── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="lg:col-span-3 space-y-6"
          >
            <div className="bg-card border border-border/80 rounded-2xl p-8 space-y-6">
              {/* ── Frequency ── */}
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider mb-3 block">
                  Donation type
                </label>
                <div className="flex gap-2 bg-muted/40 border border-border/80 p-1 rounded-xl">
                  {(["once", "monthly"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setValue("frequency", f)}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg capitalize transition-all ${
                        frequency === f
                          ? "bg-primary text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f === "once" ? "One-time" : "Monthly"}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Amount presets ── */}
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider mb-3 block">
                  Select amount (USD)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {PRESET_AMOUNTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setSelectedAmt(p);
                        setIsCustom(false);
                        setCustomAmt("");
                      }}
                      className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                        !isCustom && selectedAmt === p
                          ? "bg-primary border-primary text-foreground"
                          : "bg-muted/40 border-border/80 text-foreground/80 hover:border-ring/50"
                      }`}
                    >
                      ${p.toLocaleString()}
                    </button>
                  ))}
                </div>
                {/* Custom */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmt}
                    onChange={(e) => {
                      setCustomAmt(e.target.value);
                      setIsCustom(true);
                    }}
                    onFocus={() => setIsCustom(true)}
                    className={`w-full bg-muted/40 border text-foreground pl-8 pr-4 py-3 rounded-xl
                                text-sm placeholder-gray-600 focus:outline-none transition-colors
                                ${
                                  isCustom
                                    ? "border-primary"
                                    : "border-border/80 focus:border-primary"
                                }`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* ── Impact display ── */}
              {impact && effectiveAmount > 0 && (
                <div className="bg-primary/8 border border-primary/20 rounded-xl px-4 py-4">
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                    Your impact
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{impact.icon}</span>
                    <p className="text-gray-200 text-sm">{impact.desc}</p>
                  </div>
                </div>
              )}
            </div>

            {/* ── Personal details ── */}
            <div className="bg-card border border-border/80 rounded-2xl p-8 space-y-5">
              <h3 className="text-foreground font-medium text-base">Your details</h3>

              {user && (
                <div
                  className="flex items-center gap-2 bg-primary/8 border border-primary/20
                                rounded-xl px-4 py-3 text-sm"
                >
                  <span className="text-primary">✓</span>
                  <p className="text-foreground/80">
                    Donating as{" "}
                    <span className="text-foreground font-medium">{user.email}</span>
                  </p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground text-xs mb-1.5 block">
                    Full name *
                  </label>
                  <input
                    {...register("full_name")}
                    placeholder="Your full name"
                    className={inputCls(!!errors.full_name)}
                  />
                  {errors.full_name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-muted-foreground text-xs mb-1.5 block">
                    Email address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className={inputCls(!!errors.email)}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-muted-foreground text-xs mb-1.5 block">
                  Leave a message{" "}
                  <span className="text-muted-foreground/70">(optional)</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={3}
                  placeholder="A note of encouragement to the student, or a dedication..."
                  className={`${inputCls(!!errors.message)} resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Anonymous toggle */}
              <div className="flex items-center justify-between py-3 border-t border-border/70">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    Donate anonymously
                  </p>
                  <p className="text-muted-foreground/80 text-xs">
                    Your name won't appear on the public transparency dashboard
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setValue("is_anonymous", !isAnonymous)}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ml-4 ${
                    isAnonymous ? "bg-primary" : "bg-foreground/10"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow
                                   transition-all ${
                                     isAnonymous ? "left-6" : "left-1"
                                   }`}
                  />
                </button>
              </div>
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={submitting || effectiveAmount <= 0}
              className="w-full py-4 bg-primary hover:bg-accent disabled:opacity-40
                         disabled:cursor-not-allowed text-foreground font-medium rounded-2xl
                         transition-all text-base shadow-xl shadow-primary/25"
            >
              {submitting
                ? "Processing..."
                : `Donate $${
                    effectiveAmount > 0 ? effectiveAmount.toLocaleString() : "—"
                  }${frequency === "monthly" ? "/month" : ""} →`}
            </button>

            <p className="text-center text-muted-foreground/70 text-xs">
              Secured by Stripe · Your card details never touch our servers
            </p>

            {/* Sign in nudge for guests */}
            {!user && (
              <p className="text-center text-muted-foreground/70 text-xs">
                Already have an account?{" "}
                <Link
                  href="/login?redirectTo=/donate"
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>{" "}
                to track your donations.
              </p>
            )}
          </form>

          {/* ── SIDEBAR (2 cols) ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Trust signals */}
            <div className="scroll-reveal bg-card border border-border/80 rounded-2xl p-6">
              <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Our promise to you
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "💯",
                    title: "100% to students",
                    desc: "Zero admin deduction from donations. Operations funded separately.",
                  },
                  {
                    icon: "🔍",
                    title: "Fully transparent",
                    desc: "Every donation appears on our public ledger within minutes.",
                  },
                  {
                    icon: "🔒",
                    title: "Bank-grade security",
                    desc: "Payments secured by Stripe. We never store card details.",
                  },
                  {
                    icon: "🧾",
                    title: "Tax receipt",
                    desc: "Issued automatically to your email. Deductible in eligible regions.",
                  },
                ].map((t) => (
                  <div key={t.title} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{t.icon}</span>
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {t.title}
                      </p>
                      <p className="text-muted-foreground/80 text-xs leading-snug">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why create an account */}
            {!user && (
              <div
                className="scroll-reveal bg-card border border-primary/15
                              rounded-2xl p-6"
              >
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                  After you donate
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Create a free account after payment to unlock your personal
                  impact dashboard.
                </p>
                <div className="space-y-2">
                  {[
                    "See the student your money funded",
                    "Follow their journey year by year",
                    "View your total donations",
                    "Download tax receipts anytime",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-primary text-xs">✓</span>
                      <p className="text-foreground/80 text-xs">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live total */}
            <div className="scroll-reveal bg-card border border-border/80 rounded-2xl p-6 text-center">
              <p className="text-muted-foreground/80 text-xs mb-1">Total raised to date</p>
              <p className="font-display text-3xl font-semibold text-primary">
                $1.21M
              </p>
              <p className="text-muted-foreground/70 text-xs mt-1">across 124 students</p>
              <Link
                href="/transparency"
                className="inline-block mt-3 text-xs text-primary hover:underline"
              >
                View live ledger →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `w-full bg-muted/40 border text-foreground placeholder-gray-600 rounded-xl px-4 py-3 text-sm
   focus:outline-none transition-colors
   ${
     hasError
       ? "border-red-500/60 focus:border-red-500"
       : "border-border/80 focus:border-primary"
   }`;
