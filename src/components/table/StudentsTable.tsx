import {
  STUDENT_TABLE_HEADERS,
  type StudentDataTypesProps,
} from "../../utilities/types";
import StudentTableRow from "./StudentTableRow";
import TableHead from "./TableHead";

const StudentsTable: React.FC<StudentDataTypesProps> = ({
  filteredStudents,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <TableHead headers={STUDENT_TABLE_HEADERS} />
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <StudentTableRow student={student} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
