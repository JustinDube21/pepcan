const products = [
  { handle: "bacteriostatic-water-10ml", title: "Bacteriostatic Water 10ml", priceCents: 1499, image: "/assets/products/bacteriostatic-water-10ml.webp", category: "Reconstitution", kit: false, aliases: [] },
  { handle: "bpc-157", title: "BPC-157 10mg", priceCents: 4999, image: "/assets/products/bpc-157-10mg.webp", category: "Healing", kit: true, aliases: [] },
  { handle: "cjc-1295-10-mg", title: "CJC-1295 10mg", priceCents: 6999, image: "/assets/products/cjc-1295-10mg.webp", category: "Performance", kit: true, aliases: [] },
  { handle: "retatrutide-10mg", title: "Retatrutide 10mg", priceCents: 7999, image: "/assets/products/retatrutide-10mg.webp", category: "Metabolic", kit: true, aliases: [] },
  { handle: "tirzepatide-10mg", title: "Tirzepatide 10mg", priceCents: 5999, image: "/assets/products/tirzepatide-10mg.webp", category: "Metabolic", kit: true, aliases: [] },
  { handle: "tesamorelin-10mg", title: "Tesamorelin 10mg", priceCents: 8499, image: "/assets/products/tesamorelin-10mg.webp", category: "Performance", kit: true, aliases: ["tesamoralin-10mg"] },
  { handle: "sermorelin", title: "Sermorelin 10mg", priceCents: 6999, image: "/assets/products/sermorelin-10mg.webp", category: "Performance", kit: true, aliases: [] },
  { handle: "ipamorelin-10mg", title: "Ipamorelin 10mg", priceCents: 6999, image: "/assets/products/ipamorelin-10mg.webp", category: "Performance", kit: true, aliases: ["ipamoralin-10mg"] },
  { handle: "mots-c-10mg", title: "MOTS-c 10mg", priceCents: 4999, image: "/assets/products/mots-c-10mg.webp", category: "Metabolic", kit: true, aliases: [] },
  { handle: "ghk-cu-50mg", title: "GHK-Cu 50mg", priceCents: 4499, image: "/assets/products/ghk-cu-50mg.webp", category: "Anti-Aging", kit: true, aliases: [] },
  { handle: "selank-10mg", title: "Selank 10mg", priceCents: 4999, image: "/assets/products/selank-10mg.webp", category: "Nootropics", kit: true, aliases: [] },
  { handle: "semax-10mg", title: "Semax 10mg", priceCents: 4999, image: "/assets/products/semax-10mg.webp", category: "Nootropics", kit: true, aliases: [] },
  { handle: "melanotan-1-10mg", title: "Melanotan 1 10mg", priceCents: 5499, image: "/assets/products/melanotan-1-10mg.webp", category: "Tanning", kit: true, aliases: [] },
  { handle: "melanotan-2-10mg", title: "Melanotan 2 10mg", priceCents: 5499, image: "/assets/products/melanotan-2-10mg.webp", category: "Tanning", kit: true, aliases: [] },
  { handle: "tb-500", title: "TB-500 10mg", priceCents: 6499, image: "/assets/products/tb-500-10mg.webp", category: "Healing", kit: true, aliases: [] },
  { handle: "klow-blend-80mg", title: "Klow Blend 80mg", priceCents: 11999, image: "/assets/products/klow-blend-80mg.webp", category: "Premium Blend", kit: true, aliases: [] },
  { handle: "glow-blend-50mg", title: "Glow Blend 50mg", priceCents: 8999, image: "/assets/products/glow-blend-50mg.webp", category: "Premium Blend", kit: true, aliases: ["glow-blend-70mg"] }
];

const byHandle = new Map();
for (const product of products) {
  byHandle.set(product.handle, product);
  for (const alias of product.aliases || []) byHandle.set(alias, product);
}

function kitPriceCents(product) {
  return Math.floor((product.priceCents / 100) * 7) * 100 + 99;
}

function getProduct(handle) {
  return byHandle.get(String(handle || ""));
}

function normalizeCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cart items are required.");
  }

  return items.map((item) => {
    const product = getProduct(item.handle);
    if (!product) throw new Error("Unknown product in cart.");
    const variant = String(item.variant || "1 vial").trim() || "1 vial";
    const isKit = variant.toLowerCase().includes("kit");
    if (isKit && !product.kit) throw new Error(`${product.title} does not support kit checkout.`);
    const quantity = Math.max(1, Math.min(99, Number(item.quantity || 1)));
    const unitAmount = isKit ? kitPriceCents(product) : product.priceCents;
    return {
      handle: product.handle,
      title: product.title,
      variant,
      quantity,
      unitAmount,
      lineTotal: unitAmount * quantity,
      image: product.image,
      category: product.category
    };
  });
}

module.exports = { products, getProduct, normalizeCartItems, kitPriceCents };
