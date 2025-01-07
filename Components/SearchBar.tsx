"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) router.push(`/list?name=${name}`);
    else router.push(`/list`);
  };

  return (
    <form
      className="flex items-center justify-between gap-4 p-2 flex-1 border-2 main-transition border-gray-200 focus-within:shadow-md rounded-lg"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        className="bg-transparent flex-1 focus:border-none focus:outline-none"
        placeholder="Search..."
      />
      <button type="submit" className="cursor-pointer me-1">
        <Image src="/search.png" alt="searchImage" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
