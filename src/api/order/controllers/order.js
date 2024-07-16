"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { amount, shippingAddress, city, state, pin, token } =
      ctx.request.body;

    await stripe.charges.create({
      amount: amount * 100,
      currency: "INR",
      source: token,
      description: `order by user ${ctx.state.user.email}`,
    });

    await strapi.db.query("api::order.order").create({
      data: {
        shippingAddress,
        city,
        state,
        pin,
        amount,
      },
    });
  },
}));
