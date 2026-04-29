const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-105 w-[90vw] max-w-175 -translate-x-1/2 bg-[radial-gradient(ellipse,#10b98112_0%,transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="hero-item mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          About NIDC Foundation
        </p>

        <h1 className="hero-item mb-6 font-display text-4xl font-light leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          We exist because <br />
          <span className="text-primary">talent is universal</span>
          <br />
          but opportunity is not.
        </h1>

        <p className="hero-item mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          NIDC Foundation is a nonprofit scholarship platform that funds,
          tracks, and supports exceptional students from underserved communities
          — all the way from application to employment.
        </p>
      </div>
    </section>
  );
};

export default Hero;
