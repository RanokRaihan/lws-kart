import WishListItem from "./WishListItem";

const WishList = () => {
  return (
    <div className="container gap-6 pt-4 pb-16">
      <div className="mx-auto space-y-4 max-w-6xl">
        <WishListItem />
        <WishListItem />
        <WishListItem />
      </div>
    </div>
  );
};

export default WishList;
