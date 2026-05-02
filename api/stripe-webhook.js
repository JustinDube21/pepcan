const Stripe = require("stripe");
const { json, readRaw, supabase } = require("../lib/utils");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed." });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(res, 503, { error: "STRIPE_SECRET_KEY is not configured." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const rawBody = await readRaw(req);

  let event;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        rawBody,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      event = JSON.parse(rawBody.toString("utf8"));
    }
  } catch (error) {
    return json(res, 400, {
      error: `Webhook signature verification failed: ${error.message}`,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const items = safeParseCart(session.metadata?.cart);
    const subtotal = Number(session.amount_total || session.metadata?.subtotal_cents || 0) / 100;

    try {
      await supabase("orders?on_conflict=stripe_session_id", {
        method: "POST",
        headers: {
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          stripe_session_id: session.id,

          customer_name:
            session.customer_details?.name ||
            session.shipping_details?.name ||
            null,
          customer_email: session.customer_details?.email || null,
          customer_phone: session.customer_details?.phone || null,

          status: "paid",
          subtotal,
          currency: String(session.currency || "cad").toUpperCase(),

          shipping_name: session.shipping_details?.name || null,
          shipping_address: session.shipping_details?.address || null,

          billing_name: session.customer_details?.name || null,
          billing_address: session.customer_details?.address || null,

          items,
          metadata: session,
        }),
      });

      console.log("Order saved in Supabase:", session.id);
    } catch (error) {
      console.error("Unable to persist Stripe order", error);
    }
  }

  return json(res, 200, { received: true });
};

function safeParseCart(value) {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}
