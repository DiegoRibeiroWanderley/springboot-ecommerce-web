import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { executePayment } from "../../store/actions";

const Payment = () => {
  const dispatch = useDispatch();

  const handlePixPayment = () => {
    dispatch(executePayment());
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-96 text-center flex-row justify-center items-center">
        <button
          onClick={handlePixPayment}
          className="bg-pink-300 hover:bg-pink-400 transition-colors duration-400 text-white hover:cursor-pointer  rounded-md px-4 py-2 shadow-sm shadow-pink-400 font-semibold text-3xl"
        >
          Proceed to payment
        </button>
        <p>You will be redirected to the payment page</p>
      </div>
    </div>
  );
};

export default Payment;
