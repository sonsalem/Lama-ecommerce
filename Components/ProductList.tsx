import { WixCLientServer } from "@/lib/WixCLientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  pagination,
  limit,
  searchParams,
}: {
  categoryId: string | undefined;
  pagination?: boolean;
  limit?: number;
  searchParams?: any;
}) => {
  const WixClient = await WixCLientServer();

  let productQuery = await WixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 9999)
    .skip(
      searchParams?.page ? (limit || PRODUCT_PER_PAGE) * searchParams.page : 0
    )
    .limit(limit || PRODUCT_PER_PAGE);

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  let res = await productQuery?.find();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-0 gap-y-16 justify-between mt-12">
        {res?.items.map((product: products.Product) => {
          return (
            <Link
              href={"/" + product.slug}
              className="flex-col flex gap-4 w-full rounded-md main-transition hover:shadow-lg p-4"
              key={product._id}
            >
              <div className="relative w-full h-80">
                <Image
                  src={`${product.media?.mainMedia?.image?.url}`}
                  alt={`${product.name}`}
                  width={200}
                  height={200}
                  objectFit="cover"
                  className="absolute w-full h-full rounded-md z-10 hover:opacity-0 main-transition"
                />
                {product.media?.items && (
                  <Image
                    src={`${product.media?.items[1]?.image?.url}`}
                    alt={`${product.name}`}
                    width={200}
                    height={200}
                    objectFit="cover"
                    className="absolute w-full h-full rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold">${product.price?.price}</span>
              </div>
              <div className="text-sm text-gray-500 text-nowrap overflow-hidden text-ellipsis">
                {product.description}
              </div>
              <button
                className="rounded-md ring-1 ring-lama py-2 px-4 text-xs bg-lama text-white hover:bg-white
          hover:text-lama w-max main-transition"
              >
                Add to Cart
              </button>
            </Link>
          );
        })}
      </div>
      <Pagination
        currentPage={res.currentPage || 0}
        totalPages={res.totalPages || 0}
        pagination={pagination || false}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </>
  );
};

export default ProductList;
