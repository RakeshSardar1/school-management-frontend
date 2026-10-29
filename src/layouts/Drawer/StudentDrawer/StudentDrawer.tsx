import { Download, Mail, MapPin, Phone, User, X } from "lucide-react";
import type { StudentTypes } from "../../../utilities/types";
import { viewStudentProfile } from "../../../redux/reducers/StudentReducer/StudentReducer";
import { useAppDispatch } from "../../../redux/ReduxHooks";
interface StudentTypesProps {
  student: StudentTypes;
}
const StudentDrawer: React.FC<StudentTypesProps> = ({ student }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Drawer Header */}
          <div className="bg-[#142B4A] text-white p-6 relative">
            <button
              onClick={() => dispatch(viewStudentProfile(null))}
              className="absolute cursor-pointer top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#D6B36A]"
              />
              <div>
                <h2 className="text-xl font-bold">{student.name}</h2>
                <p className="text-xs text-[#D6B36A] font-medium mt-0.5">
                  {student.grade} - Section {student.section} | Roll No:{" "}
                  {student.rollNo}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-white/10 text-white text-[10px] rounded">
                    {student.admissionNo}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded">
                    {student.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Sections */}
          <div className="p-6 space-y-6 text-slate-700">
            {/* Personal Information */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Personal Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block">Date of Birth</span>
                  <span className="font-semibold text-slate-800">
                    {student.dob}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Blood Group</span>
                  <span className="font-semibold text-slate-800">
                    {student.bloodGroup}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Gender</span>
                  <span className="font-semibold text-slate-800">
                    {student.gender}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Category</span>
                  <span className="font-semibold text-slate-800">
                    {student.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Guardian & Contact */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Guardian Info
              </h4>
              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{student.guardianName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-mono">{student.guardianPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{student.guardianEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{student.address}</span>
                </div>
              </div>
            </div>

            {/* Academic & Attendance Summary */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Academic Performance
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-semibold">
                    Attendance Rate
                  </p>
                  <h3 className="text-xl font-bold text-blue-900 mt-1">
                    {student.attendance}%
                  </h3>
                </div>
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-semibold">
                    Fee Status
                  </p>
                  <h3 className="text-xl font-bold text-emerald-900 mt-1">
                    {student.feeStatus}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            // onClick={() => {
            //   addToast(
            //     `Dispatched full transcript for ${student.name}`,
            //     "success",
            //   );
            // }}
            className="flex items-center gap-2 text-xs font-semibold text-[#142B4A] hover:underline"
          >
            <Download className="w-4 h-4" /> Download Full Record (PDF)
          </button>
          <button
            onClick={() => dispatch(viewStudentProfile(null))}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDrawer;
