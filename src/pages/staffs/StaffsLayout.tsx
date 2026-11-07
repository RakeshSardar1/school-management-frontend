import { Icons } from "../../components";
import { RouteOutlet } from "../../layouts";
import { useAppSelector } from "../../redux/ReduxHooks";

// interface StaffsLayoutLayoutPropsTypes {
//   // subItem: string;
// }

const StaffsLayout: React.FC = () => {
  const { subItem } = useAppSelector((state) => state.common);

  return (
    <div className="bg-slate-100/70 text-slate-800 antialiased h-screen flex overflow-hidden font-sans">
      {/* MAIN VIEW AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F8FAFC]">
        {/* Top Header */}
        {/* <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between z-10 shadow-sm sticky top-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Scholix</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#142B4A] font-semibold">
              Human Resources
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-[#3B82F6] font-semibold bg-[#3B82F6]/10 px-2 py-0.5 rounded-md">
              {subItem === "staffs-overview"
                ? "Staff Overview & Department Analytics"
                : "4-Step Employee Registration Pipeline"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {
              <button
                // onClick={() => dispatch(currentSubSidebar("user-registration"))}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all"
              >
                <Icons name="UserPlus" className="w-4 h-4" />
                <span>Onboard New Staff</span>
              </button>
            }
            <span className="text-xs font-bold text-slate-500">
              Academic Session: 2026-27
            </span>
          </div>
        </header> */}
        <RouteOutlet />
      </main>
    </div>
  );
};

export default StaffsLayout;
