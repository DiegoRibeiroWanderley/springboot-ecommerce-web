import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModel from "./ProductViewModel";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice
}) => {
    const [openProductViewModel, setOpenProductViewModel] = useState(false)
    const buttonLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("")
    const isAvailable = quantity && Number(quantity) > 0

    const handleProductView = (product) => {
        setSelectedViewProduct(product)
        setOpenProductViewModel(true)
    }

    return (
        <div className="rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice
                })
            }} className="w-full overflow-hidden aspect-3/2">
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                    src={image}
                    alt={productName}>
                </img>
            </div>
            <div className="p-4">
                <h2 onClick={() => {
                    handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice
                })
                }}
                    className="text-lg font-semibold mb-2 cursor-pointer">
                    {productName}
                </h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-lg text-slate-800">{description}</p>
                </div>
                
                <div className="min-h-16 flex items-center justify-between">
                    {specialPrice !== price ? (
                        <div className="flex flex-col">
                            <span className="line-through">
                                ${Number(price).toFixed(2)}
                            </span>
                            <span className="text-xl font-bold text-slate-700">
                                ${Number(specialPrice).toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <div className="mt-6 flex flex-col relative">
                            <span className=" top-6 text-xl font-bold text-gray-700 p">
                                ${Number(price).toFixed(2)}
                            </span>
                        </div>
                    )}

                    <button onClick={() => {}}
                            disabled={!isAvailable || buttonLoader}
                            className={`bg-pink-200 p-2 rounded-lg transition-colors duration-300 w-36 flex justify-center mt-3.5 text-gray-800
                                        ${isAvailable ? "opacity-100 hover:bg-pink-300" : "opacity-70"}`}>
                        <FaShoppingCart className="mt-1 ml-1"/>
                        <h1 className="ml-5">{isAvailable ? "Add to Cart" : "Stock Out"}</h1>
                    </button>
                </div>
            </div>
            <ProductViewModel 
                open={openProductViewModel}
                setOpen={setOpenProductViewModel}
                product={selectedViewProduct}
                isAvailable={isAvailable}/>
        </div>
    )
}

export default ProductCard