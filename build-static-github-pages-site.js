const fs = require("fs");
const path = require("path");

const root = __dirname;
const output = path.join(root, "github-pages-static-site-complete");
const include = [
  "api",
  "assets",
  "collections",
  "lib",
  "pages",
  "products",
  "scripts",
  "404.html",
  "about.html",
  "admin.html",
  "cancel.html",
  "contact.html",
  "data-sharing-opt-out.html",
  "disclaimer.html",
  "faq.html",
  "index.html",
  "lab-testing-coa.html",
  "package.json",
  "payment.html",
  "privacy.html",
  "products.html",
  "README.md",
  "refund.html",
  "research-blog.html",
  "robots.txt",
  "script.js",
  "shipping.html",
  "sitemap.xml",
  "style.css",
  "success.html",
  "supabase-schema.sql",
  "terms.html",
  "vercel.json"
];

function assertInside(parent, child) {
  const parentPath = path.resolve(parent).toLowerCase();
  const childPath = path.resolve(child).toLowerCase();
  if (!childPath.startsWith(parentPath)) throw new Error(`Refusing to write outside workspace: ${child}`);
}

function copyRecursive(source, destination) {
  if (!fs.existsSync(source)) return;
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) copyRecursive(path.join(source, entry), path.join(destination, entry));
    return;
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

assertInside(root, output);
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const item of include) copyRecursive(path.join(root, item), path.join(output, item));

console.log(`Static storefront exported to ${output}`);
