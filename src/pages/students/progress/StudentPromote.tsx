import { ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { useState } from "react";
import type { StudentTypes } from "../../../utilities/types";

const INITIAL_STUDENTS: StudentTypes[] = [
  {
    id: "STU-2026-001",
    admissionNo: "ADM-9481",
    rollNo: "101",
    name: "Alexander Vance",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    grade: "Grade 10",
    section: "A",
    gender: "Male",
    category: "General",
    status: "Active",
    guardianName: "Robert Vance",
    guardianPhone: "+1 (555) 234-5678",
    guardianEmail: "robert.vance@example.com",
    attendance: 96.4,
    feeStatus: "Paid",
    dob: "2010-04-12",
    bloodGroup: "O+",
    address: "742 Evergreen Terrace, Springfield",
    admissionDate: "2021-08-15",
  },
  {
    id: "STU-2026-002",
    admissionNo: "ADM-9482",
    rollNo: "102",
    name: "Sophia Chen",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    grade: "Grade 10",
    section: "A",
    gender: "Female",
    category: "International",
    status: "Active",
    guardianName: "David Chen",
    guardianPhone: "+1 (555) 876-5432",
    guardianEmail: "david.chen@example.com",
    attendance: 98.2,
    feeStatus: "Paid",
    dob: "2010-09-21",
    bloodGroup: "A+",
    address: "128 Beacon St, Boston, MA",
    admissionDate: "2022-01-10",
  },
  {
    id: "STU-2026-003",
    admissionNo: "ADM-9483",
    rollNo: "103",
    name: "Marcus Aurelius Thorne",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    grade: "Grade 10",
    section: "B",
    gender: "Male",
    category: "Sports Quota",
    status: "On Leave",
    guardianName: "Helena Thorne",
    guardianPhone: "+1 (555) 345-6789",
    guardianEmail: "helena.t@example.com",
    attendance: 84.1,
    feeStatus: "Partial",
    dob: "2010-02-05",
    bloodGroup: "B+",
    address: "450 Ocean Drive, Miami, FL",
    admissionDate: "2021-08-15",
  },
  {
    id: "STU-2026-004",
    admissionNo: "ADM-9484",
    rollNo: "104",
    name: "Aaliyah Patel",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    grade: "Grade 9",
    section: "A",
    gender: "Female",
    category: "OBC",
    status: "Active",
    guardianName: "Rajesh Patel",
    guardianPhone: "+1 (555) 456-7890",
    guardianEmail: "rajesh.patel@example.com",
    attendance: 94.8,
    feeStatus: "Paid",
    dob: "2011-06-30",
    bloodGroup: "AB+",
    address: "88 Lincoln Blvd, Chicago, IL",
    admissionDate: "2023-08-20",
  },
  {
    id: "STU-2026-005",
    admissionNo: "ADM-9485",
    rollNo: "105",
    name: "Liam O'Connor",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    grade: "Grade 11",
    section: "C",
    gender: "Male",
    category: "General",
    status: "Overdue",
    guardianName: "Sean O'Connor",
    guardianPhone: "+1 (555) 567-8901",
    guardianEmail: "s.oconnor@example.com",
    attendance: 79.5,
    feeStatus: "Overdue",
    dob: "2009-11-14",
    bloodGroup: "O-",
    address: "12 Pinehurst Ave, Seattle, WA",
    admissionDate: "2020-09-01",
  },
  {
    id: "STU-2026-006",
    admissionNo: "ADM-9486",
    rollNo: "106",
    name: "Zoe Kravitz-Smith",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    grade: "Grade 12",
    section: "A",
    gender: "Female",
    category: "SC/ST",
    status: "Active",
    guardianName: "Diana Smith",
    guardianPhone: "+1 (555) 678-9012",
    guardianEmail: "diana.smith@example.com",
    attendance: 99.1,
    feeStatus: "Paid",
    dob: "2008-01-08",
    bloodGroup: "A-",
    address: "505 Sunset Blvd, Los Angeles, CA",
    admissionDate: "2019-08-12",
  },
];
type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const StudentPromote = () => {
  // Directory State
  const [students, setStudents] = useState<StudentTypes[]>(INITIAL_STUDENTS);
  // Admission Pipeline State

  // Batch Promotion Tool State
  const [promotionStep, setPromotionStep] = useState(1);
  const [sourceGrade, setSourceGrade] = useState("Grade 10");
  const [targetGrade, setTargetGrade] = useState("Grade 11");
  const [selectedPromoteIds, setSelectedPromoteIds] = useState<string[]>([]);
  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-[#142B4A]">
          Academic Session Batch Promotion Tool
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Promote eligible students to the next academic level for Session
          2026-2027.
        </p>
      </div>

      {/* STEPS INDICATOR */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        {[
          { step: 1, title: "Select Class & Source" },
          { step: 2, title: "Verify Passing Criteria" },
          { step: 3, title: "Execute Promotion" },
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                promotionStep >= s.step
                  ? "bg-[#142B4A] text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {s.step}
            </div>
            <span
              className={`text-sm font-semibold ${promotionStep >= s.step ? "text-[#142B4A]" : "text-slate-400"}`}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: CLASS SELECTION */}
      {promotionStep === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-2 block">
                Promote From (Current Class)
              </label>
              <select
                value={sourceGrade}
                onChange={(e) => setSourceGrade(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-2 block">
                Promote To (Destination Class)
              </label>
              <select
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              >
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12 (Graduating Class)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setPromotionStep(2)}
              className="px-6 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
            >
              Continue to Student Selection <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: MULTI-SELECT STUDENT TABLE */}
      {promotionStep === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-700 text-sm">
              Select Students from {sourceGrade} to promote to {targetGrade}
            </h3>
            <button
              onClick={() => {
                const allIds = students
                  .filter((s) => s.grade === sourceGrade)
                  .map((s) => s.id);
                setSelectedPromoteIds(
                  selectedPromoteIds.length === allIds.length ? [] : allIds,
                );
              }}
              className="text-xs font-semibold text-[#3B82F6] hover:underline"
            >
              Toggle Select All
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-xs text-slate-500 uppercase sticky top-0">
                <tr>
                  <th className="p-3 text-center">Select</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">Fee Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {students
                  .filter((s) => s.grade === sourceGrade)
                  .map((student) => {
                    const isChecked = selectedPromoteIds.includes(student.id);
                    return (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedPromoteIds(
                                  selectedPromoteIds.filter(
                                    (id) => id !== student.id,
                                  ),
                                );
                              } else {
                                setSelectedPromoteIds([
                                  ...selectedPromoteIds,
                                  student.id,
                                ]);
                              }
                            }}
                            className="w-4 h-4 accent-[#3B82F6] rounded"
                          />
                        </td>
                        <td className="p-3 font-bold text-[#142B4A]">
                          {student.name}
                        </td>
                        <td className="p-3 font-mono">{student.rollNo}</td>
                        <td className="p-3 font-semibold text-emerald-600">
                          {student.attendance}%
                        </td>
                        <td className="p-3 font-semibold">
                          {student.feeStatus}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setPromotionStep(1)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (selectedPromoteIds.length === 0) {
                  addToast("Select at least one student to promote", "warning");
                  return;
                }
                setPromotionStep(3);
              }}
              className="px-6 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
            >
              Review & Confirm ({selectedPromoteIds.length}){" "}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: EXECUTE PROMOTION */}
      {promotionStep === 3 && (
        <div className="space-y-6 text-center py-6">
          <div className="w-16 h-16 bg-blue-100 text-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-[#142B4A]">
            Ready to Promote Batch
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You are about to promote{" "}
            <strong className="text-[#142B4A]">
              {selectedPromoteIds.length} students
            </strong>{" "}
            from <strong className="text-[#142B4A]">{sourceGrade}</strong> to{" "}
            <strong className="text-[#142B4A]">{targetGrade}</strong>.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setPromotionStep(2)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => {
                setStudents((prev) =>
                  prev.map((s) =>
                    selectedPromoteIds.includes(s.id)
                      ? { ...s, grade: targetGrade }
                      : s,
                  ),
                );
                addToast(
                  `Batch promotion completed! ${selectedPromoteIds.length} students updated.`,
                  "success",
                );
                setPromotionStep(1);
                setSelectedPromoteIds([]);
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm & Process Batch
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPromote;
