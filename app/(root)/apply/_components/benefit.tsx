import { BENEFITS } from "./apply-data";

const Benefit = () => {
  return (
    <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="apply-reveal mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            The Package
          </p>

          <h2 className="font-display text-4xl font-light leading-tight text-foreground sm:text-5xl">
            What you receive
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((item) => (
            <article
              key={item.label}
              className="apply-reveal flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-6"
            >
              <div className="mt-1 shrink-0" aria-hidden="true">
                <div className="size-2 rounded-full bg-primary" />
              </div>

              <div>
                <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.label}
                  </h3>
                  <p className="text-sm font-bold text-primary">{item.value}</p>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground/80">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefit;
