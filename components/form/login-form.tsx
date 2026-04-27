"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield } from "lucide-react";
import { createClient } from "@/lib/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/validation/auth";
import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import z from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema) => {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      setError("root", { message: error.message });
      return;
    }

    router.push("/protected");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl grid md:grid-cols-2 border border-border/50 rounded-xl overflow-hidden shadow-sm">
        {/* ── Left: Brand Panel ── */}
        <div className="bg-foreground p-10 flex-col justify-between hidden md:flex">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">
                N
              </span>
            </div>
            <span className="text-background font-bold text-sm tracking-tight">
              National Talent Initiative
            </span>
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 mb-4">
              <span className="inline-block w-5 h-px bg-primary" />
              Secure Portal
            </p>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-background mb-3">
              Shaping Nigeria&apos;s future,{" "}
              <span className="text-background/50 font-medium">
                one scholar at a time.
              </span>
            </h2>
            <p className="text-sm text-background/45 leading-relaxed">
              Access your dashboard to track applications, funding status, and
              programme milestones.
            </p>
          </div>

          <div className="flex divide-x divide-background/10 border-t border-background/10 pt-5">
            {[
              { value: "5,000+", label: "Scholars" },
              { value: "36", label: "States" },
              { value: "98%", label: "Employed" },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex-1 ${
                  i === 0 ? "pr-4" : i === 2 ? "pl-4" : "px-4"
                }`}
              >
                <div className="text-lg font-bold text-background tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="text-xs text-background/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background p-8 md:p-10 flex flex-col justify-center gap-6">
          {/* Mobile logo */}
          <Link href="/" className="flex md:hidden items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                N
              </span>
            </div>
            <span className="font-bold text-sm tracking-tight">
              National Talent Initiative
            </span>
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Welcome back
            </p>
            <h1 className="text-xl font-bold tracking-tight">
              Sign in to your portal
            </h1>
          </div>

        
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="email"
                control={control}
                label="Email"
                type="email"
                autoComplete="email"
                icon={Mail}
              />

              <FormField
                name="password"
                control={control}
                label={
                  <div className="flex items-center justify-between w-full">
                    <span>Password</span>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                }
                isPassword
                autoComplete="current-password"
                icon={Lock}
              />

              {errors.root && (
                <p className="text-sm text-red-500">{errors.root.message}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Security note */}
            <div className="flex items-start gap-2.5 border-t border-border/50 pt-5">
              <Shield className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                End-to-end encrypted. Never share your password with anyone,
                including NTDI staff.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-primary font-semibold underline"
                >
                  Create one
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                By signing in you agree to our{" "}
                <Link href="/terms" className="hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
