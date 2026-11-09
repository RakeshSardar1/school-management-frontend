import { useState } from "react";

import { useDispatch } from "react-redux";
import { currentSubSidebar } from "../../redux/reducers/Common/Common";
import { Icons, NavigationLink } from "../../components";

// --- INITIAL STAFF ROSTER ---
const INITIAL_STAFF_ROSTER = [
  {
    id: "STF-8801",
    name: "Dr. Rebecca Vance",
    role: "Teacher",
    post: "Senior Physics Faculty",
    grade: "Grade A",
    salary: "$78,000 / yr",
    email: "r.vance@scholix.edu",
    phone: "+1 (555) 234-9988",
    bloodGroup: "O+",
    status: "Active Deployed",
    offerStatus: "Signed & Attested",
  },
  {
    id: "STF-8802",
    name: "Marcus Brody",
    role: "Driver",
    post: "Senior Transport Operator",
    grade: "Grade C",
    salary: "$42,000 / yr",
    email: "m.brody@scholix.edu",
    phone: "+1 (555) 876-1122",
    bloodGroup: "A+",
    status: "Active Deployed",
    offerStatus: "Signed & Attested",
  },
  {
    id: "STF-8803",
    name: "Elena Rostova",
    role: "Nurse",
    post: "Campus Head Nurse",
    grade: "Grade B",
    salary: "$58,000 / yr",
    email: "e.rostova@scholix.edu",
    phone: "+1 (555) 345-4455",
    bloodGroup: "B+",
    status: "Active Deployed",
    offerStatus: "Signed & Attested",
  },
];

const StaffsDirectory = () => {
  // const [subItem, setActiveMenu] = useState("overview");
  const [staffList, setStaffList] = useState(INITIAL_STAFF_ROSTER);

  const dispatch = useDispatch();

  const handleNewStaffRegistration = () => {
    dispatch(currentSubSidebar("user-registration"));
  };

  return (
    <div className="p-8 space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase text-slate-400">
              Total Staff Headcount
            </p>
            <h3 className="text-2xl font-black text-[#0F223D] mt-1">
              {staffList.length + 45}
            </h3>
            <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <Icons name="TrendingUp" className="w-3 h-3" />
              +8.5% this session
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
            <Icons name="Users" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase text-slate-400">
              Verified & Attested
            </p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">
              45 / 48
            </h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1">
              93.7% Clearance Rate
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
            <Icons name="ShieldCheck" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase text-slate-400">
              Pending Verification
            </p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">
              3 Candidates
            </h3>
            <p className="text-[10px] text-amber-600 font-bold mt-1 flex items-center gap-1">
              <Icons name="Clock" className="w-3 h-3" /> Awaiting Attestation
            </p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
            <Icons name="AlertTriangle" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase text-slate-400">
              Monthly Payroll Cost
            </p>
            <h3 className="text-2xl font-black text-[#0F223D] mt-1">
              $284,500
            </h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1">
              Active Grade A-C Salaries
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100">
            <Icons name="Wallet" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Department Breakdown & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-[#0F223D] text-sm">
                Staff Distribution by Role & Department
              </h3>
              <p className="text-xs text-slate-400">
                Headcount allocation across institutional Wings
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              10 Operational Roles
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-bold">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-slate-400 text-[10px]">Teachers</p>
              <p className="text-base text-blue-600 font-black mt-1">24</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-slate-400 text-[10px]">Drivers</p>
              <p className="text-base text-indigo-600 font-black mt-1">8</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-slate-400 text-[10px]">Guards</p>
              <p className="text-base text-amber-600 font-black mt-1">6</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-slate-400 text-[10px]">Nurses</p>
              <p className="text-base text-rose-600 font-black mt-1">3</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-slate-400 text-[10px]">Accountants</p>
              <p className="text-base text-emerald-600 font-black mt-1">4</p>
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">
                  Academic Wing (Teachers & Counselors)
                </span>
                <span className="text-slate-800">55%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[55%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">
                  Transport & Security (Drivers & Guards)
                </span>
                <span className="text-slate-800">28%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[28%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">
                  Administration & Health (Nurses & Admin)
                </span>
                <span className="text-slate-800">17%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[17%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Clearance Status Quick Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-[#0F223D] text-sm">
                Clearance Checklist
              </h3>
              <Icons name="BadgeCheck" className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="space-y-2.5 text-xs font-semibold text-slate-700">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icons
                    name="CheckCircle2"
                    className="w-4 h-4 text-emerald-600"
                  />{" "}
                  Govt ID Verified
                </span>
                <span className="font-bold">100%</span>
              </div>
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icons
                    name="CheckCircle2"
                    className="w-4 h-4 text-emerald-600"
                  />{" "}
                  Qualification Certificates
                </span>
                <span className="font-bold">96%</span>
              </div>
              <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icons name="Clock" className="w-4 h-4 text-amber-600" />{" "}
                  Background Checks
                </span>
                <span className="font-bold">92%</span>
              </div>
            </div>
          </div>

          <NavigationLink to="/staffs/employee-onboarding">
            <button
              onClick={handleNewStaffRegistration}
              className="w-full cursor-pointer py-3 bg-[#0F223D] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Icons name="Plus" className="w-4 h-4" />
              <span>Start New Employee Registration</span>
            </button>
          </NavigationLink>
        </div>
      </div>
    </div>
  );
};

export default StaffsDirectory;
