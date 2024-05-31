const Stock = ({ stock }) => {
  if (stock === undefined) {
    return <span className="text-gray-600">N/A</span>;
  }
  if (stock === 0) {
    return <span className="text-red-500">out of stock</span>;
  }
  if (stock < 10) {
    return <span className="text-red-500">only {stock} left</span>;
  }
  if (stock >= 10) {
    return <span className="text-green-600">In Stock</span>;
  }
};
export default Stock;
