import { VALUES } from "./about-data";

const Values = () => {
  return (
    <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="scroll-reveal mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            What We Stand For
          </p>

          <h2 className="font-display text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Our core values
          </h2>
        </div>

        <div className="cards-trigger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <article
              key={value.title}
              className="card-reveal rounded-2xl border border-border/70 bg-card p-6 transition-colors duration-300 hover:border-primary/20 sm:p-7"
            >
              <div className="mb-4 text-3xl" aria-hidden="true">
                {value.icon}
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground">
                {value.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground/80">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
