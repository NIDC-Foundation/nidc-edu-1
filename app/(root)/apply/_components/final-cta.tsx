import Link from "next/link";

const FinalCta = () => {
  return (
    <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="apply-reveal mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-display text-3xl font-light text-foreground sm:text-4xl">
          Ready to apply?
        </h2>

        <p className="mb-8 text-muted-foreground">
          It takes 10 minutes. Your future could be on the other side.
        </p>

        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-4 font-medium text-primary-foreground shadow-xl shadow-primary/25 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Start Application →
        </Link>

        <p className="mt-4 text-xs text-muted-foreground/70">
          Questions? Email us at{" "}
          <Link
            href="mailto:apply@nidcfoundation.org"
            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            apply@nidcfoundation.org
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FinalCta;
