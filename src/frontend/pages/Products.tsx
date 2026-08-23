import { Package2, PlusCircle } from "lucide-react";
import SearchFilter from "../components/SearchFilterBar";

const Products = () => {
  return (
    <div className="flex flex-col justify-center items-center overflow-y-auto w-full h-full bg-white rounded-2xl shadow-sm p-4">
      <div className="flex justify-center md:justify-between w-full mb-6">
        <SearchFilter
          placeholder="Search for own listings..."
          filterTitle="Filter listings"
        />
        <button className="hidden md:flex text-sm md:text-base md:flex-row text-white hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c] gap-2 p-3 items-center rounded-4xl hover:cursor-pointer">
          Create listing
          <PlusCircle size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <Package2 size={50} />
        <p className="text-sm md:text-base">
          You currently have no products listed
        </p>
      </div>
    </div>
  );
};

export default Products;
