const session = await stripe.checkout.sessions.create({
  mode: "payment",

  customer_creation: "always",

  customer_email: body.email || undefined,

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
    source: "pepcan_static_storefront",
    subtotal_cents: String(subtotal), // ✅ FIX ICI
    user_id: body.userId || "guest",
    shipping_enabled: "true",

    cart: JSON.stringify(
      items.map((item) => ({
        handle: item.handle,
        title: item.title,
        variant: item.variant,
        quantity: item.quantity,
        unitAmount: item.unitAmount,
      }))
    ).slice(0, 400),
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
