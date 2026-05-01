"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createAdminClient } from "../../utils/supabase/admin";
import { createClient } from "../../utils/supabase/server";

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value || "").trim().toLowerCase();
}

function normalizePassword(value: FormDataEntryValue | null) {
  return String(value || "");
}

async function siteOrigin() {
  const headerStore = await headers();
  return headerStore.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://peptidescanada.store";
}

export async function loginAction(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = normalizePassword(formData.get("password"));

  if (!email || !password) {
    redirectWithError("/account/login", "Email and password are required.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectWithError("/account/login", error.message);
  }

  redirect("/account");
}

export async function registerAction(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = normalizePassword(formData.get("password"));

  if (!email || !password) {
    redirectWithError("/account/register", "Email and password are required.");
  }

  if (password.length < 8) {
    redirectWithError("/account/register", "Password must be at least 8 characters.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${await siteOrigin()}/account`,
    },
  });

  if (error) {
    redirectWithError("/account/register", error.message);
  }

  if (data.user) {
    const admin = createAdminClient();
    const { error: profileError } = await admin
      .from("users_profiles")
      .upsert({ id: data.user.id, email }, { onConflict: "id" });

    if (profileError) {
      redirectWithError("/account/register", "Account created, but profile setup failed. Please contact support.");
    }
  }

  if (data.session) {
    redirect("/account");
  }

  redirect("/account/login?message=Account created. Please confirm your email, then log in.");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/account/login?message=Signed out securely.");
}
