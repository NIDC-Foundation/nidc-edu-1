import Link from "next/link";
import { CONTACTS } from "./contact-data";

const ContactChannels = () => {
  return (
    <section className="contact-reveal">
      <h2 className="mb-5 text-base font-semibold text-foreground">
        Contact by email
      </h2>

      <div className="space-y-3">
        {CONTACTS.map((contact) => (
          <Link
            key={contact.label}
            href={`mailto:${contact.value}`}
            className="group flex items-center gap-4 rounded-xl border border-border/70 bg-card px-5 py-4 transition-colors hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="text-xl" aria-hidden="true">
              {contact.icon}
            </span>

            <div>
              <p className="text-xs text-muted-foreground">{contact.label}</p>

              <p className="text-sm text-foreground transition-colors group-hover:text-primary">
                {contact.value}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContactChannels;
