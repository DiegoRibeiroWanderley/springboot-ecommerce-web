import React from "react";
import { formatPriceCalc } from "../../utils/formatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  const formatKey = (text) => {
    const formattedKey = text.replace(/([A-Z])/g, " $1");
    return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
  };

  return (
    <div className="container mx-auto mb-8">
      <div className=" flex flex-wrap w-190 lg:w-560">
        <div className="w-full lg:w-380 lg:flex space-x-4">
          <div className="space-y-4 w-full">
            <div className="p-4 rounded-lg shadow-sm shadow-pink-300">
              <h2 className="text-2xl font-semibold mb-2">Billing address</h2>
              {Object.entries(address).map(
                ([key, value]) =>
                  key !== "addressId" && (
                    <p key={key}>
                      <strong>{`${formatKey(key)}: `}</strong>
                      {value}
                    </p>
                  ),
              )}
            </div>

            <div className="p-4 rounded-lg shadow-sm shadow-pink-300">
              <h2 className="text-2xl font-semibold mb-2">Payment method</h2>
              <p>
                <strong>Method: </strong>
                {formatKey(paymentMethod)}
              </p>
            </div>

            <div className="p-4 rounded-lg shadow-sm shadow-pink-300">
              <h2 className="text-2xl font-semibold mb-2">Order items</h2>
              <div className="space-y-2">
                {cart.products?.map((item) => (
                  <div
                    key={item?.productId}
                    className="flex space-x-2 items-center"
                  >
                    <img
                      src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                      alt="Product"
                      className="w-12 h-12 rounded"
                    ></img>
                    <div className="text-gray-500">
                      <p className="font-semibold">{item?.productName}</p>
                      <p>
                        {item?.quantity} x ${item?.specialPrice} = $
                        {formatPriceCalc(item.quantity, item.specialPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full mt-2 lg:mt-0 lg:w-8/12 ">
            <div className="w-full p-4 rounded-lg shadow-sm shadow-pink-300">
              <h2 className="text-2xl font-semibold mb-2">Order summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Products</span>
                  <span>${formatPriceCalc(totalPrice, 1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${formatPriceCalc(totalPrice, 1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
