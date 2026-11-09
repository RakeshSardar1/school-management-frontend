import { useId, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import type { PipeLineLeadsTypes } from "../../../utilities/types";
import { Icons } from "../../../components";

interface StudentTypesProps {
  studentCount: number;
  student: PipeLineLeadsTypes;
  onAdvanced: () => void;
  close: () => void;
}

const AdmissionEntranceExamModal = ({
  student,
  onAdvanced,
  close,
}: StudentTypesProps) => {
  const id = useId();
  const [hasExam, setHasExam] = useState<boolean | null>(null);
  const [score, setScore] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const passingPercentage = 30;
  const numericScore = Number(score);
  const numericTotal = Number(totalMarks);

  const validMarks =
    score.trim() !== "" &&
    totalMarks.trim() !== "" &&
    Number.isFinite(numericScore) &&
    Number.isFinite(numericTotal) &&
    numericTotal > 0 &&
    numericScore >= 0 &&
    numericScore <= numericTotal;

  const percentage = validMarks ? (numericScore / numericTotal) * 100 : null;
  const result =
    percentage === null
      ? null
      : percentage >= passingPercentage
        ? "PASS"
        : "FAIL";

  const canSubmit = hasExam === false || (hasExam === true && validMarks);

  const closeModal = (event?: MouseEvent) => {
    event?.preventDefault();
    close();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setError("Select an option and enter valid marks before proceeding.");
      return;
    }

    setError("");
    onAdvanced();
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={closeModal}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Entrance Exam Evaluation
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Candidate:{" "}
              <strong className="text-slate-700">{student.name}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close form"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
          >
            <Icons name="X" className="h-5 w-5" />
          </button>
        </div>

        <form
          id={`${id}-exam-form`}
          onSubmit={handleSubmit}
          className="flex-1 space-y-6 overflow-y-auto p-6"
        >
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-700">
              Is an entrance exam required?
            </legend>

            <div className="flex gap-6 text-sm text-slate-700">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={`${id}-has-exam`}
                  checked={hasExam === true}
                  onChange={() => {
                    setHasExam(true);
                    setError("");
                  }}
                />
                Yes
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={`${id}-has-exam`}
                  checked={hasExam === false}
                  onChange={() => {
                    setHasExam(false);
                    setError("");
                  }}
                />
                No
              </label>
            </div>
          </fieldset>

          {hasExam === true && (
            <>
              <section className="space-y-4">
                <h3 className="border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Test Scoring
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${id}-score`}
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Score Obtained *
                    </label>
                    <input
                      id={`${id}-score`}
                      type="number"
                      min="0"
                      step="any"
                      required
                      value={score}
                      onChange={(event) => setScore(event.target.value)}
                      placeholder="e.g. 85"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${id}-total`}
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Total Marks *
                    </label>
                    <input
                      id={`${id}-total`}
                      type="number"
                      min="0"
                      step="any"
                      required
                      value={totalMarks}
                      onChange={(event) => setTotalMarks(event.target.value)}
                      placeholder="e.g. 100"
                      className={inputClass}
                    />
                  </div>
                </div>

                {score !== "" && totalMarks !== "" && !validMarks && (
                  <p className="text-xs text-red-600">
                    Total marks must be greater than zero, and the score must be
                    between zero and the total.
                  </p>
                )}

                {percentage !== null && (
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-100 p-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-500">
                        Calculated Percentage
                      </p>
                      <p className="text-xl font-bold text-slate-700">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase text-slate-500">
                        Passing Requirement
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {passingPercentage}%
                      </p>
                    </div>
                  </div>
                )}

                {result && (
                  <div
                    className={`rounded-xl border p-3 text-sm font-bold ${
                      result === "PASS"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-rose-200 bg-rose-50 text-rose-700"
                    }`}
                  >
                    Result: {result}
                  </div>
                )}
              </section>

              <section className="space-y-2">
                <label
                  htmlFor={`${id}-comment`}
                  className="block text-xs font-semibold text-slate-700"
                >
                  Evaluator Comments (optional)
                </label>
                <textarea
                  id={`${id}-comment`}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  rows={3}
                  placeholder="Add notes about the candidate..."
                  className={`${inputClass} resize-none`}
                />
              </section>
            </>
          )}
        </form>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 p-4">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            form={`${id}-exam-form`}
            disabled={!canSubmit}
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            Submit Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEntranceExamModal;
