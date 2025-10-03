import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPortalSession(event) {
  const { customerId } = event.body;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.DOMAIN,
    });

    return {
      statusCode: 303,
      headers: { Location: portalSession.url },
      body: '',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
}
