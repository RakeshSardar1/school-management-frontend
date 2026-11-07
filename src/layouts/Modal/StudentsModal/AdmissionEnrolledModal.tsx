import React, { useState } from "react";
import type { StudentTypes } from "../../../utilities/types";
import { Icons } from "../../../components";
import { useAppSelector } from "../../../redux/ReduxHooks";

export default function AdmissionEnrolledModal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("All");
  const [feeFilter, setFeeFilter] = useState<string>("All");

  const { studentsDirectory } = useAppSelector((state) => state.student);
  const MOCK_STUDENTS: StudentTypes[] = studentsDirectory; // Replace with actual data from Redux or <API></API>

  // Derived filtered data
  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.includes(searchQuery);
    const matchesGrade = gradeFilter === "All" || student.grade === gradeFilter;
    const matchesFee = feeFilter === "All" || student.feeStatus === feeFilter;

    return matchesSearch && matchesGrade && matchesFee;
  });

  // Stats (for summary cards)
  const totalStudents = MOCK_STUDENTS.length;
  const feesCollected = MOCK_STUDENTS.filter(
    (s) => s.feeStatus === "Paid",
  ).length;
  const pendingFees = MOCK_STUDENTS.filter(
    (s) => s.feeStatus !== "Paid",
  ).length;
  const averageAttendance = Math.round(
    MOCK_STUDENTS.reduce((acc, s) => acc + s.attendance, 0) / totalStudents,
  );

  // Helper for status colors
  const getFeeBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Overdue":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Enrolled Students
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage and view all admitted students in the system.
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2 w-fit">
            <Icons name="Plus" className="w-4 h-4" />
            Add New Student
          </button>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Students
              </span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Icons name="Users" className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {totalStudents}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fees Collected
              </span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Icons name="CheckCircle2" className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {feesCollected}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Fees
              </span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Icons name="AlertCircle" className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {pendingFees}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Avg Attendance
              </span>
              <span className="p-2 bg-violet-50 text-violet-600 rounded-lg">
                <Icons name="BarChart" className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {averageAttendance}%
            </p>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Icons
                name="Search"
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search by name, roll no, admission no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Grades</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
            </select>
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Fee Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Roll No / Adm No</th>
                  <th className="px-6 py-4">Grade & Section</th>
                  <th className="px-6 py-4">Guardian Contact</th>
                  <th className="px-6 py-4">Attendance</th>
                  <th className="px-6 py-4">Fee Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icons
                          name="SearchX"
                          className="w-8 h-8 text-slate-300"
                        />
                        <p className="text-sm">
                          No students found matching your criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Student Info */}
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                              {student.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {student.gender} • {student.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      {/* Roll / Adm */}
                      <td className="px-6 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-700">
                            #{student.rollNo}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {student.admissionNo}
                          </span>
                        </div>
                      </td>
                      {/* Grade */}
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {student.grade}{" "}
                          <span className="mx-1 text-slate-400">|</span>{" "}
                          {student.section}
                        </span>
                      </td>
                      {/* Guardian */}
                      <td className="px-6 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-700">
                            {student.guardianName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {student.guardianPhone}
                          </span>
                        </div>
                      </td>
                      {/* Attendance */}
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                student.attendance >= 90
                                  ? "bg-emerald-500"
                                  : student.attendance >= 75
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                              }`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">
                            {student.attendance}%
                          </span>
                        </div>
                      </td>
                      {/* Fee Status */}
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getFeeBadge(student.feeStatus)}`}
                        >
                          {student.feeStatus}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Profile"
                          >
                            <Icons name="Eye" className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Pay Fees"
                          >
                            <Icons name="CreditCard" className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                            title="More Options"
                          >
                            <Icons name="MoreVertical" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination (Mock) */}
          {filteredStudents.length > 0 && (
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing <strong>{filteredStudents.length}</strong> of{" "}
                <strong>{MOCK_STUDENTS.length}</strong> students
              </span>
              <div className="flex items-center gap-1">
                <button
                  className="px-2 py-1 border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-50"
                  disabled
                >
                  Prev
                </button>
                <button className="px-2 py-1 border border-slate-200 rounded-md bg-blue-600 text-white font-semibold">
                  1
                </button>
                <button className="px-2 py-1 border border-slate-200 rounded-md hover:bg-slate-100">
                  2
                </button>
                <button className="px-2 py-1 border border-slate-200 rounded-md hover:bg-slate-100">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
