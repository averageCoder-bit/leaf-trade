import { ChevronLeft, ChevronRight } from "lucide-react";
const Pagination = () => {
  return (
    <div className="flex flex-row w-full p-3.5 items-center justify-between">
      <div className="flex flex-row gap-3">
        <button
          title="Go to the previous page"
          className="hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] hover:text-white rounded-full p-2 text-center"
        >
          <ChevronLeft />
        </button>
        <button
          title="Go to the next page"
          className="hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] hover:text-white rounded-full p-2 text-center"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-sm font-medium">Page</p>
        <input
          maxLength={4}
          type="text"
          className="w-10 text-center p-1 text-sm outline outline-gray-200 rounded-sm"
        ></input>
        <p className="text-sm font-medium">of #</p>
      </div>
    </div>
  );
};

export default Pagination;
