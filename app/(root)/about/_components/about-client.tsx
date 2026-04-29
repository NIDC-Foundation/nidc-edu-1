"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/app/(root)/about/_components/Hero";
import MissionVision from "@/app/(root)/about/_components/mission-vision";
import Timeline from "@/app/(root)/about/_components/timeline";
import Values from "@/app/(root)/about/_components/values";
import Teams from "@/app/(root)/about/_components/teams";
import Cta from "@/app/(root)/about/_components/cta";

gsap.registerPlugin(ScrollTrigger);

const AboutClient = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-item", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.from(".card-reveal", {
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cards-trigger",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef} className="min-h-screen bg-background text-foreground">
      <Hero />
      <MissionVision />
      <Timeline />
      <Values />
      <Teams />
      <Cta />
    </main>
  );
};

export default AboutClient;
