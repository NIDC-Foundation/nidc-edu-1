import { TEAM } from "./about-data";

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2);
}

const Teams = () => {
  return  <section className="border-t border-border/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="scroll-reveal mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            The People
          </p>

          <h2 className="font-display text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Meet our team
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="scroll-reveal rounded-2xl border border-border/70 bg-card p-6 transition-colors duration-300 hover:border-border"
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/15 text-sm font-bold text-primary"
                  aria-hidden="true"
                >
                  {getInitials(member.name)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <span aria-label={`Country flag ${member.country}`}>
                      {member.country}
                    </span>
                  </div>

                  <p className="text-xs text-primary">{member.role}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground/80">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
};

export default Teams;
