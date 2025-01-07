"use client";

import Image from "next/image";
import React, { Suspense, useState } from "react";
import Loader from "./Loader";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState<number>(0);

  console.log(index);

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <div className="h-[500px] relative">
          <Image
            src={items[index].image.url}
            alt={`image Faild`}
            fill
            sizes="100%"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          {items.map((img: any, i: number) => (
            <div
              onClick={() => setIndex(i)}
              key={img._id}
              className="w-1/4 h-32 relative mt-4"
            >
              <Image
                src={img.image.url}
                alt={`${img.name}`}
                fill
                sizes="24vw"
                objectFit="cover"
                className="rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default ProductImages;
