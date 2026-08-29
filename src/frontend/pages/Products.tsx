import { PlusCircle, Plus, Package2 } from "lucide-react";
import SearchFilter from "../components/SearchFilterBar";
import ListingForm from "../forms/ProductListingForm";
import { useState } from "react";

const Products = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto rounded-2xl bg-white p-4 pt-0 shadow-sm">
      <div className="sticky top-0 z-10 mb-6 flex w-full shrink-0 justify-center md:justify-between py-4 bg-white">
        <SearchFilter
          placeholder="Search for own listings..."
          filterTitle="Filter listings"
        />
        <button
          onClick={() => setIsOpenForm(true)}
          className="hidden md:flex text-sm md:text-base text-white hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c] gap-2 p-3 items-center rounded-full md:rounded-4xl hover:cursor-pointer"
        >
          Create listing
          <PlusCircle size={20} />
        </button>
      </div>
      <ListingForm setIsOpenForm={setIsOpenForm} isOpenForm={isOpenForm} />

      {isOpenForm ? null : (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <Package2 size={50} />
          <p className="text-sm md:text-base">
            You currently have no products listed
          </p>
        </div>
      )}

      <div className="flex flex-row justify-end w-full md:hidden">
        {isOpenForm ? null : (
          <button
            title="Create listing"
            onClick={() => setIsOpenForm(true)}
            className="rounded-full hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c] text-white p-3 text-center"
          >
            <Plus size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
