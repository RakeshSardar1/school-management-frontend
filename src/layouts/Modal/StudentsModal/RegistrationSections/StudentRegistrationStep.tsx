import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../redux/ReduxHooks";
import {
  GRADES_DATA,
  type StudentAdmissionInProgress,
  type StudentGender,
} from "../../../../utilities/types";
import {
  BLOOD_GROUPS_DATA,
  CATEGORIES_DATA,
  GENDER_DATA,
  RELIGIONS_DATA,
  SECTIONS_DATA,
} from "../../../../redux/ConstantCommon";
import { currentSubSidebar } from "../../../../redux/reducers/Common/Common";
import { FilterDropDown, Icons, OutsideClick } from "../../../../components";
import {
  formatOptions,
  getCurrentAge,
} from "../../../../utilities/Helpers/converter";
import { DatePicker } from "../../../../components/calender";
import { admissionNewStudent } from "../../../../redux/reducers/StudentReducer/StudentReducer";
import DateMonthYear from "../../../../components/moment/DateMonthYear";

interface StudentTypesProps {
  close: () => void;
  onNext: (data: StudentAdmissionInProgress) => void;
  onHasDataChange: (hasData: boolean) => void;
}

const StudentRegistrationStep: React.FC<StudentTypesProps> = ({
  close,
  onNext,
  onHasDataChange,
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [religion, setReligion] = useState<string | null>(null);
  const [bloodGroup, setBloodGroup] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const [dob, setDob] = useState<string>("");

  useEffect(() => {
    onHasDataChange(
      Boolean(
        name.trim() ||
        grade ||
        section ||
        gender ||
        category ||
        religion ||
        bloodGroup ||
        dob,
      ),
    );
  }, [
    name,
    grade,
    section,
    gender,
    category,
    religion,
    bloodGroup,
    dob,

    onHasDataChange,
  ]);

  const canContinue = Boolean(
    name.trim() &&
    gender &&
    category &&
    religion &&
    grade &&
    section &&
    bloodGroup &&
    dob,
  );

  const [openCalender, setOpenCalender] = useState(false);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    dispatch(currentSubSidebar("Admission Process"));
    close();
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        if (!name || !category || !grade || !section || !gender || !religion) {
          alert("Please fill all required fields");
          return;
        }

        const newStudentRegistration: StudentAdmissionInProgress = {
          name,
          grade,
          section,
          gender: gender as StudentGender,
          category,
          religion,
          bloodGroup: bloodGroup || "",
          dob,
          paymentStatus: false,
        };
        onNext(newStudentRegistration);
        dispatch(admissionNewStudent(newStudentRegistration));
      }}
      className="space-y-4 text-xs"
    >
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-400">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Student avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Icons name="User" className="h-7 w-7" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-slate-700">Student photo</p>
          <p className="mt-1 text-slate-500">
            Optional - choose an image to personalize the student profile.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 hover:bg-slate-100">
              <Icons name="Upload" className="h-4 w-4" />
              {avatarFile ? "Change photo" : "Upload photo"}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="sr-only"
                ref={avatarInputRef}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] ?? null;
                  setAvatarFile(file);
                  setAvatarPreview(file ? URL.createObjectURL(file) : null);
                }}
              />
            </label>
            {avatarFile && (
              <button
                type="button"
                onClick={() => {
                  setAvatarFile(null);
                  setAvatarPreview(null);
                  if (avatarInputRef.current) {
                    avatarInputRef.current.value = "";
                  }
                }}
                onChange={(e) => setName(e.target.value)}
                className="cursor-pointer font-semibold text-slate-500 hover:text-slate-700"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="font-bold text-slate-700 block mb-1">
          Full Student Name *
        </label>
        <input
          required
          name="name"
          type="text"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="e.g. Rahin Sardar"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <FilterDropDown
          label="Gender"
          options={formatOptions(GENDER_DATA)}
          onChange={(val) => setGender(val)}
          defaultValue="Please select"
          value={gender}
        />

        <FilterDropDown
          label="Category"
          options={formatOptions(CATEGORIES_DATA)}
          onChange={(val) => setCategory(val)}
          defaultValue="Please select"
          value={category}
        />
        <FilterDropDown
          label="Religion"
          options={formatOptions(RELIGIONS_DATA)}
          onChange={(val) => setReligion(val)}
          defaultValue="Please select"
          value={religion}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <FilterDropDown
          label="Target Grade"
          options={formatOptions(GRADES_DATA)}
          onChange={(val) => setGrade(val)}
          defaultValue="Please select"
          value={grade}
        />
        <FilterDropDown
          label="Assigned Section"
          options={formatOptions(SECTIONS_DATA)}
          onChange={(val) => setSection(val)}
          defaultValue="Please select"
          value={section}
        />{" "}
        <FilterDropDown
          label="Blood Group"
          options={formatOptions(BLOOD_GROUPS_DATA)}
          onChange={(val) => setBloodGroup(val)}
          defaultValue="Please select"
          value={bloodGroup}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <OutsideClick
          className="relative"
          enabled={openCalender}
          onOutsideClick={() => setOpenCalender(false)}
        >
          <label htmlFor="dob" className="font-bold text-slate-700 block mb-1">
            Date of Birth
          </label>

          <button
            type="button"
            onClick={() => setOpenCalender(!openCalender)}
            className="w-full cursor-pointer flex items-center justify-between bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <DateMonthYear
              passingData={dob}
              className="truncate"
              fallback={"DD/MM/YYYY"}
            />
            <Icons
              name="Calendar"
              className={`w-3.5 h-3.5 text-slate-400 ml-2 transition-transform duration-200 ${
                openCalender ? "rotate-180" : ""
              }`}
            />
          </button>

          {openCalender && (
            <div className="absolute bottom-full left-0 z-50 mb-2">
              <DatePicker
                value={dob ? new Date(`${dob}T00:00:00`) : undefined}
                onChange={(date) => {
                  if (!date) {
                    setDob("");
                    return;
                  }

                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");

                  setDob(`${year}-${month}-${day}`);
                }}
                disableTodayAndFuture
              />
            </div>
          )}
        </OutsideClick>

        <div aria-live="polite">
          {dob && (
            <>
              <span className="font-bold text-slate-700 block mb-1">
                Age per Today
              </span>
              <p className="py-2 text-slate-600">
                <span className="font-semibold text-green-600">
                  {getCurrentAge(dob)}
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 cursor-pointer py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!canContinue}
          className="px-5 py-2 rounded-xl font-semibold text-white shadow-md
    bg-[#3B82F6] hover:bg-blue-600 cursor-pointer
    disabled:bg-slate-300 disabled:text-slate-500
    disabled:cursor-not-allowed disabled:shadow-none"
        >
          Parent Details &rarr;
        </button>
      </div>
    </form>
  );
};

export default StudentRegistrationStep;
