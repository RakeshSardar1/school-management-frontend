import React, { useState } from "react";
import type { StudentTypes } from "../../../utilities/types";

interface ProspectiveLeadModalProps {
  onClose: () => void;
  onSubmit: (lead: LeadData) => void;
  students: StudentTypes[];
}

export interface LeadData {
  name: string;
  grade: string;
  stage: number;
  parentName: string;
  phone: string;
}

const ProspectiveLeadModal: React.FC<ProspectiveLeadModalProps> = ({
  onClose,
  onSubmit,
  students,
}) => {
  const [form, setForm] = useState<LeadData>({
    name: "",
    grade: "Grade 9",
    stage: 1,
    parentName: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    const fieldMap: Record<string, keyof LeadData> = {
      leadName: "name",
      leadGrade: "grade",
      leadStage: "stage",
      leadParent: "parentName",
      leadPhone: "phone",
    };
    const field = fieldMap[id];
    if (!field) return;

    setForm((prev) => ({
      ...prev,
      [field]: field === "stage" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-5 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-[#0F223D]">
              Add Prospective Lead
            </h3>
            <p className="text-[11px] text-slate-400 font-semibold">
              Register new admission inquiry or candidate application
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label
              htmlFor="leadName"
              className="block font-bold text-slate-600 mb-1"
            >
              Applicant Name
            </label>
            <input
              id="leadName"
              type="text"
              required
              placeholder="e.g. Lucas Scott"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 font-semibold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="leadGrade"
                className="block font-bold text-slate-600 mb-1"
              >
                Applying For Class
              </label>
              <select
                id="leadGrade"
                value={form.grade}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 font-semibold text-slate-700"
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="leadStage"
                className="block font-bold text-slate-600 mb-1"
              >
                Initial Pipeline Stage
              </label>
              <select
                id="leadStage"
                value={form.stage}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 font-semibold text-slate-700"
              >
                <option value={1}>1. Applied</option>
                <option value={2}>2. Doc Verification</option>
                <option value={3}>3. Entrance Test</option>
                <option value={4}>4. Fee Paid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="leadParent"
                className="block font-bold text-slate-600 mb-1"
              >
                Parent / Guardian Name
              </label>
              <input
                id="leadParent"
                type="text"
                required
                placeholder="e.g. Karen Scott"
                value={form.parentName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 font-semibold text-slate-800"
              />
            </div>
            <div>
              <label
                htmlFor="leadPhone"
                className="block font-bold text-slate-600 mb-1"
              >
                Primary Contact Phone
              </label>
              <input
                id="leadPhone"
                type="text"
                required
                placeholder="+1 555-0192"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 font-semibold text-slate-800"
              />
            </div>
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 cursor-pointer py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all"
            >
              Add Lead to Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProspectiveLeadModal;
