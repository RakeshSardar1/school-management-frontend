import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../redux/ReduxHooks";
import {
  type ParentAdmissionDetails,
  type StudentAdmissionInProgress,
  type StudentTypes,
} from "../../../../utilities/types";

import { currentSubSidebar } from "../../../../redux/reducers/Common/Common";
import { FilterDropDown, Icons } from "../../../../components";
import { formatOptions } from "../../../../utilities/Helpers/converter";
import { admissionNewStudent } from "../../../../redux/reducers/StudentReducer/StudentReducer";
import { INDIAN_QUALIFICATIONS } from "../../../../redux/ConstantCommon";

interface ParentTypesProps {
  students: StudentTypes[];
  close: () => void;
  // Assuming you want to pass the student data gathered from the previous step
  studentData?: StudentAdmissionInProgress;
  onBack?: () => void; // To go back to the student form
  onHasDataChange: (hasData: boolean) => void;
}

const ParentRegistrationStep: React.FC<ParentTypesProps> = ({
  close,
  studentData,
  onBack,
  onHasDataChange,
}) => {
  const dispatch = useAppDispatch();

  const [parentDetails, setParentDetails] = useState<ParentAdmissionDetails>({
    guardianName: "",
    guardianPhone: "",
    motherName: "",
    motherPhone: "",
    relation: "Father",
    occupation: "Business",
    qualification: "Graduate",
    guardianEmail: "",
    annualIncome: "",
    address: "",
  });

  const updateParentDetails = (
    field: keyof ParentAdmissionDetails,
    value: string,
  ) => {
    setParentDetails((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    onHasDataChange(
      Boolean(
        parentDetails.guardianName.trim() ||
        parentDetails.guardianPhone.trim() ||
        parentDetails.motherName.trim() ||
        parentDetails.motherPhone.trim() ||
        parentDetails.guardianEmail.trim() ||
        parentDetails.address.trim() ||
        parentDetails.occupation !== "Business" ||
        parentDetails.qualification !== "Graduate" ||
        parentDetails.relation !== "Father",
      ),
    );
  }, [parentDetails, onHasDataChange]);

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    dispatch(currentSubSidebar("Admission Process"));
    close();
  };

  const canSubmit = Boolean(
    studentData &&
    parentDetails.guardianName.trim() &&
    parentDetails.guardianPhone.trim(),
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const { guardianName, guardianPhone, motherName, motherPhone } =
          parentDetails;

        if (
          !guardianName.trim() ||
          !guardianPhone.trim() ||
          !motherName.trim() ||
          !motherPhone.trim()
        ) {
          alert("Please fill in all required parent/guardian fields.");
          return;
        }

        if (!guardianName || !guardianPhone || !motherName || !motherPhone) {
          alert("Please fill in all required parent/guardian fields.");
          return;
        }

        const completeRegistration: StudentAdmissionInProgress = {
          ...(studentData as StudentAdmissionInProgress), // <-- This now contains the data from Step 1
          parentDetails: {
            guardianName,
            guardianPhone,
            motherName,
            motherPhone,
            relation: parentDetails.relation,
            occupation: parentDetails.occupation,
            qualification: parentDetails.qualification,
            guardianEmail: parentDetails.guardianEmail,
            annualIncome: parentDetails.annualIncome,
            address: parentDetails.address,
          },
        };

        console.log("Complete Registration Data:", completeRegistration);

        // Dispatch your final action here:
        dispatch(admissionNewStudent(completeRegistration));
        close(); // Close the modal on success
      }}
      className="space-y-4 text-xs animate-in fade-in slide-in-from-right-4 duration-300"
    >
      {/* Header / Info Alert */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 text-blue-800 mb-2">
        <Icons name="Info" className="w-5 h-5 shrink-0 text-blue-500" />
        <p>
          Please provide the contact and background details for the student's
          parents or legal guardians.
        </p>
      </div>

      {/* Parent Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Father's Section */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#142B4A] border-b border-slate-100 pb-1">
            Father's / Guardian's Details
          </h4>

          <div>
            <label className="block mb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Full Name (Father/Guardian)
            </label>
            <input
              required
              name="guardianName"
              type="text"
              placeholder="e.g. Rakesh Sardar"
              value={parentDetails.guardianName}
              onChange={(e) =>
                updateParentDetails("guardianName", e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Phone Number *
            </label>
            <input
              required
              name="guardianPhone"
              type="tel"
              placeholder="+91 98765 43210"
              value={parentDetails.guardianPhone}
              onChange={(e) =>
                updateParentDetails("guardianPhone", e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <FilterDropDown
            label="Occupation"
            options={formatOptions([
              "Business",
              "Service",
              "Doctor",
              "Engineer",
              "Other",
            ])} // Replace with OCCUPATION_DATA
            value={parentDetails.occupation} // Add state for this
            onChange={(val) => updateParentDetails("occupation", val)} // Add state handler
          />
        </div>

        {/* Mother's Section */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#142B4A] border-b border-slate-100 pb-1">
            Mother's Details
          </h4>

          <div>
            <label className="block mb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Full Name
            </label>
            <input
              name="motherName"
              type="text"
              placeholder="e.g. Fatima Sardar"
              value={parentDetails.motherName}
              onChange={(e) =>
                updateParentDetails("motherName", e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              name="motherPhone"
              type="tel"
              placeholder="+91 98765 43211"
              value={parentDetails.motherPhone}
              onChange={(e) =>
                updateParentDetails("motherPhone", e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
            />
          </div>

          <FilterDropDown
            label="Guardian Qualification"
            options={formatOptions(
              INDIAN_QUALIFICATIONS.map((q) => q.qualification),
            )}
            value={"Graduate"}
            onChange={(value) => updateParentDetails("qualification", value)} // Add state handler
          />
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <FilterDropDown
          label="Guardian Relation"
          options={formatOptions([
            "Father",
            "Mother",
            "Uncle",
            "Aunt",
            "Other",
          ])} // Replace with RELATIONS_DATA
          value={"Father"} // Add state for this
          onChange={() => {}} // Add state handler
        />

        <div>
          <label className="block mb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Guardian's Email (optional)
          </label>
          <input
            name="guardianEmail"
            type="email"
            value={parentDetails.guardianEmail}
            onChange={(e) =>
              updateParentDetails("guardianEmail", e.target.value)
            }
            placeholder="e.g. mother@example.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Residential Address
        </label>
        <textarea
          name="address"
          placeholder="Enter full residential address..."
          rows={2}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none resize-none"
          value={parentDetails.address}
          onChange={(e) => updateParentDetails("address", e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex justify-between gap-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="px-4 cursor-pointer py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 flex items-center gap-2 transition-colors"
        >
          &larr; Back to Student
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 cursor-pointer py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-5 cursor-pointer py-2 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-blue-600 shadow-md transition-colors"
          >
            Submit Admission
          </button>
        </div>
      </div>
    </form>
  );
};

export default ParentRegistrationStep;
