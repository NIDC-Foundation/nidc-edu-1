"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./hero";
import { FIELDS } from "./course-data";
import FieldCard from "./field-card";

gsap.registerPlugin(ScrollTrigger);

const CourseClient = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const [activeField, setActiveField] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from(".courses-hero-item", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>(".courses-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef} className="min-h-screen bg-background text-foreground">
      <Hero />

      <section className="border-t border-border/70 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
                isActive={activeField === field.id}
                onToggle={() =>
                  setActiveField((prev) =>
                    prev === field.id ? null : field.id
                  )
                }
              />
            ))}
          </div>

          <div className="courses-reveal mt-10 rounded-2xl border border-border/70 bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t see your desired programme?{" "}
              <a
                href="mailto:apply@nidcfoundation.org"
                className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Contact our team
              </a>{" "}
              — we&apos;re adding new programmes and partners every quarter.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseClient;
