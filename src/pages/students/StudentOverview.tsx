import { StudentDrawer } from "../../layouts/Drawer";

import StudentHeader from "./StudentHeader";
import StudentProgressbar from "./progress/StudentProgressbar";

import { StudentAdmissionModal } from "../../layouts/Modal";
import { StudentToast } from "../../layouts";
import { useAppSelector } from "../../redux/ReduxHooks";
import StudentProgressHOD from "./StudentProgressHOD";

export default function StudentOverview() {
  // Navigation & Active Sub-Tab
  const { studentsProgress } = useAppSelector((state) => state.student);

  return (
    <>
      {/* Toast System */}
      {false && <StudentToast />}

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
      {false && <StudentDrawer />}

      {/* NEW ADMISSION MODAL */}
      {false && <StudentAdmissionModal />}
    </>
  );
}
