const CheckoutItem = ({ item }) => {
  const { _id, name, price, discount } = item?.product || {};
  return (
    <div className="flex justify-between">
      <div>
        <h5 className="text-gray-800 font-medium">{name}</h5>
      </div>
      <p className="text-gray-600">x{item?.quantity}</p>
      <p className="text-gray-800 font-medium">
        {" "}
        ${Math.round((price - (price * discount) / 100) * 100) / 100}
      </p>
    </div>
  );
};

export default CheckoutItem;
