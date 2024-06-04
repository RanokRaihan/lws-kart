export const checkIsFavourite = (productId, wishlist) => {
  //check the wishlist length
  if (wishlist && wishlist?.length > 0) {
    return wishlist.includes(productId?.toString());
  } else {
    return false;
  }
};
