import { X } from "lucide-react";
import type { StudentTypes } from "../../../utilities/types";
import { closeModal } from "../../../redux/reducers/ModalReducer/ModalReducer";
import { useAppDispatch } from "../../../redux/ReduxHooks";

interface StudentTypesProps {
  students: StudentTypes[];
}
const StudentAdmissionModal: React.FC<StudentTypesProps> = ({ students }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#142B4A]">
              New Student Admission Form
            </h3>
            <p className="text-xs text-slate-400">
              Register a new student profile in the system
            </p>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // const formData = new FormData(e.currentTarget);
            // const newStu: StudentTypes = {
            //   id: `STU-2026-00${students.length + 1}`,
            //   admissionNo: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
            //   rollNo: `${100 + students.length + 1}`,
            //   name: String(formData.get("name") ?? ""),
            //   avatar:
            //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            //   grade: String(formData.get("grade") ?? ""),
            //   section: String(formData.get("section") ?? ""),
            //   gender: formData.get("gender") as StudentGender,
            //   category: String(formData.get("category") ?? ""),
            //   status: "Active",
            //   guardianName: String(formData.get("guardianName") ?? ""),
            //   guardianPhone: String(formData.get("guardianPhone") ?? ""),
            //   guardianEmail: String(
            //     formData.get("guardianEmail") || "parent@example.com",
            //   ),
            //   attendance: 100,
            //   feeStatus: "Paid",
            //   dob: String(formData.get("dob") || "2010-01-01"),
            //   bloodGroup: "O+",
            //   address: "Main Street, Campus District",
            //   admissionDate: new Date().toISOString().split("T")[0],
            // };

            // setIsAdmissionModalOpen(false);
            // addToast(
            //   `Student ${newStu.name} admitted successfully!`,
            //   "success",
            // );
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Full Student Name
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="e.g. Charlotte Reed"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Target Grade
              </label>
              <select
                name="grade"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Assigned Section
              </label>
              <select
                name="section"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Gender
              </label>
              <select
                name="gender"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC/ST">SC/ST</option>
                <option value="International">International</option>
                <option value="Sports Quota">Sports Quota</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Guardian Name
            </label>
            <input
              required
              name="guardianName"
              type="text"
              placeholder="e.g. Mark Reed"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Emergency Contact Phone
              </label>
              <input
                required
                name="guardianPhone"
                type="text"
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-blue-600 shadow-md"
            >
              Complete Admission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAdmissionModal;
