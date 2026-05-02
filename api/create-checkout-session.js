const Stripe = require("stripe");
const { normalizeCartItems } = require("../lib/catalog");
const { json, readJson, siteUrl } = require("../lib/utils");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  if (!process.env.STRIPE_SECRET_KEY) {
    return json(res, 503, { error: "Stripe is not configured. Add STRIPE_SECRET_KEY in Vercel." });
  }

  try {
    const body = await readJson(req);
    const items = normalizeCartItems(body.items);
    const origin = siteUrl(req);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      // 🔥 Adresse de livraison OBLIGATOIRE
      shipping_address_collection: {
        allowed_countries: ["CA", "US"],
      },

      // 🔥 Adresse de facturation OBLIGATOIRE
      billing_address_collection: "required",

      // 🔥 Téléphone (optionnel mais utile)
      phone_number_collection: { enabled: true },

      allow_promotion_codes: true,

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,

      metadata: {
        source: "pepcan_static_storefront",
        subtotal_cents: String(subtotal),
        cart: JSON.stringify(
          items.map((item) => ({
            handle: item.handle,
            title: item.title,
            variant: item.variant,
            quantity: item.quantity,
            unitAmount: item.unitAmount,
          }))
        ).slice(0, 450),
      },

      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "cad",
          unit_amount: item.unitAmount,
          product_data: {
            name:
              item.variant === "1 vial"
                ? item.title
                : `${item.title} - ${item.variant}`,
            description: `${item.category} research-use-only product`,
            images: [`${origin}${item.image}`],
            metadata: {
              handle: item.handle,
              variant: item.variant,
            },
          },
        },
      })),
    });

    return json(res, 200, { url: session.url, id: session.id });
  } catch (error) {
    return json(res, 400, {
      error: error.message || "Unable to create Stripe Checkout session.",
    });
  }
};
