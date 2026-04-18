import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";
import ErrorPage from "../shared/ErrorPage";
import PaymentMethod from "./PaymentMethod";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];
  const { selectedUserAddress } = useSelector((state) => state.auth);
  const { paymentMethod } = useSelector((state) => state.payment);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserAddress) {
      toast.error("Please select checkout address before proceeding");
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const addresses = useSelector((state) => state.auth.addresses);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
        <Spinner size={10} />
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo addresses={addresses} />}
          {activeStep === 1 && <PaymentMethod />}
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200 border"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <Button
          variant="contained"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            backgroundColor: "#f9a8d4",
            color: "#ffffff",
            borderColor: "transparent",
          }}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <Button
            variant="contained"
            disabled={
              errorMessage ||
              (activeStep === 0 && !selectedUserAddress) ||
              (activeStep === 1 && !paymentMethod)
            }
            onClick={handleNext}
            sx={{
              backgroundColor: "#f9a8d4",
              color: "#ffffff",
              borderColor: "transparent",
            }}
          >
            Next
          </Button>
        )}
      </div>
      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;
