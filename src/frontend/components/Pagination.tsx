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

  const handlePageSubmit = () => {
    const parsed = Number(pageInput);

    if (!pageInput.trim() || !Number.isInteger(parsed)) {
      setPageInput(String(page));
      return;
    }

    const validPage = Math.max(1, Math.min(parsed, totalPages));

    setPageInput(String(validPage));
    onPageChange(validPage);
  };

  return (
    <div className="flex w-full items-center justify-between gap-3 p-3.5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          title="Go to the previous page"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-full p-2 transition-colors
            hover:cursor-pointer hover:bg-[#85d65c]
            hover:text-white active:bg-[#5fb33a]
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-transparent
            disabled:hover:text-current"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          title="Go to the next page"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-full p-2 transition-colors
            hover:cursor-pointer hover:bg-[#85d65c]
            hover:text-white active:bg-[#5fb33a]
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-transparent
            disabled:hover:text-current"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="page-input" className="text-sm font-medium">
          Page
        </label>

        <input
          id="page-input"
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={pageInput}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setPageInput(value);
            }
          }}
          onBlur={handlePageSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
            if (e.key === "Escape") {
              setPageInput(String(page));
              e.currentTarget.blur();
            }
          }}
          className="w-12 rounded-sm p-1 text-center text-sm
            outline outline-gray-200
            focus:outline-[#85d65c]"
        />

        <p className="text-sm font-medium">of {totalPages}</p>
      </div>
    </div>
  );
};

export default Pagination;
