import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectMenuProps {
  options: SelectOption[];
  value: string;
  label?: (value: string) => void;
  onChange: (value: string) => void;
  onToggle: () => void;
  onClose: () => void;
  isOpen: boolean;
  hasSelected: (value: boolean) => void;
  placeholder: string;
}

const SelectMenu = ({
  options,
  value,
  label,
  onChange,
  onToggle,
  isOpen,
  hasSelected,
  onClose,
  placeholder,
}: SelectMenuProps) => {
  const [position, setPosition] = useState<"bottom" | "top">("bottom");

  const selectedOption = options.find((option) => option.value === value);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const inside = containerRef.current?.contains(event.target as Node);

      if (!inside && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen, onClose]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const button = buttonRef.current;
    const dropdown = dropdownRef.current;

    if (!button || !dropdown) return;

    const buttonRect = button.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (dropdownRect.height > spaceBelow && spaceAbove >= dropdownRect.height) {
      setPosition("top");
    } else {
      setPosition("bottom");
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        id="dropdown-button"
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-lg p-2 outline-1 hover:cursor-pointer ${
          isOpen ? "outline-[#85d65c]" : ""
        }`}
      >
        <span>{selectedOption?.label || placeholder}</span>

        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div
          id="dropdown-menu"
          className={`absolute z-50 flex w-full flex-col rounded-lg bg-white shadow-md shadow-gray-400 ${
            position === "bottom" ? "top-full mt-1" : "bottom-full mb-1"
          }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                hasSelected(true);
                label(option.label);
                onClose();
              }}
              className="cursor-pointer p-1 px-2 text-left hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default SelectMenu;
