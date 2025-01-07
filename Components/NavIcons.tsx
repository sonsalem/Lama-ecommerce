"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const iconProfileRef = useRef<HTMLImageElement>(null);
  const menuProfileRef = useRef<HTMLDivElement>(null);
  const iconCartRef = useRef<HTMLImageElement>(null);
  const menuCartRef = useRef<HTMLDivElement>(null);

  const handleProfile = () => {
    const isLoggedIn = wixClient.auth.loggedIn();
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const { counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [getCart, wixClient]);

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push("/login");
    setIsLoading(false);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuProfileRef.current &&
        !menuProfileRef.current.contains(e.target as Node) &&
        iconProfileRef.current !== e.target
      ) {
        setIsProfileOpen(false);
      } else if (
        menuCartRef.current &&
        !menuCartRef.current.contains(e.target as Node) &&
        iconCartRef.current !== e.target
      ) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isCartOpen]);

  return (
    <div className=" flex items-center gap-4 xl-gap-6 relative">
      <Image
        ref={iconProfileRef}
        src="/profile.png"
        alt="profileIpmge"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div
          ref={menuProfileRef}
          className="absolute min-w-[150px] p-2 rounded-md top-12 -left-[50px] text-sm bg-white
        shadow-[0_3px_10px_rgba(0,0,0,0.2)] z-20"
        >
          <Link
            href="/"
            className="hover:shadow-none hover:text-lama shadow-md main-transition px-4 rounded-md py-3 block"
          >
            Profile
          </Link>
          <div
            onClick={handleLogout}
            className="cursor-pointer hover:shadow-none hover:text-lama shadow-md main-transition px-4 rounded-md py-3"
          >
            {isLoading ? "Logging Out..." : "Log Out"}
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt="handleSearchIpmge"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className=" min-w-[22px] min-h-[22px] relative">
        <Image
          ref={iconCartRef}
          src="/cart.png"
          alt="cartIpmge"
          width={22}
          height={22}
          className="cursor-pointer min-w-[22px] min-h-[22px]"
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        {counter > 0 && (
          <div
            className="absolute -top-3 -right-3 w-5 h-5 bg-lama rounded-full flex
          items-center justify-center text-white text-sm"
          >
            {counter}
          </div>
        )}
      </div>
      {isCartOpen && (
        <div
          ref={menuCartRef}
          className="absolute w-max p-4 rounded-md top-12 -right-0 text-sm bg-white
              shadow-[0_3px_10px_rgba(0,0,0,0.2)] z-20 flex-col gap-6"
        >
          <CartModal />
        </div>
      )}
    </div>
  );
};

export default NavIcons;
