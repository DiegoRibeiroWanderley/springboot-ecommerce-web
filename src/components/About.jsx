import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProcuts } from "../store/actions"
import ProductCard from "./shared/ProductCard"

const About = () => {
    const {products} = useSelector((state) => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProcuts())
    }, [dispatch])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-pink-400 text-4xl font-bold text-center mb-12">
                About us
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-center scroll-mb-12 gap-4">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit.
                        Ex sapien vitae pellentesque sem placerat in id. 
                        Pretium tellus duis convallis tempus leo eu aenean. 
                        Urna tempor pulvinar vivamus fringilla lacus nec metus. 
                        Iaculis massa nisl malesuada lacinia integer nunc posuere. 
                        Semper vel class aptent taciti sociosqu ad litora. 
                        Conubia nostra inceptos himenaeos orci varius natoque penatibus. 
                        Dis parturient montes nascetur ridiculus mus donec rhoncus. 
                    </p>
                </div>

                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img 
                        alt="About Us"
                        className="rounded-lg w-full h-auto shadow-lg transform transition-transform duration-300 hover:scale-105"
                        src="https://placehold.net/600x400.png">
                    </img>
                </div>
            </div>
            <div className="mt-8 py-7 space-y-7">
                <h1 className="text-pink-400 text-4xl font-bold text-center mb-12">Our Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products && products?.slice(0, 6).map((product, i) => (
                        <ProductCard key={i} about={true} {...product} />
                    ) )}
                </div>
            </div>
        </div>
    )
}

export default About