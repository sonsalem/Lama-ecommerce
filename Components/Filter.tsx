"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex items-center justify-center">
      <div className="flex gap-6 flex-wrap items-center justify-center">
        <div className="custom-select-wrapper">
          <select
            name="type"
            id=""
            className="py-2 ps-4 pe-8 rounded-md cursor-pointer shadow-md custom-select text-xs font-medium bg-white min-w-32 max-w-40 lg:min-w-40"
            onChange={handleFilterChange}
          >
            <option>Type</option>
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <input
          type="text"
          name="min"
          placeholder="min price"
          onChange={handleFilterChange}
          className="text-xs  py-2 ps-4 pe-8 rounded-md focus:border-none focus:outline-none pl-2 min-w-32 max-w-40 lg:min-w-40 shadow-md"
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          onChange={handleFilterChange}
          className="text-xs  py-2 ps-4 pe-8 rounded-md focus:border-none focus:outline-none pl-2 min-w-32 max-w-40 lg:min-w-40 shadow-md"
        />
        <div className="custom-select-wrapper">
          <select
            name="cat"
            className="py-2 ps-4 pe-8 rounded-md cursor-pointer shadow-md custom-select text-xs font-medium bg-white min-w-32 max-w-40 lg:min-w-40"
            onChange={handleFilterChange}
          >
            <option value="all-products">All Category</option>
            <option value="accessories">Accessories</option>
            <option value="featured">Featured</option>
            <option value="paints">Paints</option>
            <option value="skin-care">Skin Care</option>
            <option value="shirts">T-shirts</option>
          </select>
        </div>
        <div className="custom-select-wrapper">
          <select
            name=""
            id=""
            className="py-2 ps-4 pe-8 rounded-md cursor-pointer shadow-md custom-select text-xs font-medium bg-white min-w-32 max-w-40 lg:min-w-40"
            onChange={handleFilterChange}
          >
            <option>All Filters</option>
          </select>
        </div>
        <div className="custom-select-wrapper">
          <select
            name="sort"
            onChange={handleFilterChange}
            id=""
            className="py-2 ps-4 pe-8 rounded-md cursor-pointer shadow-md custom-select text-xs font-medium bg-white min-w-32 max-w-40 lg:min-w-40"
          >
            <option>Sort By</option>
            <option value="asc price">Price (low to high)</option>
            <option value="desc price">Price (high to low)</option>
            <option value="asc lastUpdated">Newest</option>
            <option value="desc lastUpdated">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
