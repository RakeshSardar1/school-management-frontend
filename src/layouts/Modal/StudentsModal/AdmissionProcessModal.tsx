import { useId, useState } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import type { PipeLineLeadsTypes } from "../../../utilities/types";
import { DocumentUploadField, Icons } from "../../../components";
import { isValidAadhaar } from "../../../utilities/Helpers/verification";

interface StudentTypesProps {
  studentCount: number;
  student: PipeLineLeadsTypes;
  onAdvanced: () => void;
  close: () => void;
}

type Person = "student" | "parent";
type DocumentField =
  | "birthCertificate"
  | "schoolLeavingCertificate"
  | "otherDocument";

const AdmissionProcessModal = ({
  student,
  onAdvanced,
  close,
}: StudentTypesProps) => {
  const id = useId();

  const [aadhaar, setAadhaar] = useState({
    student: "",
    parent: "",
  });

  const [checked, setChecked] = useState({
    student: false,
    parent: false,
  });

  const [errors, setErrors] = useState({
    student: "",
    parent: "",
  });

  const [formError, setFormError] = useState("");

  const [documents, setDocuments] = useState<
    Record<DocumentField, File | null>
  >({
    birthCertificate: null,
    schoolLeavingCertificate: null,
    otherDocument: null,
  });

  const canProceed = Boolean(
    student.name.trim() &&
    checked.student &&
    checked.parent &&
    isValidAadhaar(aadhaar.student) &&
    isValidAadhaar(aadhaar.parent),
  );

  const closeModal = (event?: MouseEvent) => {
    event?.preventDefault();
    close();
  };

  const checkAadhaar = (person: Person) => {
    if (!isValidAadhaar(aadhaar[person])) {
      setErrors((previous) => ({
        ...previous,
        [person]: `Enter a valid ${person} Aadhaar number.`,
      }));
      return;
    }

    setErrors((previous) => ({ ...previous, [person]: "" }));
    setChecked((previous) => ({ ...previous, [person]: true }));
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: DocumentField,
  ) => {
    const file = event.currentTarget.files?.[0];

    if (file) {
      setDocuments((previous) => ({ ...previous, [field]: file }));
    }
  };

  const removeFile = (field: DocumentField) => {
    setDocuments((previous) => ({ ...previous, [field]: null }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canProceed) {
      setFormError("Check both Aadhaar numbers before proceeding.");
      return;
    }

    setFormError("");
    onAdvanced();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md sm:p-6 md:p-8"
      onClick={closeModal}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white text-slate-800 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 pb-4 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Icons name="School" className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Document Verification: {student.name}
              </h2>
            </div>
            <p className="mt-1 pl-9 text-xs text-slate-500">
              Check Aadhaar numbers and upload documents.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close form"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <Icons name="X" className="h-5 w-5" />
          </button>
        </div>

        <form
          id={`${id}-form`}
          onSubmit={handleSubmit}
          className="flex-1 space-y-6 overflow-y-auto p-6"
        >
          {(formError || errors.student || errors.parent) && (
            <div
              role="alert"
              className="space-y-1 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {formError && <p>{formError}</p>}
              {errors.student && (
                <p id={`${id}-student-error`}>{errors.student}</p>
              )}
              {errors.parent && (
                <p id={`${id}-parent-error`}>{errors.parent}</p>
              )}
            </div>
          )}

          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
              <Icons name="ShieldCheck" className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Identification Details
              </h3>
            </div>

            {(["student", "parent"] as const).map((person) => {
              const label =
                person === "student" ? "Student Aadhaar" : "Parent Aadhaar";
              const inputId = `${id}-${person}`;

              return (
                <div key={person} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={inputId}
                      className="text-xs font-semibold text-slate-700"
                    >
                      {label} <span className="text-red-500">*</span>
                    </label>

                    {checked[person] && (
                      <span className="text-xs font-semibold text-emerald-700">
                        Format checked
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      id={inputId}
                      type="text"
                      value={aadhaar[person]}
                      disabled={checked[person]}
                      placeholder={`Enter ${label}`}
                      aria-invalid={Boolean(errors[person])}
                      aria-describedby={
                        errors[person] ? `${id}-${person}-error` : undefined
                      }
                      onChange={(event) => {
                        const digits = event.currentTarget.value
                          .replace(/\D/g, "")
                          .slice(0, 12);
                        const value = digits.replace(/(\d{4})(?=\d)/g, "$1-");
                        setAadhaar((previous) => ({
                          ...previous,
                          [person]: value,
                        }));
                        setErrors((previous) => ({
                          ...previous,
                          [person]: "",
                        }));
                        setFormError("");
                      }}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none ${
                        errors[person]
                          ? "border-red-500 bg-red-50 text-red-900"
                          : checked[person]
                            ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                            : "border-slate-200 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-blue-500/20"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        if (checked[person]) {
                          setChecked((previous) => ({
                            ...previous,
                            [person]: false,
                          }));
                        } else {
                          checkAadhaar(person);
                        }
                      }}
                      className={`inline-flex cursor-pointer shrink-0 items-center gap-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold ${
                        checked[person]
                          ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          : "bg-blue-600 text-white hover:bg-blue-500"
                      }`}
                    >
                      <Icons
                        name={checked[person] ? "Edit3" : "ShieldCheck"}
                        className="h-3.5 w-3.5"
                      />
                      {checked[person] ? "Edit" : "Verify Aadhaar"}
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
              <Icons name="Upload" className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Document Uploads
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DocumentUploadField
                label="Birth Certificate"
                optional
                file={documents.birthCertificate}
                onFileSelect={(event) =>
                  handleFileChange(event, "birthCertificate")
                }
                onRemove={() => removeFile("birthCertificate")}
              />

              <DocumentUploadField
                label="School Leaving Cert."
                optional
                file={documents.schoolLeavingCertificate}
                onFileSelect={(event) =>
                  handleFileChange(event, "schoolLeavingCertificate")
                }
                onRemove={() => removeFile("schoolLeavingCertificate")}
              />
            </div>

            <DocumentUploadField
              label="Other Document"
              optional
              file={documents.otherDocument}
              onFileSelect={(event) => handleFileChange(event, "otherDocument")}
              onRemove={() => removeFile("otherDocument")}
              fullWidth
            />
          </section>
        </form>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:px-6">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            form={`${id}-form`}
            disabled={!canProceed}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            Move to Document Verification
            <Icons name="ArrowUpRight" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProcessModal;
