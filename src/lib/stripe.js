import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1TiXPXAUV7mfEugl2eK57bwh",
  seeker_premium: "price_1TiYXVAUV7mfEugl76HZ66Ch",
  recruiter_growth: "price_1TiYYcAUV7mfEugl5moA6Uc2",
  recruiter_enterprise: "price_1TiYZoAUV7mfEuglfqR3NvTD",
};
