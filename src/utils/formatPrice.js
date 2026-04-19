export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatPriceCalc = (quantity, price) => {
  return (Number(quantity) * Number(price)).toFixed(2);
};
