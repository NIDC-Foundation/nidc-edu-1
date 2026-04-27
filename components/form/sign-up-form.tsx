"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "@/lib/validation/auth";

import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { GraduationCap, Lock, Shield } from "lucide-react";
import { FieldGroup } from "../ui/field";
import z from "zod";

type SignupValues = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const supabase = createClient();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/protected`,
      },
    });

    if (error) {
      setError("root", { message: error.message });
      return;
    }

    router.push("/auth/sign-up-success");
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-3xl grid md:grid-cols-[5fr_7fr] border border-border/50 rounded-xl overflow-hidden shadow-sm my-8 md:my-0">
        {/* ── Left: Brand Panel ── */}
        <div className="bg-foreground p-8 md:p-10 hidden md:flex flex-col gap-8 justify-between">
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
              Join the Initiative
            </p>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-background mb-2">
              Start your application{" "}
              <span className="text-background/40 font-medium">
                and make an impact.
              </span>
            </h2>
          </div>

          <div className="flex flex-col border-t border-background/10">
            <div className="flex items-start gap-3 py-4 opacity-100">
              <div className="h-7 w-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 bg-primary/20">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold capitalize mb-0.5 text-background">
                  Applicant
                </p>
                <p className="text-xs text-background/40 leading-relaxed">
                  Apply for scholarship funding and university placement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Form Panel ── */}
        <div className="bg-background p-8 md:p-10 flex flex-col gap-5">
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
              Create your account
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Start your application for education support and national impact.
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="transition-opacity duration-200 opacity-100"
          >
            <fieldset>
              <FieldGroup>
                <FormField
                  name="email"
                  control={control}
                  label="Email"
                  type="email"
                  autoComplete="email"
                />

                <FormField
                  name="password"
                  control={control}
                  label="Password"
                  isPassword
                  autoComplete="new-password"
                  icon={Lock}
                />

                <FormField
                  name="confirmPassword"
                  control={control}
                  label="Repeat Password"
                  isPassword
                  autoComplete="new-password"
                  icon={Shield}
                />

                <FormField
                  name="terms"
                  control={control}
                  type="checkbox"
                  label={
                    <>
                      I agree to the{" "}
                      <Link href="/terms" className="underline hover:no-underline">
                        Terms of Service
                      </Link>
                    </>
                  }
                />

                {/* Root error */}
                {errors.root && (
                  <p className="text-sm text-red-500">{errors.root.message}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Sign up"}
                </Button>
              </FieldGroup>
            </fieldset>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
