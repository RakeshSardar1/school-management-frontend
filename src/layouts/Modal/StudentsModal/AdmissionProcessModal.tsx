import React, { useState } from "react";
import type {
  PipeLineLeadsTypes,
  StudentGender,
  StudentTypes,
} from "../../../utilities/types";
import { Icons } from "../../../components";

// --- Subcomponent for Document Upload Fields ---
const DocumentUploadField = ({
  label,
  optional,
  file,
  onFileSelect,
  onRemove,
  fullWidth,
}: any) => {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
          {label}{" "}
          {optional && (
            <span className="text-slate-400 font-normal">(Optional)</span>
          )}
        </label>
        <Icons name="FileText" className="w-3.5 h-3.5 text-slate-400" />
      </div>

      <div className="relative">
        <div className="flex items-center border border-slate-200 bg-slate-50/50 rounded-xl p-1.5 pl-3 transition-all hover:border-slate-300">
          <label className="cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors shrink-0">
            Choose File
            <input type="file" onChange={onFileSelect} className="hidden" />
          </label>

          <span className="text-xs text-slate-500 truncate px-3 flex-1">
            {file ? file.name : "No file chosen"}
          </span>

          {file && (
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
              title="Remove file"
            >
              <Icons name="Trash2" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
interface StudentTypesProps {
  studentCount: number;
  student: PipeLineLeadsTypes;
  onAdvanced: () => void;
  close: () => void;
}

const AdmissionProcessModal: React.FC<StudentTypesProps> = ({
  studentCount,
  student,
  close,
  onAdvanced,
}) => {
  // Form State (Removed unnecessary fields)
  const [formData, setFormData] = useState({
    fullName: student.name || "",
    aadharNumber: "1234-5678-9012", // Default mocked value
    isAadharVerified: false, // Default mocked verified
    parentAadharNumber: "",
    isParentAadharVerified: false,
    birthCertificate: null as File | null,
    schoolLeavingCertificate: null as File | null,
    otherDocument: null as File | null,
    aadharCardFile: null as File | null,
    parentAadharCardFile: null as File | null,
  });

  const [isVerifyingParent, setIsVerifyingParent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    close();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const removeFile = (fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: null }));
  };

  const handleVerifyParentAadhar = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      !formData.parentAadharNumber ||
      formData.parentAadharNumber.length < 12
    ) {
      alert("Please enter a valid 12-digit Parent Aadhar number.");
      return;
    }

    setIsVerifyingParent(true);
    // Simulate API delay
    setTimeout(() => {
      setIsVerifyingParent(false);
      setFormData((prev) => ({ ...prev, isParentAadharVerified: true }));
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.isAadharVerified ||
      !formData.isParentAadharVerified
    ) {
      alert("Please fill in all required fields and verify both Aadhar cards.");
      return;
    }

    setIsSubmitted(true);

    // Simulate submission and trigger onAdvanced
    setTimeout(() => {
      setIsSubmitted(false);

      const newStudentRegistration: StudentTypes = {
        id: `STU-2026-00${studentCount + 1}`,
        admissionNo: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
        rollNo: `${100 + studentCount + 1}`,
        name: formData.fullName,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",

        // Hardcoded fallbacks for fields removed from the UI so TS doesn't break
        grade: "Grade 1",
        section: "Section A",
        gender: "Female" as StudentGender,
        category: "General",
        dob: "2010-01-01",

        status: "Active",
        guardianName: "N/A",
        guardianPhone: "N/A",
        guardianEmail: "N/A",
        attendance: 100,
        feeStatus: "Paid",
        bloodGroup: "O+",
        address: "Main Street, Campus District",
        admissionDate: new Date().toISOString().split("T")[0],
        aadharCard: formData.aadharNumber,
        aadharCardFile: formData.aadharCardFile,
        birthCertificate: formData.birthCertificate,
        parentAadharCard: formData.parentAadharNumber,
        parentAadharCardFile: formData.parentAadharCardFile,
        schoolLeavingCertificate: formData.schoolLeavingCertificate,
        otherDocument: formData.otherDocument,
      };

      console.log("newStudentRegistration", newStudentRegistration);
      onAdvanced();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800 transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50/50 to-white">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Icons name="School" className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Documents Verification for : {student.name}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-9">
              Verification and Upload Documents
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <Icons name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          id="admission-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6 space-y-6 flex-1 custom-scrollbar"
        >
          {/* Submission Alert */}
          {isSubmitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <Icons
                name="CheckCircle2"
                className="w-5 h-5 text-emerald-600 shrink-0"
              />
              <p className="text-sm font-medium">
                Admission recorded successfully! Closing window...
              </p>
            </div>
          )}

          {/* Section 2: Identification Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
              <Icons name="ShieldCheck" className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Identification Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {/* Student Aadhar Card */}
              <div className="space-y-1.5  col-span-full">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    Aadhar Card <span className="text-rose-500">*</span>
                  </label>

                  {formData.isAadharVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Icons
                        name="CheckCircle2"
                        className="w-3 h-3 text-emerald-600"
                      />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={(e) => {
                      handleInputChange(e);
                      setFormData((prev) => ({
                        ...prev,
                        isAadharVerified: false,
                      }));
                    }}
                    placeholder="Enter Aadhar Number"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-all ${
                      formData.isAadharVerified
                        ? "bg-emerald-50/30 border border-emerald-300 text-emerald-950 cursor-not-allowed"
                        : "bg-slate-50/50 border border-slate-200 text-slate-800 focus:ring-blue-500/20 focus:border-blue-500"
                    }`}
                    disabled={formData.isAadharVerified}
                  />
                  {!formData.isAadharVerified ? (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isAadharVerified: true,
                        }))
                      }
                      className="px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-xl border border-blue-200 text-xs shrink-0 transition-colors whitespace-nowrap"
                    >
                      Verify API
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isAadharVerified: false,
                        }))
                      }
                      className="px-3 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <Icons name="Edit3" className="w-3.5 h-3.5" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Parent Aadhar Card */}
              <div className="space-y-1.5 col-span-full">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    Parent Aadhar Card <span className="text-rose-500">*</span>
                  </label>
                  {formData.isParentAadharVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Icons
                        name="CheckCircle2"
                        className="w-3 h-3 text-emerald-600"
                      />
                      Verified
                    </span>
                  )}
                </div>
                {formData.isParentAadharVerified ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="parentAadharNumber"
                      value={formData.parentAadharNumber || "9876-5432-1098"}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-emerald-50/30 border border-emerald-300 text-emerald-950 rounded-xl text-sm focus:outline-none cursor-not-allowed"
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isParentAadharVerified: false,
                        }))
                      }
                      className="px-3 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shrink-0 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="parentAadharNumber"
                      value={formData.parentAadharNumber}
                      onChange={handleInputChange}
                      placeholder="Enter Parent Aadhar"
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyParentAadhar}
                      disabled={
                        !formData.parentAadharNumber || isVerifyingParent
                      }
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all shadow-sm shadow-blue-500/10"
                    >
                      {isVerifyingParent ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Icons name="ShieldCheck" className="w-3.5 h-3.5" />
                      )}
                      Verify API
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Document Uploads */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
              <Icons name="Upload" className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Document Uploads
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Birth Certificate */}
              <DocumentUploadField
                label="Birth Certificate"
                optional
                file={formData.birthCertificate}
                onFileSelect={(e: any) =>
                  handleFileChange(e, "birthCertificate")
                }
                onRemove={() => removeFile("birthCertificate")}
              />

              {/* School Leaving Certificate */}
              <DocumentUploadField
                label="School Leaving Cert."
                optional
                file={formData.schoolLeavingCertificate}
                onFileSelect={(e: any) =>
                  handleFileChange(e, "schoolLeavingCertificate")
                }
                onRemove={() => removeFile("schoolLeavingCertificate")}
              />
            </div>

            {/* Other Document (Full Width) */}
            <DocumentUploadField
              label="Other Document"
              optional
              file={formData.otherDocument}
              onFileSelect={(e: any) => handleFileChange(e, "otherDocument")}
              onRemove={() => removeFile("otherDocument")}
              fullWidth
            />
          </div>
        </form>

        {/* Modal Footer / Actions */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="admission-form"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            Move to Document Verification
            <Icons name="ArrowUpRight" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProcessModal;
