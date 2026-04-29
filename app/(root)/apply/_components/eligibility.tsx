import { ELIGIBILITY } from "./apply-data";

const Eligibility = () => {
  return (
    <section
      id="eligibility"
      className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="apply-reveal mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Eligibility
          </p>

          <h2 className="mb-4 font-display text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Who can apply?
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            We&apos;re looking for students who are brilliant but have been
            locked out by circumstance — not those who simply haven&apos;t
            worked hard enough.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ELIGIBILITY.map((item) => (
            <article
              key={item.title}
              className="apply-reveal rounded-2xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/15 sm:p-7"
            >
              <div className="mb-4 text-3xl" aria-hidden="true">
                {item.icon}
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground/80">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
