import type { ReactNode, ComponentType } from "react";
import type { StudentProgressTab } from "../../utilities/types";
import StudentDirectory from "./progress/StudentDirectory";
import StudentPipeline from "./progress/StudentPipeline";
import StudentCategory from "./progress/StudentCategory";
import StudentPromote from "./progress/StudentPromote";

const TAB_MAP: Record<StudentProgressTab, ComponentType> = {
  directory: StudentDirectory,
  pipeline: StudentPipeline,
  categories: StudentCategory,
  promote: StudentPromote,
};

interface ShellProps {
  children: ReactNode;
}

interface HocProps {
  studentsProgress: StudentProgressTab;
}

function withStudentData(Wrapped: ComponentType<ShellProps>) {
  return function ComponentWithData({ studentsProgress }: HocProps) {
    const ActiveTab = TAB_MAP[studentsProgress];
    return (
      <Wrapped>
        <ActiveTab />
      </Wrapped>
    );
  };
}

function StudentProgressShell({ children }: ShellProps) {
  return <>{children}</>;
}

const StudentProgressHOC = withStudentData(StudentProgressShell);

export default StudentProgressHOC;
