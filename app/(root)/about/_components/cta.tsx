import Link from "next/link";

const Cta = () => {
  return (
    <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="scroll-reveal mx-auto max-w-2xl text-center">
        <h2 className="mb-5 font-display text-3xl font-light text-foreground sm:text-4xl">
          Ready to be part of the story?
        </h2>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/apply"
            className="rounded-2xl bg-primary px-8 py-4 font-medium text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Apply for a Scholarship
          </Link>

          <Link
            href="/donate"
            className="rounded-2xl border border-border px-8 py-4 text-foreground/80 transition-colors hover:border-ring/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Support a Student
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
