import type {
  StudentGender,
  StudentRegistrationInProgress,
  StudentTypes,
} from "../../../utilities/types";
import { FilterDropDown, Icons } from "../../../components";
import { formatOptions } from "../../../utilities/Helpers/converter";
import {
  CATEGORIES_DATA,
  GENDER_DATA,
  GRADES_DATA,
  SECTIONS_DATA,
} from "../../../redux/ConstantCommon";
import { useAppDispatch } from "../../../redux/ReduxHooks";
import { currentSubSidebar } from "../../../redux/reducers/Common/Common";
import { useState } from "react";

interface StudentTypesProps {
  students: StudentTypes[];
  close: () => void;
}

const StudentAdmissionModal: React.FC<StudentTypesProps> = ({
  students,
  close,
}) => {
  const dispatch = useAppDispatch();

  const [grade, setGrade] = useState<string>(GRADES_DATA[0]);
  const [section, setSection] = useState<string>(SECTIONS_DATA[0]);
  const [gender, setGender] = useState<string>(GENDER_DATA[0]);
  const [category, setCategory] = useState<string>(CATEGORIES_DATA[0]);

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    dispatch(currentSubSidebar("Admission Process"));
    close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
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
            type="button"
            onClick={closeModal}
            className="text-slate-400 cursor-pointer hover:text-slate-600"
          >
            <Icons name="X" className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            // Check if required fields are filled
            const name = String(formData.get("name") ?? "");
            const guardianName = String(formData.get("guardianName") ?? "");
            const guardianPhone = String(formData.get("guardianPhone") ?? "");

            if (!name || !guardianName || !guardianPhone) {
              alert("Please fill in all required fields.");
              return;
            }

            const newStudentRegistration: StudentRegistrationInProgress = {
              id: `STU-2026-00${students.length + 1}`,
              admissionNo: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
              name: name,

              grade: String(formData.get("grade") ?? ""),
              section: String(formData.get("section") ?? ""),
              gender: formData.get("gender") as StudentGender,
              category: String(formData.get("category") ?? ""),
              guardianName: guardianName,
              guardianPhone: guardianPhone,
              dob: String(formData.get("dob") || "2010-01-01"),
            };
            console.log("newStudentRegistration", newStudentRegistration);
            // dispatch(admissionnewStudent(newStudentRegistration));
            // close();
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Full Student Name *
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="e.g. Rahin Sardar"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FilterDropDown
              label="Target Grade"
              options={formatOptions(GRADES_DATA)}
              value={grade}
              onChange={(val) => setGrade(val)}
            />

            <FilterDropDown
              label="Assigned Section"
              options={formatOptions(SECTIONS_DATA)}
              value={section}
              onChange={(val) => setSection(val)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FilterDropDown
              label="Gender"
              options={formatOptions(GENDER_DATA)}
              value={gender}
              onChange={(val) => setGender(val)}
            />

            <FilterDropDown
              label="Category"
              options={formatOptions(CATEGORIES_DATA)}
              value={category}
              onChange={(val) => setCategory(val)}
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Guardian Name *
            </label>
            <input
              required
              name="guardianName"
              type="text"
              placeholder="e.g. Rakesh Sardar"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Emergency Contact Phone *
              </label>
              <input
                required
                name="guardianPhone"
                type="text"
                placeholder="+91-7076098530"
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
              onClick={closeModal}
              className="px-4 cursor-pointer py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 cursor-pointer py-2 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-blue-600 shadow-md"
            >
              Move to Document Verification &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAdmissionModal;
