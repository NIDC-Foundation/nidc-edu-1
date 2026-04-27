"use client";
// app/(public)/contact/page.tsx
// ============================================================
// NIDC FOUNDATION — Contact Page
// ============================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  { icon: "✉️", label: "General Enquiries", value: "hello@nidcfoundation.org" },
  {
    icon: "🎓",
    label: "Scholarship Applications",
    value: "apply@nidcfoundation.org",
  },
  {
    icon: "💳",
    label: "Donations & Giving",
    value: "giving@nidcfoundation.org",
  },
  {
    icon: "🏛️",
    label: "University Partnerships",
    value: "partnerships@nidcfoundation.org",
  },
  { icon: "📰", label: "Press & Media", value: "press@nidcfoundation.org" },
];

const OFFICES = [
  {
    city: "Accra",
    country: "Ghana 🇬🇭",
    address: "Independence Avenue, Accra, Ghana",
    type: "Headquarters",
  },
  {
    city: "Lagos",
    country: "Nigeria 🇳🇬",
    address: "Victoria Island, Lagos, Nigeria",
    type: "West Africa Hub",
  },
  {
    city: "Nairobi",
    country: "Kenya 🇰🇪",
    address: "Upper Hill, Nairobi, Kenya",
    type: "East Africa Hub",
  },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current?.querySelectorAll(".reveal") || [],
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      }
    );
    const sections = pageRef.current?.querySelectorAll(".scroll-reveal") || [];
    sections.forEach((el) => {
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

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <div ref={pageRef} className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]
                        bg-[radial-gradient(ellipse,_#10b98110_0%,_transparent_65%)] pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="reveal text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="reveal font-display text-5xl sm:text-6xl font-light text-foreground mb-5 leading-tight">
            We'd love to
            <br />
            <span className="text-primary">hear from you.</span>
          </h1>
          <p className="reveal text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Whether you're a student, donor, university partner, or journalist —
            there's always someone on the NIDC team ready to talk.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-16 px-6 border-t border-border/70">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="scroll-reveal">
            <h2 className="font-display text-3xl font-light text-foreground mb-8">
              Send us a message
            </h2>
            {sent ? (
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-10 text-center">
                <p className="text-4xl mb-4">✅</p>
                <p className="text-foreground font-semibold text-lg mb-2">
                  Message received!
                </p>
                <p className="text-muted-foreground text-sm">
                  We'll get back to you within 1–2 business days.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  {
                    key: "name",
                    label: "Your name",
                    type: "text",
                    placeholder: "Full name",
                  },
                  {
                    key: "email",
                    label: "Email address",
                    type: "email",
                    placeholder: "you@example.com",
                  },
                  {
                    key: "subject",
                    label: "Subject",
                    type: "text",
                    placeholder: "What is this about?",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-muted-foreground text-sm mb-1.5 block">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formState[f.key as keyof typeof formState]}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, [f.key]: e.target.value }))
                      }
                      className="w-full bg-card border border-border/80 text-foreground placeholder-gray-600
                                 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-muted-foreground text-sm mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full bg-card border border-border/80 text-foreground placeholder-gray-600
                               rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary
                               transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 bg-primary hover:bg-accent disabled:opacity-50
                             text-foreground font-medium rounded-xl transition-all"
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </div>
            )}
          </div>

          {/* Contact channels + offices */}
          <div className="space-y-8">
            <div className="scroll-reveal">
              <h3 className="text-foreground font-semibold text-base mb-5">
                Contact by email
              </h3>
              <div className="space-y-3">
                {CONTACTS.map((c) => (
                  <a
                    key={c.label}
                    href={`mailto:${c.value}`}
                    className="flex items-center gap-4 bg-card border border-border/70
                               rounded-xl px-5 py-4 hover:border-primary/20 transition-all group"
                  >
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <p className="text-muted-foreground text-xs">{c.label}</p>
                      <p className="text-foreground text-sm group-hover:text-primary transition-colors">
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="scroll-reveal">
              <h3 className="text-foreground font-semibold text-base mb-5">
                Our offices
              </h3>
              <div className="space-y-3">
                {OFFICES.map((o) => (
                  <div
                    key={o.city}
                    className="bg-card border border-border/70 rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-foreground font-medium text-sm">
                        {o.city}, {o.country}
                      </p>
                      <span
                        className="text-xs bg-primary/10 text-primary border border-primary/20
                                       px-2 py-0.5 rounded-full"
                      >
                        {o.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground/80 text-xs">{o.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
