"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";

const Page = () => {
  const wixClient = useWixClient();

  const { cart, isLoading, removeItem, counter } = useCartStore();

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-44 my-12">
      {counter == 0 ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-3xl mb-8 min-w-[320px]">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8 mb-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div
                className="flex gap-4 border-b-2 border-gray-400 pb-4"
                key={item._id}
              >
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className=" text-lg">{item.productName?.original}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-xs text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-red-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${cart.subtotal.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              disabled={isLoading}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
