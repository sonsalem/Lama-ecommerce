"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/list",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/list",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/list",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [cureentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interverl = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interverl);
  }, [cureentSlide]);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex main-transition"
        style={{ transform: `translateX(-${cureentSlide * 100}vw)` }}
      >
        {slides.map((slide) => {
          return (
            <div
              className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
              key={slide.id}
            >
              <div className="text h-1/2 xl:h-full xl:w-1/2 text-center flex items-center justify-center flex-col">
                <h2 className="text-xl lg:text-3xl 2xl:text-5xl mb-3 2xl:mb-6">
                  {slide.description}
                </h2>
                <h2 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold mb-8 2xl:mb-12">
                  {slide.title}
                </h2>
                <Link
                  className="rounded-md bg-black text-white py-3 px-4 ring-1 ring-black main-transition hover:bg-transparent hover:text-black"
                  href={slide.url}
                >
                  SHOP NOW
                </Link>
              </div>
              <div className="image h-1/2 xl:h-full xl:w-1/2 relative">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full main-transition ring-1 ring-gray-600 cursor-pointer flex items-center justify-center
            ${cureentSlide === index ? "scale-150" : ""}`}
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
          >
            <div
              className={`${
                cureentSlide === index ? "w-[6px] h-[6px]" : "w-[0px] h-[0px]"
              } bg-gray-600 rounded-full main-transition`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
