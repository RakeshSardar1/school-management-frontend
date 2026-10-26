import { useMemo } from "react";
import { useAppSelector } from "../../../redux/ReduxHooks";
import { StudentsFilter } from "../../../layouts/Filters";
import { StudentGrid, StudentsTable } from "../../../components";
import type {
  StudentsFilterStateTypes,
  StudentTypes,
} from "../../../utilities/types";

const StudentDirectory = () => {
  // ── Selectors ──
  const {
    studentViewMode,
    searchQuery,
    filterGrade,
    filterSection,
    filterCategory,
    filterStatus,
  } = useAppSelector(
    (state) => state.filter.studentsFilter as StudentsFilterStateTypes,
  );

  const { studentsDirectory } = useAppSelector((state) => state.student);

  // ── Filtered students ──
  const filteredStudents = useMemo<StudentTypes[]>(() => {
    const q = searchQuery.trim().toLowerCase();

    return studentsDirectory.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.admissionNo.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q);

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

  // ── Live stats for the empty state / header ──
  const stats = useMemo(
    () => ({
      total: studentsDirectory.length,
      visible: filteredStudents.length,
      hidden: studentsDirectory.length - filteredStudents.length,
    }),
    [studentsDirectory.length, filteredStudents.length],
  );

  return (
    <div className="space-y-6">
      {/* FILTERS & SEARCH TOOLBAR */}
      <StudentsFilter />

      {/* RESULT SUMMARY */}
      <div className="text-xs text-slate-500">
        Showing <strong className="text-[#142B4A]">{stats.visible}</strong> of{" "}
        <strong className="text-[#142B4A]">{stats.total}</strong> students
        {stats.hidden > 0 && (
          <>
            {" "}
            (<span className="text-amber-600">{stats.hidden} filtered out</span>
            )
          </>
        )}
      </div>

      {/* EMPTY STATE */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-16 text-sm text-slate-400 border border-dashed border-slate-300 rounded-2xl">
          No students match the current filters.
        </div>
      )}

      {/* GRID VIEW */}
      {studentViewMode === "grid" && filteredStudents.length > 0 && (
        <StudentGrid filteredStudents={filteredStudents} />
      )}

      {/* TABLE VIEW */}
      {studentViewMode === "table" && filteredStudents.length > 0 && (
        <StudentsTable filteredStudents={filteredStudents} />
      )}
    </div>
  );
};

export default StudentDirectory;
