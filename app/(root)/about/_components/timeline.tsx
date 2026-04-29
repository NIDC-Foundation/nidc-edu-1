import React from "react";
import { MILESTONES } from "./about-data";

const Timeline = () => {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="scroll-reveal mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Our Story
          </p>

          <h2 className="font-display text-4xl font-light leading-tight text-foreground sm:text-5xl">
            How we got here
          </h2>
        </div>

        <ol className="relative space-y-6 sm:space-y-8">
          <div
            className="absolute bottom-0 left-5 top-0 w-px bg-linear-to-b from-emerald-500/40 via-emerald-500/20 to-transparent sm:left-6"
            aria-hidden="true"
          />

          {MILESTONES.map((milestone) => (
            <li
              key={milestone.year}
              className="scroll-reveal relative flex gap-5 pl-14 sm:gap-8 sm:pl-16"
            >
              <div className="absolute left-0 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-card sm:size-12">
                <span className="text-xs font-bold text-primary">
                  {milestone.year.slice(2)}
                </span>
              </div>

              <article className="flex-1 rounded-xl border border-border/70 bg-card p-5">
                <p className="mb-1 text-xs font-semibold text-primary">
                  {milestone.year}
                </p>

                <p className="text-sm leading-relaxed text-foreground/80">
                  {milestone.event}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
