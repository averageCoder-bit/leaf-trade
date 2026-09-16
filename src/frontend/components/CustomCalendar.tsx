import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  type?: "year" | "date" | "month";
  value: string;
  onChange: (year: string) => void;
  minYear?: number;
  maxYear?: number;
}

export default function CustomCalendar({
  value,
  onChange,
  minYear = new Date().getFullYear() - 100,
  maxYear = new Date().getFullYear(),
}: CustomCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  // Use the selected year as the starting point.
  // Otherwise, start around the current year.
  const selectedYear = Number(value);

  const [yearPage, setYearPage] = useState(
    Number.isInteger(selectedYear) && selectedYear >= minYear
      ? selectedYear
      : currentYear,
  );

  const startYear = yearPage - 5;

  const years = Array.from({ length: 12 }, (_, index) => {
    return startYear + index;
  });

  const handleYearSelect = (year: number) => {
    onChange(String(year));
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={value}
          maxLength={4}
          placeholder="YYYY"
          onChange={(e) => {
            const input = e.target.value;

            // Only allow numbers
            if (/^\d*$/.test(input)) {
              onChange(input);
            }
          }}
          className="
            w-full rounded-xl
            bg-gray-100/70
            p-2 pr-10
            text-right
            outline outline-black/10
            focus:bg-white
            focus:outline-[#85d65c]
          "
        />

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            absolute right-2 top-1/2
            -translate-y-1/2
            rounded-lg p-1.5
            text-gray-500
            hover:bg-gray-200
            hover:text-gray-700
            hover:cursor-pointer
          "
          aria-label="Select year"
        >
          <CalendarDays size={18} />
        </button>
      </div>

      {/* Year Picker */}
      {isOpen && (
        <div
          className="
            absolute right-0 top-full z-50 mt-2
            w-64 rounded-xl
            border border-black/10
            bg-white p-4
            shadow-lg
          "
        >
          {/* Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setYearPage((prev) => prev - 12)}
              className="rounded-lg p-2 hover:bg-gray-100"
              disabled={startYear <= minYear}
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm font-semibold">
              {startYear} – {startYear + 11}
            </span>

            <button
              type="button"
              onClick={() => setYearPage((prev) => prev + 12)}
              className="rounded-lg p-2 hover:bg-gray-100"
              disabled={startYear + 11 >= maxYear}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Years */}
          <div className="grid grid-cols-3 gap-2">
            {years.map((year) => {
              const isSelected = value === String(year);
              const isDisabled = year < minYear || year > maxYear;

              return (
                <button
                  key={year}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleYearSelect(year)}
                  className={`
                    rounded-lg py-2
                    text-sm
                    transition

                    ${
                      isSelected
                        ? "bg-[#75cf4c] text-white"
                        : isDisabled
                          ? "cursor-not-allowed text-gray-300"
                          : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
