import { useState, useRef, useEffect } from "react";
import { Icons } from "../icons";

// Define the shape of our options
export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string; // e.g., "Grade / Class"
  options: DropdownOption[];
  value: string; // The currently selected value
  onChange?: (value: string) => void; // Callback when an option is clicked
}

export default function FilterDropDown({
  label,
  options,
  value,
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the label of the currently selected value to display in the button
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption
    ? selectedOption.label
    : options[0]?.label;

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Add event listener only when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1 relative w-full" ref={dropdownRef}>
      {/* Label */}
      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer flex items-center justify-between bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
      >
        <span className="truncate">{displayLabel}</span>

        <Icons
          name="ChevronDown"
          className={`w-3.5 h-3.5 text-slate-400 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Popup Menu */}
      <div
        className={`absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 max-h-60 overflow-y-auto transform-origin-top transition-all duration-200 cubic-bezier(0.16, 1, 0.3, 1) ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full cursor-pointer text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors hover:text-blue-400 ${
                isSelected
                  ? "text-blue-600 bg-blue-50/50 font-semibold"
                  : "text-slate-700"
              }`}
            >
              <span>{option.label}</span>
              {isSelected && (
                <i className="fa-solid fa-check text-blue-600 text-xs" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
