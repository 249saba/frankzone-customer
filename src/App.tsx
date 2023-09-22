// import React,{useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import "./App.scss";
import { ToastContainer } from "react-toastify";
import AppRouting from "./appRouting";
// import { decrement, increment } from './redux/counter';
// import CustomButton from './shared/components/customButton';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51LZqzlFZdDeSTEkpAjOyEeEk3CNIkeyRyv8HLwL3Caj8xj2wwCNaungOnLLO9ji02CX5DPaCVJCqyHy5dacmj5aE00J4kJkaz1"
  );

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <AppRouting />
      </Elements>
      <ToastContainer />
    </div>
  );
};

export default App;
