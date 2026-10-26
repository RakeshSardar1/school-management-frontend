import React from "react";
import type { StudentTypes } from "../../utilities/types";
import { Eye, Send } from "lucide-react";

interface StudentTypesProps {
  student: StudentTypes;
}
const StudentTableRow: React.FC<StudentTypesProps> = ({ student }) => {
  return (
    <>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt=""
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#D6B36A]"
          />
          <div>
            <p className="font-bold text-[#142B4A]">{student.name}</p>
            <p className="text-xs text-slate-400">{student.gender}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <p className="font-mono text-xs text-slate-800">
          {student.admissionNo}
        </p>
        <p className="text-xs text-slate-400">Roll: {student.rollNo}</p>
      </td>
      <td className="py-4 px-6 font-semibold">
        {student.grade} - {student.section}
      </td>
      <td className="py-4 px-6">
        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold border border-slate-200">
          {student.category}
        </span>
      </td>
      <td className="py-4 px-6 font-semibold">
        <span
          className={
            student.attendance >= 90 ? "text-emerald-600" : "text-amber-600"
          }
        >
          {student.attendance}%
        </span>
      </td>
      <td className="py-4 px-6">
        <span
          className={`px-2.5 py-1 text-xs font-bold rounded-full ${
            student.feeStatus === "Paid"
              ? "bg-emerald-100 text-emerald-700"
              : student.feeStatus === "Partial"
                ? "bg-amber-100 text-amber-700"
                : "bg-rose-100 text-rose-700"
          }`}
        >
          {student.feeStatus}
        </span>
      </td>
      <td className="py-4 px-6 font-mono text-xs">{student.guardianPhone}</td>
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            // onClick={() => setSelectedStudent(student)}
            className="p-2 text-slate-500 hover:text-[#3B82F6] hover:bg-slate-100 rounded-lg transition-colors"
            title="View Full Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            // onClick={() =>
            //   addToast(`Sending alert to ${student.name}`, "info")
            // }
            className="p-2 text-slate-500 hover:text-[#142B4A] hover:bg-slate-100 rounded-lg transition-colors"
            title="Send Notice"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </td>
    </>
  );
};

export default StudentTableRow;
