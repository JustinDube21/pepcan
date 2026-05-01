import Link from "next/link";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="promo-bar">
        <div>
          <span>NO CODE NEEDED - APPLIED AUTOMATICALLY</span>
          <span>COMPLIMENTARY SHIPPING ON ORDERS $249.99+ CAD</span>
          <span>NO CODE NEEDED - APPLIED AUTOMATICALLY</span>
          <span>COMPLIMENTARY SHIPPING ON ORDERS $249.99+ CAD</span>
        </div>
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="PeptidesCanada home">
          <img src="/assets/logo.svg" alt="PeptidesCanada" width="190" height="58" />
        </Link>
        <nav className="primary-nav account-nav" aria-label="Account navigation">
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/lab-testing-coa">Lab Testing</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
      <main className="account-shell">{children}</main>
      <footer className="site-footer account-footer">
        <div className="footer-bottom">
          <span>&copy; 2026 Peptides Canada. All rights reserved.</span>
          <span>Research use only. Not for human consumption.</span>
        </div>
      </footer>
    </>
  );
}
