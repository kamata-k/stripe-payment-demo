import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(event) {
  const { lookup_key } = event.body;

  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    expand: ['data.product'],
  });

  const price = prices.data[0];
  if (!price) {
    return { statusCode: 400, body: 'Price not found' };
  }

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [{ price: price.id, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/cancel.html`,
  });

  return {
    statusCode: 303,
    headers: { Location: session.url },
    body: '',
  };
}
