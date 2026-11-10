import type {
  ProgressKeysTypes,
  PipeLineLeadsTypes,
} from "../../utilities/types";
import {
  AdmissionEntranceExamModal,
  AdmissionFeesModalForm,
  AdmissionProcessModal,
} from "../../layouts/Modal";

interface StudentAdmissionHOCProps {
  student: PipeLineLeadsTypes;
  studentCount: number;
  studentAdmissionStatus: ProgressKeysTypes;
  onClose: () => void;
  onNext: () => void;
}

/**
 * Wrapper component that dynamically renders the correct admission modal
 * based on the current stage of the student's progress.
 */
export default function StudentAdmissionHOC({
  student,
  studentCount,
  studentAdmissionStatus,
  onClose,
  onNext,
}: StudentAdmissionHOCProps) {
  // 1. Document Verification Stage
  if (studentAdmissionStatus === "doc_verification") {
    return (
      <AdmissionProcessModal
        student={student}
        studentCount={studentCount}
        close={onClose}
        onAdvanced={onNext}
      />
    );
  }

  // 2. Entrance Exam Stage
  if (studentAdmissionStatus === "entrance_test") {
    return (
      <AdmissionEntranceExamModal
        studentCount={studentCount}
        student={student}
        close={onClose}
        onAdvanced={onNext}
      />
    );
  }

  // 3. Fee Payment Stage
  if (studentAdmissionStatus === "fee_paid") {
    return (
      <AdmissionFeesModalForm
        student={student}
        close={onClose}
        onSuccess={onNext}
      />
    );
  }

  // Fallback if the status doesn't match any known stage
  console.warn(`No modal mapped for stage: ${studentAdmissionStatus}`);
  return null;
}
