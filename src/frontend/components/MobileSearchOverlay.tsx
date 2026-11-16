import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";

interface MobileSearchOverlayProps {
  onClose: () => void;
  onSearch?: (query: string) => void;
}

const MobileSearchOverlay = ({
  onClose,
  onSearch,
}: MobileSearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const searchQuery = query.trim();

    if (!searchQuery || !onSearch) return;

    onSearch(searchQuery);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      className="fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-white md:hidden"
    >
      {/* Search header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-4 py-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to marketplace"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={22} />
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex min-w-0 flex-1 items-center rounded-full bg-gray-100 px-4"
        >
          <Search size={18} className="shrink-0 text-gray-500" />

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for products..."
            aria-label="Search products"
            className="h-11 w-full min-w-0 bg-transparent px-3 text-sm outline-none placeholder:text-gray-500"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200"
            >
              <X size={17} />
            </button>
          )}
        </form>
      </div>

      {/* Search content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <Search size={36} className="text-gray-300" />

          <h2 className="text-base font-semibold text-slate-800">
            Search LeafTrade
          </h2>

          <p className="max-w-xs text-sm text-gray-500">
            Find products from sellers in the community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
