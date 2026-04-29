type Programme = {
  title: string;
  duration: string;
  universities: string[];
};

type Props = {
  programmes: Programme[];
};

const ProgrammesPanel = ({ programmes }: Props) => {
  return (
    <div className="mt-3 space-y-2">
      {programmes.map((programme) => (
        <article
          key={programme.title}
          className="rounded-xl border border-border/70 bg-card p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {programme.title}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground/80">
                {programme.duration}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {programme.universities.map((university) => (
              <span
                key={university}
                className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {university}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProgrammesPanel;
