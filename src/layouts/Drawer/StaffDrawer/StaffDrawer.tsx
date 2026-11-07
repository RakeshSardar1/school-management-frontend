import { Icons } from "../../../components";
import type { StaffDrawerViewModel } from "../../../utilities/types";

interface StaffsDrawerPropsTypes {
  selectedMemberDrawer: StaffDrawerViewModel;
}

const StaffDrawer: React.FC<StaffsDrawerPropsTypes> = ({
  selectedMemberDrawer,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-[#0F223D] text-base">
                {selectedMemberDrawer.name}
              </h3>
              <p className="text-xs text-slate-400 font-semibold">
                {selectedMemberDrawer.id} • {selectedMemberDrawer.role}
              </p>
            </div>
            <button
              // onClick={() => setSelectedMemberDrawer(null)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
            >
              <Icons className="w-4 h-4" name="X" />
            </button>
          </div>

          <div className="mt-6 space-y-3 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Post:</span>
                <span className="font-bold">{selectedMemberDrawer.post}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grade:</span>
                <span className="font-bold">{selectedMemberDrawer.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Annual CTC:</span>
                <span className="font-bold">{selectedMemberDrawer.salary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Attestation:</span>
                <span className="font-extrabold text-emerald-600">
                  {selectedMemberDrawer.offerStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          // onClick={() => setSelectedMemberDrawer(null)}
          className="w-full py-3 bg-[#0F223D] text-white text-xs font-bold rounded-xl shadow-md"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};

export default StaffDrawer;
