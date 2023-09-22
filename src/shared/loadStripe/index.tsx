import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./loadStripe";

const StripeElement = ({handleSubmitCard}:any) => {
  const stripePromise = loadStripe(
    "pk_test_51LZqzlFZdDeSTEkpAjOyEeEk3CNIkeyRyv8HLwL3Caj8xj2wwCNaungOnLLO9ji02CX5DPaCVJCqyHy5dacmj5aE00J4kJkaz1"
  );
  return (
    // <Elements stripe={stripePromise}>
      <PaymentForm handleSubmitCard={handleSubmitCard}/>
    // </Elements>
  );
};

export default StripeElement;
