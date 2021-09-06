const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const newItemFormat = items.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: newItemFormat,
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_rates: ["shr_1JWfkUSFzanhMoUwsGGuLbnz"],
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email: email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({
    id: session.id,
  });
};
