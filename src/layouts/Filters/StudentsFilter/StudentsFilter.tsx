import { LayoutGrid, List, Search } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks";
import { changeViewMode } from "../../../redux/reducers/Filters/StudentFiltersReducer";
import type { StudentTypes } from "../../../utilities/types";
import { useStudentHooks } from "../../../customHooks";
import { FilterDropDown } from "../../../components";
import {
  CATEGORIES_DATA,
  GRADES_DATA,
  SECTIONS_DATA,
} from "../../../redux/ConstantCommon";
import { formatOptions } from "../../../utilities/Helpers/converter";

interface StudentTypesProps {
  students: StudentTypes[];
}

interface FilterOptions {
  grades: string[];
  sections: string[];
  categories: string[];
  statuses: string[];
}

const FILTER_OPTIONS: FilterOptions = {
  grades: ["All Grades", ...GRADES_DATA],
  sections: ["All Sections", ...SECTIONS_DATA],
  categories: ["All Categories", ...CATEGORIES_DATA],
  statuses: ["All Statuses", "Active", "On Leave", "Overdue Fees"],
};

const StudentsFilter: React.FC<StudentTypesProps> = () => {
  const dispatch = useAppDispatch();

  const {
    searchQuery,
    setSearchQuery,
    filterGrade,
    setFilterGrade,
    filterSection,
    setFilterSection,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
  } = useStudentHooks();

  const { studentViewMode } = useAppSelector(
    (state) => state.filter.studentsFilter,
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);
  };

  const resetBtn = () => {
    dispatch(changeViewMode("grid"));
    setSearchQuery("");
    setFilterGrade("All");
    setFilterSection("All");
    setFilterCategory("All");
    setFilterStatus("All");
  };

  // Helper function to convert string array to DropdownOption array
  // It also handles converting the first item's value to "All" to match your redux logic
  // console.log(FILTER_OPTIONS.statuses);
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
            onChange={handleSearch}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
        </div>

        {/* Layout View Toggles */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => dispatch(changeViewMode("grid"))}
              className={`p-2 cursor-pointer rounded-lg transition-all ${studentViewMode === "grid" ? "bg-white text-[#142B4A] shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => dispatch(changeViewMode("table"))}
              className={`p-2 cursor-pointer rounded-lg transition-all ${studentViewMode === "table" ? "bg-white text-[#142B4A] shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={resetBtn}
            className="px-3 cursor-pointer py-2 text-xs text-slate-500 hover:text-slate-800 font-medium border border-slate-200 rounded-xl hover:bg-slate-50"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        <FilterDropDown
          label="Grade / Class"
          options={formatOptions(FILTER_OPTIONS.grades)}
          value={filterGrade}
          onChange={setFilterGrade}
        />

        <FilterDropDown
          label="Section"
          options={formatOptions(FILTER_OPTIONS.sections)}
          value={filterSection}
          onChange={setFilterSection}
        />

        <FilterDropDown
          label="Category"
          options={formatOptions(FILTER_OPTIONS.categories)}
          value={filterCategory}
          onChange={setFilterCategory}
        />

        <FilterDropDown
          label="Academic Status"
          options={formatOptions(FILTER_OPTIONS.statuses)}
          value={filterStatus}
          onChange={setFilterStatus}
        />
      </div>
    </div>
  );
};

export default StudentsFilter;
