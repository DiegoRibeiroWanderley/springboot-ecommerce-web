import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";
import { FaAddressCard } from "react-icons/fa";
import { addUpdateUserAddress } from "../../store/actions";
import { useEffect } from "react";

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();

  const { buttonLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSaveAddressHandler = async (data) => {
    dispatch(
      addUpdateUserAddress(
        data,
        toast,
        address?.addressId,
        setOpenAddressModal,
      ),
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("street", address?.street);
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("state", address?.state);
      setValue("country", address?.country);
      setValue("postalCode", address?.postalCode);
    }
  }, [address]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" size={40} />
          <h1 className="text-slate-800 text-center font-bold lg:text-3xl text:2xl">
            {!address?.addressId ? "Add Address" : "Update Address"}
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter street"
            register={register}
            errors={errors}
          />

          <InputField
            label="Building name"
            required
            id="buildingName"
            type="text"
            message="*Building name is required"
            placeholder="Enter your building name"
            register={register}
            errors={errors}
          />

          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter city"
            register={register}
            errors={errors}
          />

          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter state"
            register={register}
            errors={errors}
          />

          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter country"
            register={register}
            errors={errors}
          />

          <InputField
            label="Postal code"
            required
            id="postalCode"
            type="text"
            message="*Postal code is required"
            placeholder="Enter postal code"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={buttonLoader}
          className="bg-pink-300 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm mt-6"
          type="submit"
        >
          {buttonLoader ? (
            <>
              <Spinner size={10} />
              Saving...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
