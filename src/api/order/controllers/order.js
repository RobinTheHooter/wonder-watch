/* eslint-disable quotes */
"use strict";

/**
 *  order controller
 */
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECREY_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { amount, shippingAddress, city, state, pin, token, items } =
      ctx.request.body;

    await stripe.charges.create({
      amount: amount * 100,
      currency: "INR",
      source: token,
      description: `order by user ${ctx.state.user.email}`,
    });

    const order = await strapi.db.query("api::order.order").create({
      data: {
        shippingAddress,
        city,
        state,
        pin,
        amount,
        items,
        user: ctx.state.user.email,
      },
    });
    return order;
  },
}));
