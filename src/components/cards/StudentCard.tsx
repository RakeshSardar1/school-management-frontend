import { Edit3, Eye, Send } from "lucide-react";
import type { StudentTypes } from "../../utilities/types";

interface StudentTypesProps {
  student: StudentTypes;
}

const StudentCard: React.FC<StudentTypesProps> = ({ student }) => {
  return (
    <>
      <div className="p-6">
        {/* Header Badge */}
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 font-mono text-xs font-semibold rounded-lg border border-slate-200">
            {student.admissionNo}
          </span>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              student.status === "Active"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : student.status === "On Leave"
                  ? "bg-amber-50 text-amber-600 border border-amber-200"
                  : "bg-rose-50 text-rose-600 border border-rose-200"
            }`}
          >
            {student.status}
          </span>
        </div>

        {/* Student Avatar & Basic Info */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-[#D6B36A]/40 group-hover:ring-[#D6B36A] transition-all"
            />
            <span className="absolute bottom-0 right-0 px-1.5 py-0.5 bg-[#142B4A] text-white font-bold text-[10px] rounded-md border border-white">
              {student.rollNo}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-[#142B4A] text-base group-hover:text-[#3B82F6] transition-colors leading-tight">
              {student.name}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {student.grade} - {student.section}
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-md">
              {student.category}
            </span>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Guardian:</span>
            <span className="font-medium text-slate-700">
              {student.guardianName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Emergency Contact:</span>
            <span className="font-mono text-slate-700">
              {student.guardianPhone}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Attendance Rate:</span>
            <span
              className={`font-semibold ${student.attendance >= 90 ? "text-emerald-600" : "text-amber-600"}`}
            >
              {student.attendance}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Fee Status:</span>
            <span
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                student.feeStatus === "Paid"
                  ? "bg-emerald-100 text-emerald-700"
                  : student.feeStatus === "Partial"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
              }`}
            >
              {student.feeStatus}
            </span>
          </div>
        </div>
      </div>
      {/* Card Actions Footer */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-800 transition-colors">
          <Eye className="w-4 h-4" /> Full Profile
        </button>
        <div className="flex items-center gap-2">
          <button
            // onClick={() =>
            //   addToast(
            //     `Notice dispatched to ${student.name}'s guardian`,
            //     "info",
            //   )
            // }
            className="p-2 text-slate-400 hover:text-[#142B4A] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="Send Notification"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
          <button
            // onClick={() =>
            //   addToast(`Opening edit state for ${student.name}`, "info")
            // }
            className="p-2 text-slate-400 hover:text-[#142B4A] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="Edit Record"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentCard;
