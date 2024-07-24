import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { BACKEND_URL } from "../Helpers";

const stripePromise = loadStripe(
  "pk_test_51LlALTSAI4LFiHZe8zpGGMNCGdwtAe5Tcra6x40nfLFdTAMk9MfSlhG2EjFqQsX3zJWnyY7Zd9HZfINgDhivWIPX00Gg6cQhQo"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items, emptyCart } = useCart();
  const [formData, setFormData] = useState({});
  const [payBtn, setPayBtn] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const makePaymentRequest = async (allFormData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(allFormData),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
      setError(true);
      alert("payment failed");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const payload = await stripe.createToken(cardElement);

    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };
    setPaymentProcessing(true);
    await makePaymentRequest(allFormData);
    setDone(true);
    setPaymentProcessing(false);
    emptyCart();
  };

  if (error) return <h1 className="red-text">Payment failed</h1>;
  if (done) return <h1 className="green-text">Payment done successfully</h1>;
  if (paymentProcessing) {
    return <h1>Payment is processing...</h1>;
  }

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
      <CardElement
        onChange={(e) => {
          if (e.complete) {
            setPayBtn(false);
          } else {
            setPayBtn(true);
          }
        }}
      />
      <br />
      <button
        className="btn blue"
        type="submit"
        disabled={!stripe || !elements || payBtn}
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
