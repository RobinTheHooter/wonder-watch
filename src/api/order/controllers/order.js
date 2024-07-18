"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    console.log(ctx.request.body);
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
