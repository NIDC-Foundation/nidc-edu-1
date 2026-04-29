"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { createClient } from "@/lib/client";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// TYPES
// ============================================================

interface Donation {
  id: string;
  amount: number;
  currency: string;
  is_anonymous: boolean;
  message: string | null;
  created_at: string;
  donor_name: string | null;
  student_name: string | null;
  student_country: string | null;
}

interface Summary {
  total_raised: number;
  total_donations: number;
  students_funded: number;
  universities: number;
}

interface StudentFunding {
  student_id: string;
  full_name: string;
  university_name: string | null;
  current_stage: string | null;
  total_funded: number;
  currency: string;
}

// ============================================================
// HELPERS
// ============================================================

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60_000);
  const hrs = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

function formatCurrency(amount: number, currency = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    NGN: "₦",
    GHS: "₵",
    KES: "KSh",
  };
  return `${symbols[currency] || "$"}${amount.toLocaleString()}`;
}

const STAGE_LABEL: Record<string, string> = {
  enrolled: "Enrolled",
  year_1: "Year 1",
  year_2: "Year 2",
  year_3: "Year 3",
  year_4: "Year 4",
  graduated: "Graduated",
  employed: "Employed",
};

const STAGE_PCT: Record<string, number> = {
  enrolled: 10,
  year_1: 25,
  year_2: 42,
  year_3: 58,
  year_4: 75,
  graduated: 90,
  employed: 100,
};

