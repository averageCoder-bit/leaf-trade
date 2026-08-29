import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectMenuProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SelectMenu = ({
  options,
  value,
  onChange,
  placeholder,
}: SelectMenuProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setToggleMenu((prev) => !prev)}
        className="flex w-full items-center justify-between p-2"
      >
        <span>{selectedOption?.label || placeholder}</span>

        {toggleMenu ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {toggleMenu && (
        <div className="absolute z-50 flex w-full flex-col">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setToggleMenu(false);
              }}
              className="p-2 text-left"
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
