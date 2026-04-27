"use client";
// components/landing/Navbar.tsx
// ============================================================
// NIDC FOUNDATION — Navbar
// Sticky, transparent → frosted glass on scroll
// ============================================================

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Impact", href: "#impact" },
  { label: "Transparency", href: "#transparency" },
  { label: "Universities", href: "#universities" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll-based glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -8, scaleY: 0.96 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.25,
          ease: "power2.out",
          transformOrigin: "top",
        }
      );
    }
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div
                className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center
                              group-hover:bg-accent transition-colors duration-300"
              >
                <span className="text-foreground font-bold text-sm tracking-tight">
                  NF
                </span>
              </div>
              <div
                className="absolute -inset-1 bg-primary/20 rounded-xl blur-sm opacity-0
                              group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="leading-tight">
              <p className="text-foreground font-semibold text-sm tracking-tight">
                NIDC Foundation
              </p>
              <p className="text-primary/70 text-[10px] tracking-widest uppercase">
                Education for All
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200
                           relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary
                                 group-hover:w-full transition-all duration-300"
                />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-foreground/80 hover:text-foreground text-sm transition-colors duration-200 px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="relative group px-5 py-2.5 bg-primary hover:bg-accent
                         text-foreground text-sm font-medium rounded-xl transition-all duration-300
                         shadow-lg shadow-primary/25 hover:shadow-primary/35"
            >
              Apply for Scholarship
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden text-foreground/80 hover:text-foreground transition-colors p-1"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`h-px bg-current transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-px bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border/60 px-6 py-6 space-y-4"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left text-foreground/80 hover:text-foreground text-base
                         transition-colors duration-200 py-2"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-border/60 flex flex-col gap-3">
            <Link
              href="/login"
              className="text-center text-foreground/80 text-sm py-3"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-center bg-primary hover:bg-accent text-foreground text-sm
                         font-medium rounded-xl py-3 transition-colors"
            >
              Apply for Scholarship
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
