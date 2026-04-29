"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "./hero";
import ContactForm from "./contact-form";
import ContactChannels from "./contsct-channels";
import Office from "./office";

gsap.registerPlugin(ScrollTrigger);

const ContactClient = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(
      () => {
        gsap.from(".contact-hero-item", {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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

      <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-12">
          <ContactForm />

          <div className="space-y-8">
            <ContactChannels />
            <Office />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactClient;
