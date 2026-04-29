import React from "react";
import { STEPS } from "./apply-data";

const Steps = () => {
  return (
    <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="apply-reveal mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            The Process
          </p>

          <h2 className="font-display text-4xl font-light leading-tight text-foreground">
            4 steps to your scholarship
          </h2>
        </div>

        <ol className="space-y-4">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="apply-reveal flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/15 sm:gap-5 sm:p-6"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/15 text-sm font-bold text-primary">
                {step.n}
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground/80">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Steps;
