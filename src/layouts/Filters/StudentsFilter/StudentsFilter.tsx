import { LayoutGrid, List, Search } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks";
import { changeViewMode } from "../../../redux/reducers/Filters/StudentFiltersReducer";
const StudentsFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");
  const [filterSection, setFilterSection] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const dispatch = useAppDispatch();

  const { studentViewMode } = useAppSelector(
    (state) => state.filter.studentsFilter,
  );

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or admission ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
        </div>

        {/* Layout View Toggles */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => dispatch(changeViewMode("grid"))}
              className={`p-2 rounded-lg transition-all ${studentViewMode === "grid" ? "bg-white text-[#142B4A] shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => dispatch(changeViewMode("table"))}
              className={`p-2 rounded-lg transition-all ${studentViewMode === "table" ? "bg-white text-[#142B4A] shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 font-medium border border-slate-200 rounded-xl hover:bg-slate-50">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1 block">
            Grade / Class
          </label>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            <option value="All">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1 block">
            Section
          </label>
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            <option value="All">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1 block">
            Category
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC/ST">SC/ST</option>
            <option value="International">International</option>
            <option value="Sports Quota">Sports Quota</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1 block">
            Academic Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Overdue">Overdue Fees</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StudentsFilter;
