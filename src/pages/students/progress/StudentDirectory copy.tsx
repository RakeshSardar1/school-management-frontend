import { useAppSelector } from "../../../redux/ReduxHooks";
import { StudentsFilter } from "../../../layouts/Filters";
import { StudentGrid, StudentsTable } from "../../../components";
import { useMemo } from "react";

const StudentDirectory = () => {
  const {
    studentViewMode,
    searchQuery,
    filterGrade,
    filterSection,
    filterCategory,
    filterStatus,
  } = useAppSelector((state) => state.filter.studentsFilter);

  const { studentsDirectory } = useAppSelector((state) => state.student);

  const filteredStudents = useMemo(() => {
    return studentsDirectory.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.includes(searchQuery);
      const matchesGrade = filterGrade === "All" || s.grade === filterGrade;
      const matchesSection =
        filterSection === "All" || s.section === filterSection;
      const matchesCategory =
        filterCategory === "All" || s.category === filterCategory;
      const matchesStatus = filterStatus === "All" || s.status === filterStatus;
      return (
        matchesSearch &&
        matchesGrade &&
        matchesSection &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    studentsDirectory,
    searchQuery,
    filterGrade,
    filterSection,
    filterCategory,
    filterStatus,
  ]);

  return (
    <div className="space-y-6">
      {/* FILTERS & SEARCH TOOLBAR */}
      <StudentsFilter />

      {/* GRID VIEW */}
      {studentViewMode === "grid" && (
        <StudentGrid filteredStudents={filteredStudents} />
      )}

      {/* TABLE VIEW */}
      {studentViewMode === "table" && <StudentsTable />}
    </div>
  );
};

export default StudentDirectory;
