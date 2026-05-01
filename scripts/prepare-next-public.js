const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

const staticDirectories = ["assets", "collections", "pages", "products"];
const staticFiles = [
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
  "payment.html",
  "privacy.html",
  "products.html",
  "refund.html",
  "research-blog.html",
  "robots.txt",
  "script.js",
  "shipping.html",
  "sitemap.xml",
  "style.css",
  "success.html",
  "terms.html",
];

function assertInside(parent, child) {
  const parentPath = path.resolve(parent).toLowerCase();
  const childPath = path.resolve(child).toLowerCase();
  if (!childPath.startsWith(parentPath)) {
    throw new Error(`Refusing to write outside workspace: ${child}`);
  }
}

function copyRecursive(source, destination) {
  if (!fs.existsSync(source)) return;
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

assertInside(root, publicDir);
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

for (const directory of staticDirectories) {
  copyRecursive(path.join(root, directory), path.join(publicDir, directory));
}

for (const file of staticFiles) {
  copyRecursive(path.join(root, file), path.join(publicDir, file));
}

console.log(`Prepared Next.js public assets in ${publicDir}`);
