import { auth } from "@/auth";
import { getAllCategory } from "@/database/productQuery";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import DropdownLink from "./DropdownLink";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await auth();
  const allCategory = await getAllCategory();

  // TODO: show updated user data

  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          <span className="text-white ">
            <FontAwesomeIcon icon={faBars} className="size-6" />
          </span>
          <span className="capitalize ml-2 text-white hidden">
            All Categories
          </span>
          {/* dropdown */}
          <div
            className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
            style={{ width: 300 }}
          >
            {allCategory?.length > 0 &&
              allCategory.map((category) => (
                <DropdownLink key={category?.id} category={category} />
              ))}
          </div>
        </div>
        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize">
            <Link
              href="/"
              className="text-gray-200 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-200 hover:text-white transition"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-gray-200 hover:text-white transition"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="text-gray-200 hover:text-white transition"
            >
              Contact us
            </Link>
          </div>
          {session?.user ? (
            <div className="flex gap-4 items-center text-white">
              <SignOutButton />
              <Link
                href="/account"
                className="flex gap-4 items-center text-white"
              >
                <span>{session.user.name}</span>
                <div className="size-10 rounded-full overflow-hidden relative ring-2 ring-white flex place-content-center">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="user avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="size-10 " />
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-gray-200 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
