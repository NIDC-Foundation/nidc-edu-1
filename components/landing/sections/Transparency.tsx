"use client";
// components/landing/TransparencySection.tsx
// ============================================================
// NIDC FOUNDATION — Transparency Section
// Live donation ledger preview. Public trust signal.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { createClient } from "@/lib/client";

gsap.registerPlugin(ScrollTrigger);

// Fallback static data for when Supabase is empty
const PLACEHOLDER_DONATIONS = [
  {
    donor: "Anonymous",
    amount: 500,
    currency: "USD",
    student: "Amara D.",
    country: "🇬🇳",
    time: "2 hrs ago",
  },
  {
    donor: "James O.",
    amount: 250,
    currency: "USD",
    student: "Fatima H.",
    country: "🇳🇬",
    time: "5 hrs ago",
  },
  {
    donor: "Anonymous",
    amount: 1000,
    currency: "USD",
    student: "General Fund",
    country: "🌍",
    time: "1 day ago",
  },
  {
    donor: "Sarah M.",
    amount: 150,
    currency: "GBP",
    student: "David M.",
    country: "🇰🇪",
    time: "2 days ago",
  },
  {
    donor: "Tech Corp CSR",
    amount: 5000,
    currency: "USD",
    student: "General Fund",
    country: "🌍",
    time: "3 days ago",
  },
];

interface DonationRow {
  donor: string;
  amount: number;
  currency: string;
  student: string;
  country: string;
  time: string;
}

export default function TransparencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const [donations, setDonations] = useState<DonationRow[]>(
    PLACEHOLDER_DONATIONS
  );
  const [summary, setSummary] = useState({
    total: 1_210_000,
    count: 48,
    students: 124,
  });

  // Fetch live data from Supabase
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const { data: donationData } = await supabase
        .from("donations")
        .select(
          `
          amount, currency, is_anonymous, message, created_at,
          profiles!donor_id ( full_name ),
          profiles!student_id ( full_name, country )
        `
        )
        .eq("status", "success")
        .order("created_at", { ascending: false })
        .limit(5);

      if (donationData && donationData.length > 0) {
        // Map to display format
        const mapped = donationData.map((d: any) => ({
          donor: d.is_anonymous
            ? "Anonymous"
            : d.profiles?.full_name?.split(" ")[0] +
                " " +
                d.profiles?.full_name?.split(" ")[1]?.[0] +
                "." || "Anonymous",
          amount: d.amount,
          currency: d.currency,
          student: "Funded Student",
          country: "🌍",
          time: timeAgo(d.created_at),
        }));
        setDonations(mapped);
      }
    }
    fetchData();
  }, []);

  // Animated total counter
  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: summary.total,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
      onUpdate() {
        if (totalRef.current) {
          const v = Math.floor(obj.val);
          totalRef.current.textContent =
            v >= 1_000_000
              ? `$${(v / 1_000_000).toFixed(2)}M`
              : `$${v.toLocaleString()}`;
        }
      },
    });

    // Section reveal
    gsap.fromTo(
      sectionRef.current?.querySelectorAll(".reveal-item") || [],
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );
  }, [summary.total]);

  return (
    <section
      ref={sectionRef}
      id="transparency"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                        from-transparent via-border to-transparent"
        />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2
                        w-[500px] h-[500px]
                        bg-[radial-gradient(ellipse,_#10b9810a_0%,_transparent_70%)]"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: copy */}
          <div>
            <div className="reveal-item">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
                Radical Transparency
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-light text-foreground
                             leading-tight tracking-tight mb-6"
              >
                Every dollar.
                <br />
                <span className="text-primary">Every student.</span>
                <br />
                Fully traceable.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                When you donate to NIDC Foundation, you can see exactly where
                your money goes — which student it funds, which university they
                attend, and how they're progressing.
              </p>
            </div>

            {/* Trust pillars */}
            <div className="reveal-item space-y-4">
              {[
                {
                  icon: "🔍",
                  title: "Open Ledger",
                  desc: "Every donation is logged on our public dashboard with amount, date, and allocation.",
                },
                {
                  icon: "👤",
                  title: "Student Profiles",
                  desc: "Track the progress of funded students from enrollment through graduation.",
                },
                {
                  icon: "📊",
                  title: "Impact Reports",
                  desc: "Quarterly reports published publicly. No hidden admin costs.",
                },
              ].map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 bg-primary/10 rounded-xl flex items-center
                                  justify-center text-lg shrink-0"
                  >
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm mb-0.5">
                      {p.title}
                    </p>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal-item mt-10">
              <Link
                href="/transparency"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40
                           hover:border-primary/70 text-primary hover:text-accent
                           text-sm font-medium rounded-xl transition-all duration-300
                           hover:bg-accent/5"
              >
                View Full Transparency Dashboard
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: live ledger widget */}
          <div className="reveal-item">
            <div
              className="bg-card border border-border/80 rounded-2xl overflow-hidden
                            shadow-2xl shadow-black/40"
            >
              {/* Widget header */}
              <div className="px-6 py-5 border-b border-border/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-foreground font-medium text-sm">
                      Live Donation Feed
                    </p>
                  </div>
                  <p className="text-muted-foreground/80 text-xs">Updated in real-time</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground/80 text-xs mb-0.5">Total Raised</p>
                  <p className="font-display text-2xl font-semibold text-primary">
                    <span ref={totalRef}>$0</span>
                  </p>
                </div>
              </div>

              {/* Donation rows */}
              <div className="divide-y divide-border/50">
                {donations.map((d, i) => (
                  <div
                    key={i}
                    className="px-6 py-4 flex items-center justify-between gap-4
                               hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full bg-muted/50 border border-border/80
                                      flex items-center justify-center text-xs font-bold
                                      text-muted-foreground shrink-0"
                      >
                        {d.donor === "Anonymous" ? "?" : d.donor.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-foreground text-sm font-medium truncate">
                          {d.donor}
                        </p>
                        <p className="text-muted-foreground/80 text-xs">
                          → {d.student} {d.country}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-primary font-semibold text-sm">
                        +{d.currency === "GBP" ? "£" : "$"}
                        {d.amount.toLocaleString()}
                      </p>
                      <p className="text-muted-foreground/70 text-xs">{d.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Widget footer */}
              <div className="px-6 py-4 bg-primary/5 border-t border-primary/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground/80">
                    {summary.students} students funded
                  </span>
                  <Link
                    href="/donate"
                    className="text-primary hover:text-accent font-medium transition-colors"
                  >
                    Donate now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h} hr${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}
