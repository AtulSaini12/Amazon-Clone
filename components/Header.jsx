import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../src/slices/cartSlice";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer "
          />
        </div>

        <div
          className="bg-yellow-400 hover:bg-yellow-500 hidden 
        sm:flex items-center h-10 rounded-md flex-grow 

        cursor-pointer"
        >
          <input
            type="text"
            className="p-2 h-full w-6 px-4
             flex-grow rounded-l-md flex-shrink focus:outline-none"
          />
          <SearchIcon className="h-12 p-4 " />
        </div>

        <div
          className="text-white items-center flex text-xs space-x-6
             mx-6 whitespace-nowrap
        "
        >
          <div className="link" onClick={session ? signOut : signIn}>
            <p>{session ? `Hello ${session.user?.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">
              {session ? "sign out" : "Accounts & Lists"}
            </p>
          </div>
          <div
            className="link"
            onClick={() => session && router.push("/orders")}
          >
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="link relative flex items-center"
          >
            <span className="absolute top-0 right-0 h-4 w-4 text-center rounded-full text-black font-bold bg-yellow-400 md:right-10 ">
              {items?.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold mt-2 md:text-sm hidden md:inline">
              Cart
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidden md:inline-flex">Electronics</p>
        <p className="link hidden md:inline-flex">Food & Grocery</p>
        <p className="link hidden md:inline-flex">Price</p>
        <p className="link hidden md:inline-flex">Buy Again</p>
        <p className="link hidden md:inline-flex">Shopper Toolkit</p>
        <p className="link hidden md:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
