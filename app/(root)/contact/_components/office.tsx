import React from "react";
import { OFFICES } from "./contact-data";

const Office = () => {
  return (
    <section className="contact-reveal">
      <h2 className="mb-5 text-base font-semibold text-foreground">
        Our offices
      </h2>

      <div className="space-y-3">
        {OFFICES.map((office) => (
          <article
            key={office.city}
            className="rounded-xl border border-border/70 bg-card px-5 py-4"
          >
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium text-foreground">
                {office.city}, {office.country}
              </h3>

              <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {office.type}
              </span>
            </div>

            <p className="text-xs text-muted-foreground/80">{office.address}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Office;
