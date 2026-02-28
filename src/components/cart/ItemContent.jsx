import { useState } from "react"
import { HiOutlineTrash } from "react-icons/hi"
import SetQuantity from "./SetQuantity"

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity)

    return (
        <div className="p-2 grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 mb-1 rounded-md shadow-sm items-center border border-slate-200">
            <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
                    <h3 className="text-[17px] text-sm font-semibold text-slate-600">
                        {productName}
                    </h3>
                </div>

                <div className="md:w-36 sm:w-24 w-12">
                    <img
                        src={image}
                        alt={productName}
                        className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md" />
                </div>

                <div className="flex items-start gap-5 mt-1">
                    <button
                        onClick={() => {}}
                        className="flex items-center semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                        <HiOutlineTrash />
                        Remove
                    </button>
                </div>
            </div>

            <div className="w-full sm:ml-16 ml-5 justify-self-start lg:text-[17px] text-sm text-slate-600 font-semibold">
                {`$ ${Number(specialPrice).toFixed(2)}`}
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                <SetQuantity
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={() => {}}
                    handleQtyDecrease={() => {}}/>
            </div>

            <div className="ml-7 sm:ml-18 justify-self-start lg:text-[17px] text-sm text-slate-600 font-semibold">
                {`$ ${Number(currentQuantity) * Number(specialPrice)}`}
            </div>
        </div>
    )
}

export default ItemContent