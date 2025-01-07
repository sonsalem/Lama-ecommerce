"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
  pagination,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  totalPages: number;
  pagination: boolean;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      {pagination ? (
        <div className="mt-12 flex justify-between w-max gap-4">
          <button
            className="rouneded-md  text-lama text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasPrev}
            onClick={() => createPageUrl(currentPage - 1)}
          >
            Prev
          </button>
          <div className="flex gap-3">
            {totalPages &&
              Array(totalPages)
                .fill(null)
                .map((_, i) => (
                  <button
                    disabled={currentPage === i}
                    key={i}
                    onClick={() => createPageUrl(i)}
                    className={`bg-lama main-transition ring-1 ring-lama cursor-pointer text-white w-[35px] h-[35px] rounded-full  flex items-center justify-center
                      disabled:bg-white disabled:text-lama disabled:cursor-not-allowed
                      `}
                  >
                    {i + 1}
                  </button>
                ))}
          </div>
          <button
            className="rouneded-md  text-lama text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasNext}
            onClick={() => createPageUrl(currentPage + 1)}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Pagination;
