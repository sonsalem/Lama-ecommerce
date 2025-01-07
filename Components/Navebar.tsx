"use client";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navebar = () => {
  return (
    <div className="h-20 shadow-md sticky top-0 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-44 z-50 bg-white">
      {/* Mobile */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="./" className="text-2xl tracking-wide">
          LAMA
        </Link>
        <Menu />
      </div>
      {/* Bigger Screens */}
      <div className="hidden md:flex items-center justify-between h-full gap-8">
        {/* LEFT */}
        <div className="w-1/3 xl:w-2/3 flex items-center gap-12">
          <Link href="./" className="text-2xl tracking-wide flex gap-3">
            <Image src="/logo.png" alt="logouimage" width={30} height={24} />
            LAMA
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/list?cat=all-products">Shop</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        {/* Right */}
        <div className="w-2/3 xl:w-1/3 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navebar;
