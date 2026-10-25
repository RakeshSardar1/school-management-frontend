import { useState } from "react";
import { useAppSelector } from "../../redux/ReduxHooks";
import { ChevronDown, ChevronRight } from "lucide-react";
export interface SidebarTypesProps {
  active: boolean;
}
const Sidebar: React.FC<SidebarTypesProps> = ({ active = true }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeSubItem, setActiveSubItem] = useState<string | null>();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarCollapsed] = useState<boolean>(false);

  const toggleSubMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
    );
  };

  const { sidebarItems } = useAppSelector((state) => state.common);
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        const isExpanded = expandedMenus.includes(item.id);
        const hasSub = Boolean(item.subItems && item.subItems.length > 0);

        return (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden cursor-pointer hover:cursor-pointer"
          >
            <button
              onClick={() => {
                setActiveTab(item.id);
                if (hasSub) {
                  toggleSubMenu(item.id);
                  if (!activeSubItem && item.subItems) {
                    setActiveSubItem(item.subItems[0]);
                  }
                } else {
                  setActiveSubItem(null);
                }
              }}
              title={sidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                isActive
                  ? "bg-[#3B82F6] text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-[#D6B36A]"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </div>

              {!sidebarCollapsed && !active && (
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        item.badge === "Active" || item.badge === "Live"
                          ? "bg-[#D6B36A]/20 text-[#D6B36A] border border-[#D6B36A]/40"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {hasSub &&
                    (isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    ))}
                </div>
              )}
            </button>

            {/* Expandable Sub-List */}
            {hasSub && isExpanded && !sidebarCollapsed && (
              <div className="ml-4 pl-3 my-1 border-l-2 border-slate-700/60 space-y-1 py-1">
                {item.subItems?.map((sub) => {
                  const isSubActive = activeSubItem === sub && isActive;
                  return (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveTab(item.id);
                        setActiveSubItem(sub);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 flex items-center justify-between ${
                        isSubActive
                          ? "bg-[#3B82F6]/20 text-[#3B82F6] font-bold border-l-2 border-[#3B82F6] pl-2"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      {isSubActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Sidebar;
