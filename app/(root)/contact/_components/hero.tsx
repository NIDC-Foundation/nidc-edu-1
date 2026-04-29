import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-100 w-[90vw] max-w-150 -translate-x-1/2 bg-[radial-gradient(ellipse,#10b98110_0%,transparent_65%)]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="contact-hero-item mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Get In Touch
        </p>

        <h1 className="contact-hero-item mb-5 font-display text-4xl font-light leading-tight text-foreground sm:text-6xl">
          We&apos;d love to
          <br />
          <span className="text-primary">hear from you.</span>
        </h1>

        <p className="contact-hero-item mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Whether you&apos;re a student, donor, university partner, or journalist —
          there&apos;s always someone on the NIDC team ready to talk.
        </p>
      </div>
    </section>
  );
};

export default Hero;
