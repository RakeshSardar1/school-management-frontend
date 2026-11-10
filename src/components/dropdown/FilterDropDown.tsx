import { useState, useRef, useEffect } from "react";
import { Icons } from "../icons";
import { useLayoutEffect } from "react";
import { createPortal } from "react-dom";

// Define the shape of our options
export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string; // e.g., "Grade / Class"
  options: DropdownOption[];
  value?: string | null; // The currently selected value
  onChange?: (value: string) => void; // Callback when an option is clicked
  defaultValue?: string; // Optional default value to display when no option is selected
}

export default function FilterDropDown({
  label,
  options,
  value,
  defaultValue,
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? "");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    left: number;
    top: number;
    width: number;
    maxHeight: number;
    openAbove: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const gap = 6;
      const margin = 8;
      const below = window.innerHeight - rect.bottom - margin - gap;
      const above = rect.top - margin - gap;
      const openAbove = below < 240 && above > below;
      const maxHeight = Math.max(0, Math.min(240, openAbove ? above : below));

      setMenuPosition({
        left: Math.max(
          margin,
          Math.min(rect.left, window.innerWidth - rect.width - margin),
        ),
        top: openAbove ? rect.top - gap : rect.bottom + gap,
        width: Math.min(rect.width, window.innerWidth - margin * 2),
        maxHeight,
        openAbove,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);
  // Find the label of the currently selected value to display in the button
  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayLabel = selectedOption
    ? selectedOption.label
    : (defaultValue ?? options[0]?.label);

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !dropdownRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
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
    setSelectedValue(optionValue);
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
        ref={triggerRef}
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
      {isOpen &&
        menuPosition &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              left: menuPosition.left,
              top: menuPosition.top,
              width: menuPosition.width,
              maxHeight: menuPosition.maxHeight,
              transform: menuPosition.openAbove
                ? "translateY(-100%)"
                : undefined,
            }}
            className="fixed z-[60] overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
          >
            {!selectedValue && defaultValue && (
              <div className="px-3.5 py-2 text-xs text-slate-400">
                {defaultValue}
              </div>
            )}
            {options.map((option) => {
              const isSelected = selectedValue === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full cursor-pointer text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 hover:text-blue-400 ${
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
          </div>,
          document.body,
        )}
    </div>
  );
}
