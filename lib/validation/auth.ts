// lib/validations/auth.ts
import { z } from "zod";

// --- Reusable password rules ---
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must include at least one uppercase letter")
  .regex(/[a-z]/, "Must include at least one lowercase letter")
  .regex(/[0-9]/, "Must include at least one number")
  .regex(/[^A-Za-z0-9]/, "Must include at least one special character");

// --- Email (slightly stricter than default) ---
const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(5)
  .max(254)
  .refine((val) => !val.includes(" "), "Email must not contain spaces");

// ✅ SIGNUP
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms to continue.",
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

// ✅ LOGIN (lighter rules, don’t over-restrict login)
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
