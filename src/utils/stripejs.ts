import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise:Promise<Stripe|null>;

const getStripe = () => {
  stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY!);
  return stripePromise;
};

export default getStripe;
