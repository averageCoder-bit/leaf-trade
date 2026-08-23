import { Search, Settings2 } from "lucide-react";
interface SearchFilterProps {
  placeholder: string;
  filterTitle: string;
}
const SearchFilter = ({ placeholder, filterTitle }: SearchFilterProps) => {
  return (
    <div className="flex flex-row gap-3">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
        <input
          type="search"
          placeholder={placeholder}
          className="rounded-3xl bg-gray-100 p-3 pl-10 w-70 placeholder:text-sm placeholder:text-black focus:outline-1"
        />
      </div>

      <button
        title={filterTitle}
        className="flex items-center justify-center hover:cursor-pointer bg-gray-100 w-12 h-12 rounded-full hover:bg-gray-200"
      >
        <Settings2 size={18} />
      </button>
    </div>
  );
};

export default SearchFilter;
