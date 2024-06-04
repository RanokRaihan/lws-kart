import { getCartItems, getUserWishList } from "@/actions";
import { auth } from "@/auth";
import logo from "@/public/assets/images/logo.svg";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Searchbar from "./Searchbar";

const Header = async () => {
  const session = await auth();
  const { wishlistItems } = await getUserWishList();
  const response = await getCartItems();
  const { items: cartItems } = JSON.parse(response);

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-32" />
        </Link>
        <Suspense>
          <Searchbar />
        </Suspense>

        <div className="flex items-center space-x-4">
          <Link
            href="/wishlist"
            className="text-center text-gray-700 hover:text-primary transition relative flex flex-col justify-center items-center"
          >
            <div className="text-2xl">
              <FontAwesomeIcon icon={faHeart} className="size-6" />
            </div>
            <div className="text-xs leading-3">Wishlist</div>
            {session?.user && wishlistItems?.length > 0 && (
              <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {wishlistItems?.length}
              </div>
            )}
          </Link>
          <Link
            href="/cart"
            className="text-center text-gray-700 hover:text-primary transition relative flex flex-col justify-center items-center"
          >
            <div className="text-2xl">
              <FontAwesomeIcon icon={faBagShopping} className="size-6" />
            </div>
            <div className="text-xs leading-3">Cart</div>
            {session?.user && cartItems?.length > 0 && (
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {cartItems?.length}
              </div>
            )}
          </Link>
          <Link
            href="/account"
            className="text-center text-gray-700 hover:text-primary transition relative flex flex-col justify-center items-center"
          >
            <div className="text-xl">
              <FontAwesomeIcon icon={faUser} size="xs" className="size-6" />
            </div>
            <div className="text-xs leading-3">Account</div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
