import { NewAdmissionButton } from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks";
import { changeProgress } from "../../../redux/reducers/StudentReducer/StudentReducer";
import type { StudentProgressTab } from "../../../utilities/types";

const StudentProgressbar = () => {
  const dispatch = useAppDispatch();
  const { studentsProgress, studentProgressBar } = useAppSelector(
    (state) => state.student,
  );

  const chooseProgress = (id: StudentProgressTab) => {
    dispatch(changeProgress(id));
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div className="flex items-center gap-2 bg-slate-200/60 p-1 rounded-xl">
        {studentProgressBar.map((tab) => {
          const Icon = tab.icon;
          const isActive = studentsProgress === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => chooseProgress(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#142B4A] text-white shadow-md"
                  : "text-slate-600 hover:text-[#142B4A] hover:bg-slate-200/80"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-[#D6B36A]" : "text-slate-500"}`}
              />
              {tab.label}
            </button>
          );
        })}
      </div>
      {studentsProgress === "directory" && <NewAdmissionButton />}
    </div>
  );
};

export default StudentProgressbar;
