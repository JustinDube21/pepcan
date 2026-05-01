import { redirect } from "next/navigation";

import { createAdminClient } from "../../utils/supabase/admin";
import { createClient } from "../../utils/supabase/server";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

type UserProfile = {
  id: string;
  email: string | null;
  created_at: string | null;
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/login");
  }

  let { data: profile } = await supabase
    .from("users_profiles")
    .select("id,email,created_at")
    .eq("id", user.id)
    .maybeSingle<UserProfile>();

  if (!profile && user.email) {
    const admin = createAdminClient();
    const { data } = await admin
      .from("users_profiles")
      .upsert({ id: user.id, email: user.email }, { onConflict: "id" })
      .select("id,email,created_at")
      .maybeSingle<UserProfile>();
    profile = data;
  }

  return (
    <section className="content-page account-dashboard">
      <div className="account-dashboard-head">
        <div>
          <span className="eyebrow">Account dashboard</span>
          <h1>Your Account</h1>
          <p>Manage your PeptidesCanada account profile and future order history.</p>
        </div>
        <form action={logoutAction}>
          <button className="btn btn-secondary" type="submit">
            Logout
          </button>
        </form>
      </div>

      <div className="account-grid">
        <article className="account-panel">
          <span className="eyebrow">Authenticated user</span>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{user.email || "Not available"}</dd>
            </div>
            <div>
              <dt>User ID</dt>
              <dd>{user.id}</dd>
            </div>
          </dl>
        </article>

        <article className="account-panel">
          <span className="eyebrow">Profile record</span>
          {profile ? (
            <dl>
              <div>
                <dt>Profile email</dt>
                <dd>{profile.email || "Not available"}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{profile.created_at ? new Date(profile.created_at).toLocaleString() : "Not available"}</dd>
              </div>
            </dl>
          ) : (
            <p>No profile record found yet.</p>
          )}
        </article>

        <article className="account-panel account-panel-wide">
          <span className="eyebrow">Future order linking</span>
          <h2>Order history ready</h2>
          <p>
            The database schema now includes a user link for orders, so future checkout records can be associated with
            this authenticated account.
          </p>
        </article>
      </div>
    </section>
  );
}
