import { PanelLeftClose, PanelLeftOpen, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

const SidebarList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <aside
      className={`${
        sidebarCollapsed ? "w-20" : "w-64"
      }  transition-all duration-300 bg-[#142B4A] text-white flex flex-col justify-between shrink-0 sticky top-0 h-screen z-30 shadow-xl`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo Bar */}
        <div className="p-5 flex items-center justify-between border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-black text-lg shadow-md border-2 border-[#D6B36A]">
                S
              </div>
              {/* Gold Accent Mark */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#D6B36A] ring-2 ring-[#142B4A]" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <span className="font-black text-xl tracking-tight text-white">
                  scholix
                </span>
                <span className="block text-[8px] font-bold tracking-widest uppercase text-[#D6B36A] -mt-1">
                  Management Hub
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Main Menu Navigation */}
        <Sidebar active={sidebarCollapsed} />

        {/* User Profile Footer */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-slate-700/60 m-3 rounded-2xl bg-slate-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D6B36A] text-[#142B4A] font-black text-xs flex items-center justify-center shadow-md">
                SA
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">
                  Super Admin
                </p>
                <p className="text-[10px] text-slate-300 truncate">
                  scholix.edu
                </p>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarList;
