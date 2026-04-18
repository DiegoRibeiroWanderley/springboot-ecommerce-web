import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPaymentMethod } from "../../store/actions";

const PaymentMethod = () => {
  const { paymentMethod } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  const paymentMethodHandler = (method) => {
    dispatch(selectPaymentMethod(method));
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
      <h1 className="text-2xl font-semibold mb-4">Select payment method</h1>
      <FormControl>
        <RadioGroup
          aria-label="payment method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel value="pix" control={<Radio />} label="Pix" />
          <FormControlLabel
            value="creditCard"
            control={<Radio />}
            label="Credit Card"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;
