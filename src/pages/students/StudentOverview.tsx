import { StudentDrawer } from "../../layouts/Drawer";

import StudentHeader from "./StudentHeader";
import StudentProgressbar from "./progress/StudentProgressbar";

import { StudentToast } from "../../layouts";
import { useAppSelector } from "../../redux/ReduxHooks";
import StudentProgressHOC from "./StudentProgressHOC";
import { StudentAdmissionModal } from "../../layouts/Modal";
import { STUDENT_ADMISSION } from "../../redux/ConstantCommon";
import { StudentsProvider } from "../../context";
import { useStudentHooks } from "../../customHooks";

const StudentsList = () => {
  const { studentsProgress, viewStudentProfile, studentsDirectory } =
    useAppSelector((state) => state.student);

  const { triggerModal, activeModal } = useStudentHooks();

  return (
    <>
      {viewStudentProfile && <StudentToast />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-8 space-y-6">
          <StudentProgressbar />

          <StudentProgressHOC studentsProgress={studentsProgress} />
        </main>
      </div>

      {viewStudentProfile && <StudentDrawer student={viewStudentProfile} />}

      {activeModal && triggerModal === STUDENT_ADMISSION && (
        <StudentAdmissionModal students={studentsDirectory} />
      )}
    </>
  );
};

const StudentOverview = () => {
  return (
    <StudentsProvider>
      <StudentsList />
    </StudentsProvider>
  );
};

export default StudentOverview;
