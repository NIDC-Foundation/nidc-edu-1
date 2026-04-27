"use client";

import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type BaseProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
};

type InputProps<T extends FieldValues> = BaseProps<T> & {
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  isPassword?: boolean;
};

type CheckboxProps<T extends FieldValues> = BaseProps<T> & {
  type: "checkbox";
};

type Props<T extends FieldValues> = InputProps<T> | CheckboxProps<T>;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export function FormField<T extends FieldValues>(props: Props<T>) {
  const { name, control, label, icon: Icon } = props;

  const isCheckbox = props.type === "checkbox";
  const isPassword = !isCheckbox && (props as InputProps<T>).isPassword;

  const [visible, setVisible] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={props.className}>
          {/* LABEL */}
          {label && !isCheckbox && (
            <FieldLabel htmlFor={name} className="text-xs">
              {label}
            </FieldLabel>
          )}

          {/* CHECKBOX */}
          {isCheckbox ? (
            <div className="flex items-start gap-3 pt-0.5">
              <input
                id={name}
                type="checkbox"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                className="mt-1 accent-primary"
              />

              <label
                htmlFor={name}
                className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer"
              >
                {label}
              </label>

              {fieldState.error && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs mt-1"
                />
              )}
            </div>
          ) : (
            /* INPUT */
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              )}

              <Input
                {...field}
                id={name}
                type={
                  isPassword
                    ? visible
                      ? "text"
                      : "password"
                    : props.type || "text"
                }
                placeholder={(props as InputProps<T>).placeholder}
                autoComplete={(props as InputProps<T>).autoComplete}
                className={cn(
                  "h-9 text-sm",
                  Icon && "pl-8",
                  isPassword && "pr-10"
                )}
                aria-invalid={fieldState.invalid}
              />

              {/* PASSWORD TOGGLE */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setVisible((v) => !v)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                  aria-label={visible ? "Hide password" : "Show password"}
                >
                  {visible ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              )}

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} className="text-xs" />
              )}
            </div>
          )}
        </Field>
      )}
    />
  );
}
