"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    img: "https://images.pexels.com/photos/5653734/pexels-photo-5653734.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    img: "https://images.pexels.com/photos/28941717/pexels-photo-28941717.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    img: "https://images.pexels.com/photos/27308643/pexels-photo-27308643/free-photo-of-runway.png?auto=compress&cs=tinysrgb&w=800",
  },
  {
    img: "https://images.pexels.com/photos/29307039/pexels-photo-29307039/free-photo-of-colorful-winter-sweaters-on-display.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const SliderLogin = () => {
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
        style={{ transform: `translateX(-${cureentSlide * 50}vw)` }}
      >
        {slides.map((slide, i) => {
          return (
            <div className={`w-[50vw] h-full`} key={i}>
              <div className="image w-full h-full relative">
                <Image
                  src={slide.img}
                  alt="image"
                  fill
                  sizes="100%"
                  objectFit="cover"
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
            key={index}
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

export default SliderLogin;
