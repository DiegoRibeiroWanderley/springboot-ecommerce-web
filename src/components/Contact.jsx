import { useForm } from "react-hook-form"
import { FaEnvelope, FaMapMarked, FaPhone } from "react-icons/fa"

const Contact = () => {
    const {register, handleSubmit, formState: {erros}} = useForm({mode: 'onChange'})

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center">
            <div className="shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6 text-pink-300">Contact Us</h1>
                <p className="text-gray-600 text-center mb-4">We would love to hear from you! Please fill out the form below or contact us direct</p>
            
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name: 
                            <input 
                                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                {...register('name', {
                                required: true,
                                minLength: 2
                            })}/>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email: 
                            <input 
                                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                {...register('email', {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}/>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Message: 
                            <textarea 
                                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                rows={10}
                                {...register('message', {
                                required: true
                            })}/>
                        </label>
                    </div>

                    <button className="w-full bg-pink-300 text-white rounded-lg hover:bg-pink-400 font-bold p-2 transtition duration-300 cursor-pointer">
                        Send message
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold">Contact Information</h2>
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        <div className="flex items-center">
                            <FaPhone className="text-pink-400 mr-2" />
                            <span>+55 12 4002 8922</span>
                        </div>

                        <div className="flex items-center">
                            <FaEnvelope className="text-pink-400 mr-2" />
                            <span>enterpriseofc@gmail.com</span>
                        </div>

                        <div className="flex items-center">
                            <FaMapMarked className="text-pink-400 mr-2" />
                            <span>123 Street, State, Country</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact