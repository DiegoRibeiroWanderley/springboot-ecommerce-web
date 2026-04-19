import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const PaymentCreditCard = () => {
  return (
    <div className="h-96 flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>Credit card unavailable</AlertTitle>
        Credit card payment is unavailable. Please use another payment method
      </Alert>
    </div>
  );
};

export default PaymentCreditCard;
