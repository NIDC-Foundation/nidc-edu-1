"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
     const [formState, setFormState] = useState<FormState>(INITIAL_STATE);

     const [loading, setLoading] = useState(false);
     const [sent, setSent] = useState(false);

     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();

       setLoading(true);

       await new Promise((resolve) => setTimeout(resolve, 1200));

       setLoading(false);
       setSent(true);
     }

  return (
    <section className="contact-reveal">
      <h2 className="mb-8 font-display text-3xl font-light text-foreground">
        Send us a message
      </h2>

      {sent ? (
        <div
          role="status"
          className="rounded-2xl border border-primary/30 bg-primary/10 p-10 text-center"
        >
          <p className="mb-4 text-4xl" aria-hidden="true">
            ✅
          </p>

          <p className="mb-2 text-lg font-semibold text-foreground">
            Message received!
          </p>

          <p className="text-sm text-muted-foreground">
            We&apos;ll get back to you within 1–2 business days.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              key: "name",
              label: "Your name",
              type: "text",
              placeholder: "Full name",
            },
            {
              key: "email",
              label: "Email address",
              type: "email",
              placeholder: "you@example.com",
            },
            {
              key: "subject",
              label: "Subject",
              type: "text",
              placeholder: "What is this about?",
            },
          ].map((field) => (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="mb-1.5 block text-sm text-muted-foreground"
              >
                {field.label}
              </label>

              <input
                id={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={formState[field.key as keyof FormState]}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border/80 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm text-muted-foreground"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={5}
              placeholder="Tell us how we can help..."
              value={formState.message}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              className="w-full resize-none rounded-xl border border-border/80 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      )}
    </section>
  );
};

export default ContactForm;
