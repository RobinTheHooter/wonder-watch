import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";

const stripePromise = loadStripe(
  "pk_test_51LlALTSAI4LFiHZe8zpGGMNCGdwtAe5Tcra6x40nfLFdTAMk9MfSlhG2EjFqQsX3zJWnyY7Zd9HZfINgDhivWIPX00Gg6cQhQo"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items } = useCart();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const paymentElement = elements.getElement(PaymentElement);

    const payload = await stripe.createToken(paymentElement);

    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };

    console.log(allFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        namae="shippingAddress"
        placeholder="Shipping Address"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        namae="city"
        placeholder="City"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        namae="state"
        placeholder="State"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        namae="pin"
        placeholder="PIN Code"
        onChange={handleChange}
        required
      />
      <PaymentElement />
      <button
        className="btn blue"
        type="submit"
        disabled={!stripe || !elements}
      >
        Pay
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
