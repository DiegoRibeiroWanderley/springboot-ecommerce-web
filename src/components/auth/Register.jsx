import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const registerHandler = async (data) => {
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-112.5 w-90 shadow-lg py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-800" size={40} />
          <h1 className="text-slate-800 text-center font-bold lg:text-3xl text:2xl">
            Register Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-gray-200" />
        <div className="flex flex-col gap-3">
          <InputField
            label="Username"
            required
            id="username"
            min={8}
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            min={6}
            type="text"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />

          <InputField
            label="Cell phone"
            required
            id="cellphone"
            min={9}
            type="text"
            message="*Cell phone is required"
            placeholder="Enter your cell phone"
            register={register}
            errors={errors}
          />

          <InputField
            label="Tax id"
            required
            id="taxId"
            min={11}
            type="text"
            message="*tax id is required"
            placeholder="Enter your tax id"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className="bg-linear-to-r from-purple-600 to-red-400 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm mt-6"
          type="submit"
        >
          {loader ? <>Loading...</> : <>Register</>}
        </button>
        <p className="text-center text-sm text-slate-700 mt-6">
          <span>Already have an account? </span>
          <Link
            className="font-semibold underline hover:text-black"
            to="/login"
          >
            <span>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};
