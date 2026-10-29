import { ChevronRight, Download } from "lucide-react";
import React from "react";

const AttendanceHeader = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>Scholix</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[#142B4A]">Attendance Hub</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[#3B82F6] font-bold uppercase tracking-wider">
            {activeSubTab.replace("-", " ")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setIsLocked(!isLocked);
            showToast(
              isLocked
                ? "Attendance unlocked for edits."
                : "Attendance locked for today.",
            );
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            isLocked
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {isLocked ? "Roster Locked" : "Roster Active (Editable)"}
        </button>

        <button
          onClick={() =>
            showToast("Attendance summary exported as PDF & Excel")
          }
          className="flex items-center gap-1.5 text-xs font-bold bg-[#142B4A] hover:bg-slate-900 text-white px-4 py-2 rounded-xl shadow-md transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#D6B36A]" /> Export Attendance
        </button>
      </div>
    </header>
  );
};

export default AttendanceHeader;
