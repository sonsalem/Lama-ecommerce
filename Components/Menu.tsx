"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

const Menu = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { counter } = useCartStore();

  const isLoggedIn = wixClient.auth.loggedIn();

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push("/login");
    setIsLoading(false);
    setOpen((prev) => !prev);
  };

  return (
    <div className="menu-mobile">
      <Image
        src="/menu.png"
        alt="menu.png"
        width={28}
        height={28}
        className="cursor-pointer "
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        className={`links fixed z-50 main-transition w-screen max-w-[100%] h-[calc(100vh-80px)] top-20 bg-white flex
        flex-col shadow-md text-lg ${open ? "left-0" : "-left-[100%]"}`}
      >
        <Link
          className="py-2.5 px-5 hover:text-lama text-cente main-transition  border-b-gray-800 border-b-2 border-t-gray-800 border-t-4"
          href="/"
          onClick={() => setOpen((prev) => !prev)}
        >
          Home
        </Link>
        <Link
          className="py-2.5 px-5 hover:text-lama text-cente main-transition  border-b-gray-800 border-b-2"
          href="/list?cat=all-products"
          onClick={() => setOpen((prev) => !prev)}
        >
          Shop
        </Link>
        <Link
          className="py-2.5 px-5 hover:text-lama text-cente main-transition  border-b-gray-800 border-b-2"
          href="/about"
          onClick={() => setOpen((prev) => !prev)}
        >
          About
        </Link>
        <div className="flex mt-8 gap-4 items-center justify-center">
          {!isLoggedIn ? (
            <Link
              href="/login"
              onClick={() => setOpen((prev) => !prev)}
              className="py-2.5 px-5 hover:text-lama cursor-pointer text-cente main-transition  border-b-gray-800 border-b-2"
            >
              Log in
            </Link>
          ) : (
            <div
              onClick={handleLogout}
              className="py-2.5 px-5 hover:text-lama cursor-pointer text-cente main-transition  border-b-gray-800 border-b-2"
            >
              {isLoading ? "Logging Out..." : "Log out"}
            </div>
          )}
          <Link
            className="py-2.5 px-5 hover:text-lama text-cente main-transition  border-b-gray-800 border-b-2"
            href="/cart"
            onClick={() => setOpen((prev) => !prev)}
          >
            Cart ({counter})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
