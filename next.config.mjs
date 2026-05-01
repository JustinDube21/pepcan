/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/about", destination: "/about.html" },
      { source: "/admin", destination: "/admin.html" },
      { source: "/cancel", destination: "/cancel.html" },
      { source: "/contact", destination: "/contact.html" },
      { source: "/data-sharing-opt-out", destination: "/data-sharing-opt-out.html" },
      { source: "/disclaimer", destination: "/disclaimer.html" },
      { source: "/faq", destination: "/faq.html" },
      { source: "/lab-testing-coa", destination: "/lab-testing-coa.html" },
      { source: "/payment", destination: "/payment.html" },
      { source: "/privacy", destination: "/privacy.html" },
      { source: "/products", destination: "/products.html" },
      { source: "/refund", destination: "/refund.html" },
      { source: "/research-blog", destination: "/research-blog.html" },
      { source: "/shipping", destination: "/shipping.html" },
      { source: "/success", destination: "/success.html" },
      { source: "/terms", destination: "/terms.html" },
      { source: "/collections", destination: "/collections/index.html" },
      { source: "/collections/:slug", destination: "/collections/:slug.html" },
      { source: "/pages/:slug", destination: "/pages/:slug/index.html" },
      { source: "/products/:slug", destination: "/products/:slug.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
