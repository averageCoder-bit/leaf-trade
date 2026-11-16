import { useState } from "react";
import { Search, Settings2, X } from "lucide-react";

interface SearchFilterProps {
  placeholder: string;
  filterTitle: string;
  mobileExpandable?: boolean;
}

const SearchFilter = ({
  placeholder,
  filterTitle,
  mobileExpandable = false,
}: SearchFilterProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Standard search/filter controls, reused on desktop and mobile.
  const searchControls = (
    <div className="flex w-full min-w-0 flex-row items-center gap-3 md:w-auto">
      <div className="relative min-w-0 flex-1 md:flex-none">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />

        <input
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-12 w-full rounded-3xl bg-gray-100 p-3 pl-10 text-sm placeholder:text-black focus:outline-1 md:w-70"
        />
      </div>

      <button
        type="button"
        title={filterTitle}
        aria-label={filterTitle}
        className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <Settings2 size={18} />
      </button>
    </div>
  );

  if (!mobileExpandable) {
    return searchControls;
  }

  return (
    <>
      {/* Mobile: compact search toggle */}
      <div className="flex w-full justify-end md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((previous) => !previous)}
          aria-label={mobileOpen ? "Close search" : "Open search"}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {mobileOpen ? <X size={20} /> : <Search size={20} />}
        </button>
      </div>

      {/* Mobile: expanded search controls */}
      {mobileOpen && <div className="w-full md:hidden">{searchControls}</div>}

      {/* Desktop: always-visible controls */}
      <div className="hidden md:block">{searchControls}</div>
    </>
  );
};

export default SearchFilter;
