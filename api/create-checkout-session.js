const Stripe = require("stripe");
const { normalizeCartItems } = require("../lib/catalog");
const { json, readJson, siteUrl } = require("../lib/utils");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed." });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(res, 503, {
      error: "Stripe not configured",
    });
  }

  try {
    const body = await readJson(req);

    // ✅ VALIDATION (TRÈS IMPORTANT)
    if (!body || !body.items || !Array.isArray(body.items)) {
      return json(res, 400, {
        error: "Invalid cart data",
      });
    }

    const items = normalizeCartItems(body.items);
    const origin = siteUrl(req);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const subtotal = items.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_creation: "always",

      customer_email: body.email ?? undefined,

      shipping_address_collection: {
        allowed_countries: ["CA", "US"],
      },

      billing_address_collection: "required",

      phone_number_collection: {
        enabled: true,
      },

      allow_promotion_codes: true,

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,

      metadata: {
        source: "pepcan",
        subtotal_cents: String(subtotal), // ✅ OK
        user_id: body.userId || "guest",

        cart: JSON.stringify(items).slice(0, 400),
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
            images: [`${origin}${item.image}`],
          },
        },
      })),
    });

    return json(res, 200, {
      url: session.url,
    });

  } catch (error) {
    console.error("STRIPE ERROR:", error);

    return json(res, 500, {
      error: error.message,
    });
  }
};
