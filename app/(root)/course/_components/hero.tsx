import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[90vw] max-w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse,#10b98110_0%,transparent_65%)]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="courses-hero-item mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Programmes
        </p>

        <h1 className="courses-hero-item mb-5 font-display text-4xl font-light leading-tight text-foreground sm:text-6xl">
          Choose your field.
          <br />
          <span className="text-primary">We fund the journey.</span>
        </h1>

        <p className="courses-hero-item mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          NIDC Foundation scholarships cover degree programmes across 6 fields
          of study at our partner universities.
        </p>
      </div>
    </section>
  );
};

export default Hero;
