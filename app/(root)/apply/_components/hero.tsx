import { Link } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-105 w-[90vw] max-w-200 -translate-x-1/2 bg-[radial-gradient(ellipse,#10b98110_0%,transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="apply-hero-item mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Scholarship Applications
        </p>

        <h1 className="apply-hero-item mb-6 font-display text-4xl font-light leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Your education.
          <br />
          <span className="text-primary">Fully funded.</span>
        </h1>

        <p className="apply-hero-item mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Applications are open for the next intake. If you have the drive, NIDC
          Foundation will handle the rest — tuition, housing, stipend,
          mentorship, and job placement.
        </p>

        <div className="apply-hero-item flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-4 font-medium text-primary-foreground shadow-xl shadow-primary/25 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Your Application →
          </Link>

          <button
            type="button"
            onClick={() => {
              document
                .querySelector("#eligibility")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-2xl border border-border px-8 py-4 text-foreground/80 transition-colors hover:border-ring/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Check Eligibility
          </button>
        </div>

        <div className="apply-hero-item mt-8 inline-flex items-center gap-3 rounded-xl border border-amber-400/20 bg-amber-400/8 px-5 py-3">
          <span className="text-amber-400" aria-hidden="true">
            ⏰
          </span>
          <p className="text-sm text-amber-300">
            <span className="font-semibold">Next intake deadline:</span> Rolling
            applications — apply any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
