import { X } from "lucide-react";
import { useState } from "react";
import type { StudentGender, StudentTypes } from "../../../utilities/types";
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
const StudentAdmissionModal = () => {
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [students, setStudents] = useState<StudentTypes[]>(INITIAL_STUDENTS);

  const addToast = (message: string, type: ToastType = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

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
            onClick={() => setIsAdmissionModalOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newStu: StudentTypes = {
              id: `STU-2026-00${students.length + 1}`,
              admissionNo: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
              rollNo: `${100 + students.length + 1}`,
              name: String(formData.get("name") ?? ""),
              avatar:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
              grade: String(formData.get("grade") ?? ""),
              section: String(formData.get("section") ?? ""),
              gender: formData.get("gender") as StudentGender,
              category: String(formData.get("category") ?? ""),
              status: "Active",
              guardianName: String(formData.get("guardianName") ?? ""),
              guardianPhone: String(formData.get("guardianPhone") ?? ""),
              guardianEmail: String(
                formData.get("guardianEmail") || "parent@example.com",
              ),
              attendance: 100,
              feeStatus: "Paid",
              dob: String(formData.get("dob") || "2010-01-01"),
              bloodGroup: "O+",
              address: "Main Street, Campus District",
              admissionDate: new Date().toISOString().split("T")[0],
            };

            setStudents([newStu, ...students]);
            setIsAdmissionModalOpen(false);
            addToast(
              `Student ${newStu.name} admitted successfully!`,
              "success",
            );
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
              onClick={() => setIsAdmissionModalOpen(false)}
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
