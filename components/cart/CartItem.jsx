import Image from "next/image";

const CartItem = () => {
  return (
    <div className="flex items-center space-x-4">
      <Image
        className="w-20 h-20 object-cover rounded"
        src="https://via.placeholder.com/80"
        alt="Product Image"
        width={80}
        height={80}
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">Product Name 2</h3>
        <p className="text-gray-600">Description of the product goes here.</p>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-gray-800">$49.99</span>
          <span className="text-gray-600">x 2</span>
        </div>
      </div>
      <button className="text-red-500 hover:text-red-700">Remove</button>
    </div>
  );
};

export default CartItem;
