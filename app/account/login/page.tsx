import Link from "next/link";

import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  error?: string;
  message?: string;
  redirectedFrom?: string;
}>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <section className="content-page account-card auth-card">
      <span className="eyebrow">Secure account</span>
      <h1>Login</h1>
      <p>Access your PeptidesCanada account dashboard, profile details, and future order history.</p>

      {params.error ? <p className="form-message error">{params.error}</p> : null}
      {params.message ? <p className="form-message success">{params.message}</p> : null}
      {params.redirectedFrom ? <p className="form-message">Please log in to continue.</p> : null}

      <form className="account-form" action={loginAction}>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Password</span>
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <button className="btn btn-primary btn-wide" type="submit">
          Login
        </button>
      </form>

      <p className="account-switch">
        Need an account? <Link href="/account/register">Create one</Link>
      </p>
    </section>
  );
}
