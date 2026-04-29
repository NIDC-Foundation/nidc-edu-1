"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "./hero";
import Eligibility from "./eligibility";
import Benefit from "./benefit";
import Steps from "./steps";
import Faq from "./faq";
import FinalCta from "./final-cta";

gsap.registerPlugin(ScrollTrigger);

const ApplyClient = () => {
      const container = useRef<HTMLDivElement>(null);

      useGSAP(
        () => {
          gsap.from(".hero-item", {
            opacity: 0,
            y: 28,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.15,
          });

          gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 30,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            });
          });
        },
        { scope: container }
    );
    
  return (
    <main
      ref={container}
      className="min-h-screen bg-background text-foreground"
    >
          <Hero />
          <Eligibility />
          <Benefit />
          <Steps />
          <Faq />
          <FinalCta />
    </main>
  );
};

export default ApplyClient;
