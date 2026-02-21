import { Badge } from "@mui/material"
import { useState } from "react"
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const NavigationBar = () => {
    const path = useLocation().pathname
    const [navBarOpen, setNavBarOpen] = useState(false)

    return (
        <div className="h-17.5 bg-pink-300 text-white z-50 flex items-center sticky">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <FaStore className="mr-2 text-3xl" />
                    <span>Shop</span>
                </Link>

                <ul className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-17.5 sm:shadow-none shadow-md ${
                    navBarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"}
                    transition-all duration-100 sm:h-fit sm:bg-none bg-linear-to-bl from-pink-300 to-pink-500 text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>
                    <li className="font-medium transition-all duration-150 mt-2">
                        <Link 
                            className={`${path === "/" ? "sm:text-pink-400 text-white"  : "text-white"} flex flex-row`}
                            to="/">
                            <span className="block sm:hidden">
                                {path === "/" ? <IoIosArrowForward className="text-xl mt-0.75"/> : <IoIosArrowDown className="text-xl mt-0.75"/>}
                            </span>
                            Home
                        </Link>
                    </li>

                    <li className="font-medium transition-all duration-150 mt-2">
                        <Link 
                            className={`${path === "/products" ? "sm:text-pink-400 text-white" : "text-white"} flex flex-row`}
                            to="/products">
                            <span className="block sm:hidden">
                                {path === "/products" ? <IoIosArrowForward className="text-xl mt-0.75"/> : <IoIosArrowDown className="text-xl mt-0.75"/>}
                            </span>
                            Products
                        </Link>
                    </li>
                    
                    <li className="font-medium transition-all duration-150 mt-2">
                        <Link 
                            className={`${path === "/about" ? "sm:text-pink-400 text-white" : "text-white"} flex flex-row`}
                            to="/about">
                            <span className="block sm:hidden">
                                {path === "/about" ? <IoIosArrowForward className="text-xl mt-0.75"/> : <IoIosArrowDown className="text-xl mt-0.75"/>}
                            </span>
                            About
                        </Link>
                    </li>

                    <li className="font-medium transition-all duration-150 mt-2">
                        <Link 
                            className={`${path === "/contact" ? "sm:text-pink-400 text-white" : "text-white"} flex flex-row`}
                            to="/contact">
                            <span className="block sm:hidden">
                                {path === "/contact" ? <IoIosArrowForward className="text-xl mt-0.75"/> : <IoIosArrowDown className="text-xl mt-0.75"/>}
                            </span>
                            Contact
                        </Link>
                    </li>

                    <li className="font-medium transition-all duration-150 mt-2">
                        <Link 
                            className={`${path === "/cart" ? "text-pink-400" : "text-white"}`}
                            to="/cart">
                            <Badge
                                showZero
                                badgeContent={0}
                                color="primary"
                                overlap="circular"
                                >
                                <FaShoppingCart className="text-3xl"/>
                            </Badge>
                        </Link>
                    </li>

                    <li className="font-medium transition-all duration-150 mt-2">
                        <Link 
                            className="flex items-center space-x-2 px-4 py-1.5
                                bg-linear-to-r from-purple-600 to-red-500
                                text-white font-semibold rounded-md shadow-lg
                                hover:from-purple-500 hover:to-red-400 transition
                                duration-300 ease-in-out transform"
                            to="/login">
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>
                    </li>
                </ul>

                <button 
                    onClick={() => {setNavBarOpen(!navBarOpen)}}
                    className="sm:hidden flex items-center sm:mt-0 mt-2">
                    {navBarOpen ? (
                        <RxCross2 className="text-white text-3xl"/>
                    ) : (
                        <IoIosMenu className="text-white text-3xl"/>
                    )}
                </button>

            </div>
        </div>
    )
}

export default NavigationBar