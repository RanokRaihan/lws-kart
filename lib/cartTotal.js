export function calculateTotalCartPrice(cartItems) {
  const total = cartItems.reduce((total, cartItem) => {
    const { price, discount } = cartItem.product;
    const discountAmount = (price * discount) / 100;
    const discountedPrice = price - discountAmount;
    const totalItemPrice = discountedPrice * cartItem.quantity;
    return total + totalItemPrice;
  }, 0);

  return Math.round(total * 100) / 100;
}
