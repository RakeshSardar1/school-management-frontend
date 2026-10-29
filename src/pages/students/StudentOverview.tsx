import { StudentDrawer } from "../../layouts/Drawer";

import StudentHeader from "./StudentHeader";
import StudentProgressbar from "./progress/StudentProgressbar";

import { StudentToast } from "../../layouts";
import { useAppSelector } from "../../redux/ReduxHooks";
import StudentProgressHOD from "./StudentProgressHOD";
import { StudentAdmissionModal } from "../../layouts/Modal";
import { STUDENT_ADMISSION } from "../../redux/ConstantCommon";

export default function StudentOverview() {
  // Navigation & Active Sub-Tab
  const { studentsProgress, viewStudentProfile, studentsDirectory } =
    useAppSelector((state) => state.student);

  const { triggerModal, activeModal } = useAppSelector((state) => state.modal);

  return (
    <>
      {/* Toast System */}
      {viewStudentProfile && <StudentToast />}

      {/* SIDEBAR NAVIGATION */}

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP HEADER */}
        <StudentHeader />

        {/* MAIN MODULE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-8 space-y-6">
          <StudentProgressbar />

          <StudentProgressHOD studentsProgress={studentsProgress} />
        </main>
      </div>

      {/* STUDENT PROFILE SLIDE-OUT DRAWER */}
      {viewStudentProfile && <StudentDrawer student={viewStudentProfile} />}

      {/* NEW ADMISSION MODAL */}
      {activeModal && triggerModal === STUDENT_ADMISSION && (
        <StudentAdmissionModal students={studentsDirectory} />
      )}
    </>
  );
}
