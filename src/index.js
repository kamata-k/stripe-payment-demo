import 'dotenv/config';
import express from 'express';
import { createCheckoutSession } from './handlers/checkout.js';
import { createPortalSession } from './handlers/portal.js';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Checkout
app.post('/create-checkout-session', async (req, res) => {
  const response = await createCheckoutSession({ body: req.body });
  res.status(response.statusCode).set(response.headers || {}).send(response.body);
});

// Customer Portal
app.post('/create-portal-session', async (req, res) => {
  const response = await createPortalSession({ body: req.body });
  res.status(response.statusCode).set(response.headers || {}).send(response.body);
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
