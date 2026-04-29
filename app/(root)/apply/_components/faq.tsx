"use client";

import { useState } from "react";
import { FAQS } from "./apply-data";

const Faq = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    
  return (
    <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="apply-reveal mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>

          <h2 className="font-display text-4xl font-light leading-tight text-foreground">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            const triggerId = `faq-trigger-${index}`;
            const contentId = `faq-content-${index}`;

            return (
              <article
                key={faq.q}
                className="apply-reveal overflow-hidden rounded-xl border border-border/70 bg-card"
              >
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-6"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {faq.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-lg text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                >
                  <div className="border-t border-border/60 px-5 pb-5 pt-4 sm:px-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
