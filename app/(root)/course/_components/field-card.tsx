import { DEMAND_COLOR, FIELD_COLORS } from "./course-data";
import ProgrammesPanel from "./programmes-panel";

type Programme = {
  title: string;
  duration: string;
  universities: string[];
};

type Field = {
  id: string;
  icon: string;
  name: string;
  color: string;
  desc: string;
  demand: string;
  programmes: Programme[];
};

type Props = {
  field: Field;
  isActive: boolean;
  onToggle: () => void;
};

const FieldCard = ({ field, isActive, onToggle }: Props) => {
  const contentId = `field-content-${field.id}`;
  const triggerId = `field-trigger-${field.id}`;

  return (
    <article className="courses-reveal">
      <button
        id={triggerId}
        aria-expanded={isActive}
        aria-controls={contentId}
        type="button"
        onClick={onToggle}
        className={`w-full rounded-2xl border bg-card p-6 text-left transition-all duration-300 hover:border-border sm:p-7 ${
          isActive ? FIELD_COLORS[field.color] : "border-border/70"
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <span className="text-3xl" aria-hidden="true">
            {field.icon}
          </span>

          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
              DEMAND_COLOR[field.demand]
            }`}
          >
            {field.demand} Demand
          </span>
        </div>

        <h2 className="mb-2 text-base font-semibold text-foreground">
          {field.name}
        </h2>

        <p className="mb-4 text-sm text-muted-foreground/80">{field.desc}</p>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground/70">
            {field.programmes.length} programmes
          </p>

          <span className="text-xs text-primary">
            {isActive ? "Hide programmes ↑" : "View programmes ↓"}
          </span>
        </div>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isActive}
      >
        <ProgrammesPanel programmes={field.programmes} />
      </div>
    </article>
  );
};

export default FieldCard;
