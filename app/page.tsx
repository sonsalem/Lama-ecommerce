import CategoryList from "@/Components/CategoryList";
import Loader from "@/Components/Loader";
import ProductList from "@/Components/ProductList";
import Slider from "@/Components/Slider";
import { Suspense } from "react";

const page = async () => {
  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-44">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Loader />}>
          <ProductList
            categoryId={`05fe4ee7-b950-6e13-1eb0-6a74b2ebd270`}
            limit={8}
          />
        </Suspense>
      </div>
      <div className="my-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-44">
          Categories
        </h1>
        <Suspense fallback={<Loader />}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
