import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const addresses = useSelector((state) => state.auth.addresses);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-5">
        {activeStep === 0 && <AddressInfo addresses={addresses} />}
      </div>
    </div>
  );
};

export default Checkout;
