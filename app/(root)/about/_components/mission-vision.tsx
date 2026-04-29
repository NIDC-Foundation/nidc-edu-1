const ITEMS = [
  {
    tag: "Our Mission",
    headline: "Fund the unfunded.",
    body: "We identify students with exceptional academic potential who cannot access university due to financial barriers. We connect them with partner universities, fund their education completely, and support them through to graduation and first employment.",
    className: "text-primary",
  },
  {
    tag: "Our Vision",
    headline: "A continent of educated leaders.",
    body: "We envision an Africa where every brilliant young person — regardless of their postcode, family income, or circumstance of birth — has an equal shot at a world-class education and a fulfilling career.",
    className: "text-amber-400",
  },
] as const;

const MissionVision = () => {
  return (
    <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-10">
        {ITEMS.map((item) => (
          <article
            key={item.tag}
            className="scroll-reveal rounded-2xl border border-border/70 bg-card p-6 sm:p-10"
          >
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-widest ${item.className}`}
            >
              {item.tag}
            </p>

            <h2 className="mb-5 font-display text-3xl font-light leading-tight text-foreground sm:text-4xl">
              {item.headline}
            </h2>

            <p className="leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
