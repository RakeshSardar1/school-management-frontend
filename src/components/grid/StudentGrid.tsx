import type { StudentDataTypesProps } from "../../utilities/types";
import { StudentCard } from "../cards";

const StudentGrid: React.FC<StudentDataTypesProps> = ({ filteredStudents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredStudents.map((student) => (
        <div
          key={student.id}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col justify-between"
        >
          <StudentCard student={student} />
        </div>
      ))}
    </div>
  );
};

export default StudentGrid;
