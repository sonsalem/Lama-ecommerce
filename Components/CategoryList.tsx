"use client";

import { collections } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CategoryListData from "./CategoryListData";
import { Suspense } from "react";
import Loader from "./Loader";

const CategoryList = async () => {
  return (
    <div className="mt-12 px-4 overflow-x-scroll scrollbar-hide">
      <Swiper
        spaceBetween={20}
        breakpoints={{
          1024: {
            slidesPerView: 5,
          },
          640: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 1,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <Suspense fallback={<Loader />}>
          {CategoryListData && (
            <>
              {CategoryListData.map((item: collections.Collection, i) => (
                <SwiperSlide key={i}>
                  <Link
                    href={`/list?cat=${item.slug}`}
                    className="flex-shrink-0 w-full"
                    key={item._id}
                  >
                    <div className="categoryCard">
                      <div className="card main-transition">
                        <div className="relative bg-slate-100 w-full h-96 rounded-r-xl rounded-t-xl">
                          <Image
                            src={`${item.media?.mainMedia?.image?.url}`}
                            alt={`${item.name}`}
                            width={600}
                            height={600}
                            style={{ objectFit: "cover" }}
                            className="w-full h-full rounded-r-xl rounded-t-xl"
                          />
                        </div>
                      </div>
                      <h1 className="mt-8 font-light text-xl tracking-wide">
                        {item.name}
                      </h1>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </>
          )}
        </Suspense>
      </Swiper>
    </div>
  );
};

export default CategoryList;
