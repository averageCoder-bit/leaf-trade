import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const [pageInput, setPageInput] = useState(String(page));

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  const handlePageChange = () => {
    const value = Number(pageInput);

    if (
      !pageInput.trim() ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > totalPages
    ) {
      setPageInput(String(page));
      return;
    }

    setPageInput(String(value));

    if (value !== page) {
      onPageChange(value);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Marketplace pagination"
      className="flex w-full items-center justify-center gap-4 p-4"
    >
      <button
        type="button"
        aria-label="Previous page"
        title="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-full p-2 transition-colors
          hover:bg-[#85d65c] hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:bg-transparent
          disabled:hover:text-current
          hover:cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2 text-sm">
        <span>Page</span>

        <input
          aria-label="Page number"
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={pageInput}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setPageInput(e.target.value);
            }
          }}
          onBlur={handlePageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }

            if (e.key === "Escape") {
              setPageInput(String(page));
            }
          }}
          className="w-12 rounded-md border border-gray-200
            p-1 text-center text-sm outline-none
            focus:border-[#75cf4c]"
        />

        <span>of {totalPages}</span>
      </div>

      <button
        type="button"
        aria-label="Next page"
        title="Next page"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-full p-2 transition-colors
          hover:bg-[#85d65c] hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:bg-transparent
          disabled:hover:text-current
          hover:cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;
