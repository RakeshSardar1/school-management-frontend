import type {
  StudentTypes,
  StudentAdmissionInProgress,
} from "../../../utilities/types";
import { Icons } from "../../../components";
import { useAppDispatch } from "../../../redux/ReduxHooks";
import { currentSubSidebar } from "../../../redux/reducers/Common/Common";
import { useState } from "react";
import StudentRegistrationStep from "./RegistrationSections/StudentRegistrationStep";
import ParentRegistrationStep from "./RegistrationSections/ParentRegistrationStep";

interface StudentTypesProps {
  students: StudentTypes[];
  close: () => void;
}

const StudentAdmissionModal: React.FC<StudentTypesProps> = ({
  students,
  close,
}) => {
  const dispatch = useAppDispatch();

  // 1. State to track the current step
  const [currentStep, setCurrentStep] = useState<"student" | "parent">(
    "student",
  );

  // 2. State to hold the data from Step 1
  const [studentData, setStudentData] = useState<StudentAdmissionInProgress>();

  const [studentHasData, setStudentHasData] = useState(false);
  const [parentHasData, setParentHasData] = useState(false);

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    dispatch(currentSubSidebar("Admission Process"));
    close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
      onClick={() => {
        if (!studentHasData && !parentHasData && !studentData) {
          closeModal();
        }
      }}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[calc(100vh-2rem)] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3. Dynamic Header based on current step */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#142B4A]">
              {currentStep === "student"
                ? "New Student Admission Form"
                : "Parent / Guardian Details"}
            </h3>
            <p className="text-xs text-slate-400">
              {currentStep === "student"
                ? "Register a new student profile in the system"
                : `Student ${studentData?.name} - Provide contact information for the student's parents or guardians`}
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

        {/* 4. Conditionally render the steps */}
        {currentStep === "parent" && (
          <ParentRegistrationStep
            students={students}
            close={closeModal}
            studentData={studentData} // Pass step 1 data into step 2
            onBack={() => setCurrentStep("student")} // Allow going back
            onHasDataChange={(hasData) => setParentHasData(hasData)}
          />
        )}

        {currentStep === "student" && (
          <StudentRegistrationStep
            close={closeModal}
            onNext={(data) => {
              setStudentData(data); // Save step 1 data
              setCurrentStep("parent"); // Move to step 2
            }}
            onHasDataChange={(hasData) => setStudentHasData(hasData)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentAdmissionModal;
