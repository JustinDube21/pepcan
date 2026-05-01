import Link from "next/link";

import { registerAction } from "../actions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  error?: string;
}>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <section className="content-page account-card auth-card">
      <span className="eyebrow">Research account</span>
      <h1>Create Account</h1>
      <p>Create a secure profile for account access and future order history.</p>

      {params.error ? <p className="form-message error">{params.error}</p> : null}

      <form className="account-form" action={registerAction}>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Password</span>
          <input name="password" type="password" autoComplete="new-password" minLength={8} required />
        </label>
        <button className="btn btn-primary btn-wide" type="submit">
          Register
        </button>
      </form>

      <p className="account-switch">
        Already registered? <Link href="/account/login">Log in</Link>
      </p>
    </section>
  );
}
