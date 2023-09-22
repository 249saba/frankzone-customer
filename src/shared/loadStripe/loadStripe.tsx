import { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import "./stripe.css";
import { useMemo } from "react";
import CustomCard from "../cards/customCard";
import CustomButton from "../customButton";
import { backendCall } from "../utils/backendService/backendCall";
import { handleToastMessage } from "../toastify";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          border: "1px solid black",
          color: "black",
          letterSpacing: "0.025em",
          padding: "5px",
          "::placeholder": {
            color: "#00000057",
          },
          marginTop: "20px",
        },
        invalid: {
          color: "#9e2146",
        },
        border: "2px solid black",
      },
    }),
    []
  );

  return options;
};
const CardInputWrapper = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 8px;
  padding: 15px 10px;
  margin-top: 16px;
  width: 100%;
`;
function PaymentForm({ handleSubmitCard }: any) {
  const navigate = useNavigate();
  const stripe: any = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod }: any = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error: ==", error, paymentMethod);
      handleToastMessage("error", error?.message);
    } else {
      // You can send the paymentMethod.id to your server for further processing.
      console.log("Payment Method: ==", paymentMethod);

      handleSubmitCard(paymentMethod?.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-8">
      <CardInputWrapper>
        <CardNumberElement options={options} />
      </CardInputWrapper>

      <div className="flex">
        <CardInputWrapper className="mr-2">
          <CardExpiryElement options={options} />
        </CardInputWrapper>

        <CardInputWrapper className="ml-2">
          <CardCvcElement options={options} />
        </CardInputWrapper>
      </div>
      <div className="flex justify-end mt-8 ">
        <CustomButton
          label={"Save & Continue"}
          type="submit"
          variant={"outlined"}
          disabled={!stripe}
          styleClass={"btn-white w-[200px] !rounded-full !font-medium "}
        />
      </div>
    </form>
  );
}

export default PaymentForm;
