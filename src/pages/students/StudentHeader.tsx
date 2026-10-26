import { Bell, Settings } from "lucide-react";

const StudentHeader = () => {
  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between z-20 shadow-xs">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight">
            Student Information System
          </h1>
          <p className="text-xs text-slate-500">
            Manage enrollment, demographic stats, promotions & student profiles
          </p>
        </div>
      </div>

      {/* Quick Stats & Controls */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-600">
            Academic Session:{" "}
            <strong className="text-[#142B4A]">2025 - 2026</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 text-slate-500 hover:text-[#142B4A] hover:bg-slate-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>
          <button className="p-2.5 text-slate-500 hover:text-[#142B4A] hover:bg-slate-100 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