const STAGE_COLOR: Record<string, string> = {
  enrolled: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  year_1: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  year_2: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  year_3: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  year_4: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  graduated: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  employed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

// ============================================================
// COMPONENT
// ============================================================

export default function TransparencyClient() {
  const supabase = createClient();
  const pageRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const studRef = useRef<HTMLSpanElement>(null);

  const [donations, setDonations] = useState<Donation[]>([]);
  const [students, setStudents] = useState<StudentFunding[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total_raised: 0,
    total_donations: 0,
    students_funded: 0,
    universities: 0,
  });
  const [loading, setLoading] = useState(true);
  const [liveCount, setLiveCount] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "feed" | "students" | "allocations"
  >("feed");
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  // ── Fetch initial data ──
  const fetchData = useCallback(async () => {
    // Donations feed
    const { data: donationRows } = await supabase
      .from("donations")
      .select(
        `
        id, amount, currency, is_anonymous, message, created_at,
        profiles!donor_id ( full_name ),
        profiles!student_id ( full_name, country )
      `
      )
      .eq("status", "success")
      .order("created_at", { ascending: false })
      .limit(50);

    if (donationRows) {
      const mapped: Donation[] = donationRows.map((d: any) => ({
        id: d.id,
        amount: d.amount,
        currency: d.currency,
        is_anonymous: d.is_anonymous,
        message: d.message,
        created_at: d.created_at,
        donor_name: d.is_anonymous
          ? null
          : d.profiles_donor_id?.full_name || null,
        student_name: d.profiles_student_id?.full_name || null,
        student_country: d.profiles_student_id?.country || null,
      }));
      setDonations(mapped);

      // Summary from fetched data
      const total = mapped.reduce((s, d) => s + d.amount, 0);
      const students = new Set(
        mapped.map((d) => d.student_name).filter(Boolean)
      ).size;
      setSummary((prev) => ({
        ...prev,
        total_raised: total,
        total_donations: mapped.length,
        students_funded: students,
        universities: 18,
      }));
    }

    // Student funding summaries
    const { data: studentRows } = await supabase
      .from("student_funding_summary")
      .select("*")
      .order("total_funded", { ascending: false });

    if (studentRows) setStudents(studentRows as StudentFunding[]);

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Supabase Realtime subscription ──
  useEffect(() => {
    const channel = supabase
      .channel("public:donations")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "donations",
          filter: "status=eq.success",
        },
        (payload) => {
          const newDonation = payload.new as any;

          // Add to top of feed
          const mapped: Donation = {
            id: newDonation.id,
            amount: newDonation.amount,
            currency: newDonation.currency,
            is_anonymous: newDonation.is_anonymous,
            message: newDonation.message,
            created_at: newDonation.created_at,
            donor_name: newDonation.is_anonymous ? null : "Donor",
            student_name: null,
            student_country: null,
          };

          setDonations((prev) => [mapped, ...prev.slice(0, 49)]);
          setNewIds((prev) => new Set([...prev, newDonation.id]));
          setLiveCount((c) => c + 1);

          setSummary((prev) => ({
            ...prev,
            total_raised: prev.total_raised + newDonation.amount,
            total_donations: prev.total_donations + 1,
          }));

          // Clear highlight after 4s
          setTimeout(() => {
            setNewIds((prev) => {
              const next = new Set(prev);
              next.delete(newDonation.id);
              return next;
            });
          }, 4000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // ── GSAP counter animations ──
  useEffect(() => {
    if (loading || summary.total_raised === 0) return;

    const animateCounter = (
      el: HTMLSpanElement | null,
      target: number,
      format: (n: number) => string
    ) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(Math.floor(obj.val));
        },
      });
    };

    animateCounter(totalRef.current, summary.total_raised, (n) =>
      n >= 1_000_000
        ? `$${(n / 1_000_000).toFixed(2)}M`
        : `$${n.toLocaleString()}`
    );
    animateCounter(countRef.current, summary.total_donations, (n) =>
      n.toLocaleString()
    );
    animateCounter(studRef.current, summary.students_funded, (n) =>
      n.toString()
    );
  }, [loading, summary]);

  // ── GSAP page entrance ──
  useEffect(() => {
    if (loading) return;
    gsap.fromTo(
      pageRef.current?.querySelectorAll(".reveal") || [],
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  }, [loading]);

  // ── Animate new realtime donation ──
  useEffect(() => {
    if (liveCount === 0) return;
    const firstRow = document.querySelector(".donation-row:first-child");
    if (firstRow) {
      gsap.fromTo(
        firstRow,
        { opacity: 0, x: -20, backgroundColor: "rgba(16,185,129,0.15)" },
        {
          opacity: 1,
          x: 0,
          backgroundColor: "rgba(0,0,0,0)",
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [liveCount]);

  // ============================================================
  // LOADING
  // ============================================================
  if (loading) {
    return (
      <div className="bg-[#04091a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-10 h-10 border-2 border-emerald-500 border-t-transparent
                          rounded-full animate-spin mx-auto mb-4"
          />
          <p className="text-gray-500 text-sm">Loading transparency data...</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div ref={pageRef} className="bg-[#04091a] text-white min-h-screen">
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]
                          bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_60%)]"
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          {/* Decorative rings */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-emerald-500/6" />
          <div className="absolute top-32 right-20 w-40 h-40 rounded-full border border-emerald-500/8" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25
                                rounded-full px-4 py-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">
                    Live · Updated in real time
                  </span>
                </div>
                {liveCount > 0 && (
                  <span className="text-xs text-gray-500">
                    +{liveCount} since you arrived
                  </span>
                )}
              </div>
              <h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-light
                             text-white leading-tight tracking-tight"
              >
                Every dollar.
                <br />
                <span className="text-emerald-400">Every student.</span>
                <br />
                <span className="text-white/40">On record.</span>
              </h1>
            </div>
            <div className="lg:text-right max-w-sm">
              <p className="text-gray-400 text-base leading-relaxed mb-5">
                NIDC Foundation publishes every donation and every allocation
                publicly. No hidden fees. No vague reports. Just facts.
              </p>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600
                           hover:bg-emerald-500 text-white text-sm font-medium rounded-xl
                           transition-all shadow-lg shadow-emerald-900/30"
              >
                Add your donation →
              </Link>
            </div>
          </div>

          {/* ── HEADLINE STATS ── */}
          <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Raised",
                ref: totalRef,
                initial: "$0",
                sub: "From all donors worldwide",
                color: "text-emerald-400",
                icon: "💰",
              },
              {
                label: "Donations",
                ref: countRef,
                initial: "0",
                sub: "Individual transactions",
                color: "text-amber-400",
                icon: "📋",
              },
              {
                label: "Students Funded",
                ref: studRef,
                initial: "0",
                sub: "Active & graduated",
                color: "text-sky-400",
                icon: "🎓",
              },
              {
                label: "Partner Universities",
                ref: null,
                initial: String(summary.universities),
                sub: "Across 6 countries",
                color: "text-violet-400",
                icon: "🏛️",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#080f23] border border-white/6 rounded-2xl p-6
                           hover:border-white/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <p
                  className={`font-display text-3xl sm:text-4xl font-semibold ${s.color} mb-1`}
                >
                  <span ref={s.ref}>{s.initial}</span>
                </p>
                <p className="text-white font-medium text-sm mb-0.5">
                  {s.label}
                </p>
                <p className="text-gray-600 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT — Tabs
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div
            className="reveal flex gap-1 bg-[#080f23] border border-white/6 p-1.5
                          rounded-2xl w-fit mb-10"
          >
            {(
              [
                { id: "feed", label: "Donation Feed", icon: "📡" },
                { id: "students", label: "Funded Students", icon: "🎓" },
                { id: "allocations", label: "Fund Allocation", icon: "📊" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-200 ${
                              activeTab === t.id
                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
                                : "text-gray-400 hover:text-white"
                            }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* ── TAB: DONATION FEED ── */}
          {activeTab === "feed" && (
            <div className="reveal">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-white font-semibold text-lg">
                    Live Donation Feed
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Every successful donation, newest first. Updates
                    automatically.
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10
                                border border-emerald-500/20 px-3 py-1.5 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </div>
              </div>

              <div className="bg-[#080f23] border border-white/6 rounded-2xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-12 px-6 py-3 border-b border-white/6">
                  {[
                    { label: "Donor", cols: "col-span-3" },
                    { label: "Amount", cols: "col-span-2" },
                    { label: "Student", cols: "col-span-3" },
                    { label: "Message", cols: "col-span-2 hidden sm:block" },
                    { label: "When", cols: "col-span-2 text-right" },
                  ].map((h) => (
                    <p
                      key={h.label}
                      className={`text-gray-600 text-xs uppercase tracking-wider ${h.cols}`}
                    >
                      {h.label}
                    </p>
                  ))}
                </div>

                {/* Donation rows */}
                <div className="divide-y divide-white/[0.04]">
                  {donations.length === 0 ? (
                    <div className="py-20 text-center">
                      <p className="text-3xl mb-3">📭</p>
                      <p className="text-gray-500 text-sm">No donations yet.</p>
                      <Link
                        href="/donate"
                        className="text-emerald-400 text-xs mt-2 block hover:underline"
                      >
                        Be the first →
                      </Link>
                    </div>
                  ) : (
                    donations.map((d) => (
                      <div
                        key={d.id}
                        className={`donation-row grid grid-cols-12 px-6 py-4 items-center
                                   hover:bg-white/[0.02] transition-all duration-300 ${
                                     newIds.has(d.id)
                                       ? "bg-emerald-500/8 border-l-2 border-emerald-500"
                                       : ""
                                   }`}
                      >
                        {/* Donor */}
                        <div className="col-span-3 flex items-center gap-3 min-w-0">
                          <div
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/8
                                          flex items-center justify-center text-xs font-bold
                                          text-gray-400 shrink-0"
                          >
                            {d.is_anonymous || !d.donor_name
                              ? "?"
                              : d.donor_name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-sm truncate">
                              {d.is_anonymous
                                ? "Anonymous"
                                : d.donor_name || "Anonymous"}
                            </p>
                            {newIds.has(d.id) && (
                              <p className="text-emerald-400 text-xs">New ✓</p>
                            )}
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="col-span-2">
                          <p className="text-emerald-400 font-semibold text-sm">
                            {formatCurrency(d.amount, d.currency)}
                          </p>
                          <p className="text-gray-600 text-xs">{d.currency}</p>
                        </div>

                        {/* Student */}
                        <div className="col-span-3 min-w-0">
                          {d.student_name ? (
                            <>
                              <p className="text-gray-300 text-sm truncate">
                                {d.student_name}
                              </p>
                              <p className="text-gray-600 text-xs">
                                {d.student_country || "—"}
                              </p>
                            </>
                          ) : (
                            <p className="text-gray-600 text-sm italic">
                              General fund
                            </p>
                          )}
                        </div>

                        {/* Message */}
                        <div className="col-span-2 hidden sm:block min-w-0 pr-4">
                          {d.message ? (
                            <p className="text-gray-500 text-xs italic truncate">
                              "{d.message}"
                            </p>
                          ) : (
                            <span className="text-gray-700 text-xs">—</span>
                          )}
                        </div>

                        {/* Time */}
                        <div className="col-span-2 text-right">
                          <p className="text-gray-500 text-xs">
                            {timeAgo(d.created_at)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {donations.length > 0 && (
                  <div
                    className="px-6 py-4 border-t border-white/5 bg-emerald-500/3 flex
                                  items-center justify-between"
                  >
                    <p className="text-gray-600 text-xs">
                      Showing {donations.length} most recent donations
                    </p>
                    <p className="text-gray-600 text-xs">
                      All amounts in stated currency · Converted at time of
                      donation
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB: FUNDED STUDENTS ── */}
          {activeTab === "students" && (
            <div className="reveal">
              <div className="mb-5">
                <h2 className="text-white font-semibold text-lg">
                  Funded Students
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Every student NIDC Foundation has funded — their university,
                  field, and progress stage.
                </p>
              </div>

              {students.length === 0 ? (
                <div className="bg-[#080f23] border border-white/6 rounded-2xl py-20 text-center">
                  <p className="text-3xl mb-3">🎓</p>
                  <p className="text-gray-500 text-sm">
                    No student data available yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((s, i) => (
                    <div
                      key={s.student_id}
                      className="bg-[#080f23] border border-white/6 rounded-2xl p-6
                                 hover:border-white/10 transition-all group"
                    >
                      {/* Avatar + name */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-10 h-10 rounded-full bg-emerald-500/15 border
                                        border-emerald-500/20 flex items-center justify-center
                                        text-emerald-400 font-bold text-xs shrink-0"
                        >
                          {s.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">
                            {s.full_name}
                          </p>
                          <p className="text-gray-500 text-xs truncate">
                            {s.university_name || "Partner University"}
                          </p>
                        </div>
                        {s.current_stage && (
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${
                              STAGE_COLOR[s.current_stage] ||
                              "text-gray-400 bg-white/5 border-white/10"
                            }`}
                          >
                            {STAGE_LABEL[s.current_stage] || s.current_stage}
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      {s.current_stage && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-700 mb-1.5">
                            <span>Start</span>
                            <span>Employed</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r
                                         from-emerald-600 to-emerald-400 transition-all duration-1000"
                              style={{
                                width: `${STAGE_PCT[s.current_stage] || 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Funding */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div>
                          <p className="text-gray-600 text-xs">Total funded</p>
                          <p className="text-emerald-400 font-semibold text-base">
                            {formatCurrency(s.total_funded || 0, s.currency)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700 text-xs">
                            Student #{String(i + 1).padStart(3, "0")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB: ALLOCATIONS ── */}
          {activeTab === "allocations" && (
            <div className="reveal">
              <div className="mb-5">
                <h2 className="text-white font-semibold text-lg">
                  Fund Allocation
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  How donations are distributed — tuition, housing, stipends,
                  and admin.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Allocation breakdown */}
                <div className="bg-[#080f23] border border-white/6 rounded-2xl p-7">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
                    Where your money goes
                  </p>
                  <div className="space-y-5">
                    {[
                      {
                        label: "Tuition Fees",
                        pct: 55,
                        amount: "$665,500",
                        color: "bg-emerald-500",
                      },
                      {
                        label: "Monthly Stipends",
                        pct: 22,
                        amount: "$266,200",
                        color: "bg-emerald-400",
                      },
                      {
                        label: "Housing Support",
                        pct: 14,
                        amount: "$169,400",
                        color: "bg-emerald-300",
                      },
                      {
                        label: "Books & Materials",
                        pct: 5,
                        amount: "$60,500",
                        color: "bg-emerald-200",
                      },
                      {
                        label: "Health Insurance",
                        pct: 4,
                        amount: "$48,400",
                        color: "bg-emerald-100",
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-gray-300 text-sm">{item.label}</p>
                          <div className="flex items-center gap-3">
                            <p className="text-gray-500 text-xs">
                              {item.amount}
                            </p>
                            <p className="text-white font-semibold text-sm w-8 text-right">
                              {item.pct}%
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.color} opacity-80`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Admin note */}
                  <div className="mt-6 pt-5 border-t border-white/6">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-sm">
                        Operations & admin
                      </p>
                      <p className="text-amber-400 font-semibold text-sm">0%</p>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">
                      Operational costs are funded separately through grants and
                      institutional partnerships — never from donations.
                    </p>
                  </div>
                </div>

                {/* Per-university breakdown */}
                <div className="bg-[#080f23] border border-white/6 rounded-2xl p-7">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
                    Tuition paid by university
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        uni: "University of Ghana",
                        flag: "🇬🇭",
                        students: 42,
                        paid: "$184,800",
                      },
                      {
                        uni: "University of Lagos",
                        flag: "🇳🇬",
                        students: 38,
                        paid: "$209,000",
                      },
                      {
                        uni: "University of Nairobi",
                        flag: "🇰🇪",
                        students: 22,
                        paid: "$96,800",
                      },
                      {
                        uni: "Makerere University",
                        flag: "🇺🇬",
                        students: 8,
                        paid: "$28,800",
                      },
                      {
                        uni: "University of Cape Town",
                        flag: "🇿🇦",
                        students: 5,
                        paid: "$30,000",
                      },
                      {
                        uni: "Addis Ababa University",
                        flag: "🇪🇹",
                        students: 9,
                        paid: "$36,000",
                      },
                    ].map((row) => (
                      <div
                        key={row.uni}
                        className="flex items-center justify-between gap-4 py-3
                                   border-b border-white/5 last:border-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl shrink-0">{row.flag}</span>
                          <div className="min-w-0">
                            <p className="text-gray-300 text-sm truncate">
                              {row.uni}
                            </p>
                            <p className="text-gray-600 text-xs">
                              {row.students} students
                            </p>
                          </div>
                        </div>
                        <p className="text-emerald-400 font-semibold text-sm shrink-0">
                          {row.paid}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit note */}
                <div
                  className="lg:col-span-2 bg-[#080f23] border border-white/6 rounded-2xl p-7
                                flex flex-col sm:flex-row items-start sm:items-center gap-5"
                >
                  <div className="text-3xl shrink-0">📋</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">
                      Independently audited
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      All financial records are independently audited by PwC
                      Africa annually. Full audited accounts are published on
                      our Governance page.
                    </p>
                  </div>
                  <Link
                    href="/governance"
                    className="shrink-0 px-5 py-2.5 border border-white/10 hover:border-white/20
                               text-gray-300 hover:text-white text-sm rounded-xl transition-all"
                  >
                    View Governance →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <div
            className="reveal bg-[#080f23] border border-white/6 rounded-2xl p-8
                          lg:p-12 text-center relative overflow-hidden"
          >
            {/* Background glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-[400px] h-[200px] bg-emerald-500/5 blur-3xl rounded-full
                            pointer-events-none"
            />
            <div className="relative">
              <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-3">
                You've seen where the money goes
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-light text-white
                             leading-tight mb-5"
              >
                Now be part of it.
              </h2>
              <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed mb-8">
                Every donation you make will appear on this page within minutes.
                Your name. Your amount. The student you funded.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/donate"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white
                             font-medium rounded-2xl transition-all shadow-xl shadow-emerald-900/30"
                >
                  Donate Now →
                </Link>
                <Link
                  href="/apply"
                  className="px-8 py-4 border border-white/10 hover:border-white/20
                             text-gray-300 hover:text-white rounded-2xl transition-all"
                >
                  Apply for a Scholarship
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
