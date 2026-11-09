import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"; // Import base styles
import { format } from "date-fns"; // Recommended for formatting

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  disableTodayAndFuture?: boolean;
}

export const DatePicker = ({
  value,
  onChange,
  disabled,
  disableTodayAndFuture,
}: DatePickerProps) => {
  return (
    <div className="top-full left-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <DayPicker
        mode="single"
        captionLayout="dropdown"
        reverseYears
        selected={value}
        onSelect={onChange}
        disabled={
          disabled || disableTodayAndFuture ? { after: new Date() } : undefined
        }
        showOutsideDays
        // Optional: Use Tailwind to match your #3B82F6 accent
        classNames={{
          selected: "bg-[#3B82F6] text-white rounded-lg",
          today: "text-[#3B82F6] font-bold",
          day: "h-8 w-8 rounded-lg hover:bg-slate-100",
          button_previous: "hover:bg-slate-100 rounded-lg",
          button_next: "hover:bg-slate-100 rounded-lg",
        }}
        footer={
          value ? (
            <p className="text-xs text-slate-500 mt-2">
              Selected: {format(value, "PPP")}
            </p>
          ) : (
            <p className="text-xs text-slate-400 mt-2">Please pick a day.</p>
          )
        }
      />
    </div>
  );
};
