import * as LucideIcons from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  currentSidebar,
  currentSubSidebar,
} from "../../redux/reducers/Common/Common";

export interface SidebarTypesProps {
  active: boolean;
}

const Sidebar: React.FC<SidebarTypesProps> = ({ active = true }) => {
  const [activeSubItem, setActiveSubItem] = useState<string | null>();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarCollapsed] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleSubMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
    );
  };

  const { sidebarItems, page, subItem } = useAppSelector(
    (state) => state.common,
  );
  const dispatch = useAppDispatch();

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
      {sidebarItems.map((item) => {
        const isActive = page === item.id;
        const isExpanded = expandedMenus.includes(item.id);
        const hasSub = Boolean(item.subItems && item.subItems.length > 0);

        const Icon = LucideIcons[
          item.icon as keyof typeof LucideIcons
        ] as React.ElementType;

        return (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden cursor-pointer hover:cursor-pointer"
          >
            <button
              onClick={() => {
                dispatch(currentSidebar(item.id));
                if (hasSub) {
                  toggleSubMenu(item.id);
                  if (!activeSubItem && item.subItems) {
                    setActiveSubItem(item.subItems[0].id);
                  }
                } else {
                  setActiveSubItem(null);
                }
                if (item.path) {
                  navigate(item.path);
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
                {Icon && (
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? "text-[#D6B36A]"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                )}
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
                {item.subItems?.map((sub, i) => {
                  const isSubActive = sub.id == subItem;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        dispatch(currentSubSidebar(sub.id));
                        setActiveSubItem(sub.id);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 flex items-center justify-between ${
                        isSubActive
                          ? "bg-[#3B82F6]/20 text-[#3B82F6] font-bold border-l-2 border-[#3B82F6] pl-2"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                      }`}
                    >
                      <span className="truncate">{sub.label}</span>
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
