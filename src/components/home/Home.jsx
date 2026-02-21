import { useDispatch, useSelector } from "react-redux"
import Banner from "./Banner"
import { useEffect } from "react"
import { fetchProcuts } from "../../store/actions"
import ProductCard from "../shared/ProductCard"
import Loader from "../shared/Loader"
import { Link } from "react-router-dom"

const Home = () => {
    const dispatch = useDispatch()
    const {products} = useSelector((state) => state.products)
    const { isLoading, errorMessage } = useSelector (
        (state) => state.errors
    )

    useEffect(() => {
        dispatch(fetchProcuts())
    }, [dispatch])

    return (
    <div>
        <div className="p-6">
            <Banner />
        </div>

        <div className="py-5">
            <div className="flex flex-col justify-center items-center space-y-2">
                <h1 className="text-slate-800 text-4xl font-bold">
                    <span>Discouver our catalog!</span>
                </h1>
            </div>

            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-50">
                                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                                    <span className="text-slate-800 text-lg font-medium">{errorMessage}</span>
                                </div>
            ) : (
                <div className="lg:px-14 sm:px-8 px-4 pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {products && products?.slice(0, 8).map((product, i) => (
                        <ProductCard key={i} {...product} />
                    ) )}
                </div>
            )}
        </div>
        
        <div className="justify-center items-center flex">
            <Link to={"/products"}
                className='mt-6 inline-block text-pink-300 py-2 px-4 rounded text-2xl underline'>
                See more
            </Link>
        </div>
    </div>
    )
}

export default Home