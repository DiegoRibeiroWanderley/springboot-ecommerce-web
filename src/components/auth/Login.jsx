import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineLogin } from "react-icons/ai"
import InputField from "../shared/InputField"

const Login = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    const { register, handleSubmit, formState: {errors} } = useForm({mode:"onTouched"})

    const loginHandler = async (data) => {
        console.log("Login click");
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-112.5 w-90 shadow-lg py-8 sm:px-8 px-4 rounded-md">
                    <div className="flex flex-col items-center justfy-center space-y-4">
                        <AiOutlineLogin className="text-slate-800" size={40} />
                        <h1 className="text-slate-800 text-center font-bold lg:text-3xl text:2xl">
                            Login Here
                        </h1>
                    </div>
                <hr className="mt-2 mb-5 text-gray-200" />
                <div className="flex flex-col gap-3">
                    <InputField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors} />

                    <InputField
                        label="Password"
                        required
                        id="password"
                        type="text"
                        message="*Password is required"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors} />
                </div>
                <button
                    disabled={loader}
                    className="bg-linear-to-r from-purple-600 to-red-400 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm mt-6"
                    type="submit">
                    {loader ? (
                        <>Loading...</>
                    ) : <>Login</>}
                </button>
                <p className="text-center text-sm text-slate-700 mt-6">
                    <span>Don't have an account? </span>
                    <Link
                        className="font-semibold underline hover:text-black"
                        to="/register">
                        <span>Sign Up</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login