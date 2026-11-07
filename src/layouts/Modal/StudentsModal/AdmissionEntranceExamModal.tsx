import React, { useState } from "react";
import type { PipeLineLeadsTypes } from "../../../utilities/types";

interface StudentTypesProps {
  studentCount: number;
  student: PipeLineLeadsTypes;
  onAdvanced: () => void;
  close: () => void;
}

const AdmissionEntranceExamModal: React.FC<StudentTypesProps> = ({
  student,
  close,
  onAdvanced,
}) => {
  // Form State
  const [score, setScore] = useState<number | "">("");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Constants
  const MAX_SCORE = 100;
  const PASSING_PERCENTAGE = 30;

  // Calculations
  const numericScore = Number(score) || 0;
  const percentage = score === "" ? "0.0" : numericScore.toFixed(1);
  const isBelowThreshold = numericScore < PASSING_PERCENTAGE;

  // Automatically determine the result based on the score
  const calculatedResult =
    score === "" ? null : isBelowThreshold ? "FAIL" : "PASS";

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    close();
  };

  // Strict input handler to prevent values > MAX_SCORE
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow empty string for clearing the input
    if (val === "") {
      setScore("");
      return;
    }

    const numVal = Number(val);

    // Prevent values outside the 0 - 100 range
    if (numVal >= 0 && numVal <= MAX_SCORE) {
      setScore(numVal);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (score === "" || numericScore < 0 || numericScore > MAX_SCORE) {
      alert(`Please enter a valid score between 0 and ${MAX_SCORE}.`);
      return;
    }

    setIsSubmitted(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(false);

      const examResult = {
        studentId: student.id,
        studentName: student.name,
        score: numericScore,
        maxScore: MAX_SCORE,
        percentage: Number(percentage),
        result: calculatedResult,
        comment: comment,
        evaluatedAt: new Date().toISOString(),
      };

      console.log("Entrance Exam Result:", examResult);
      onAdvanced();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-900/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Entrance Exam Evaluation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Evaluate candidate:{" "}
              <strong className="text-slate-700">{student.name}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form
          id="exam-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6 space-y-6 flex-1"
        >
          {/* Submission Alert */}
          {isSubmitted && calculatedResult && (
            <div
              className={`p-4 border rounded-xl flex items-center gap-3 ${
                calculatedResult === "PASS"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              <span className="text-sm font-medium">
                Evaluation recorded successfully! Candidate {calculatedResult}.
                Closing...
              </span>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              Test Scoring
            </h3>

            <div className="flex items-end gap-4">
              {/* Score Input (Full Width) */}
              <div className="space-y-1.5 flex-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  Score Obtained <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={score}
                  onChange={handleScoreChange}
                  min="0"
                  max={MAX_SCORE}
                  required
                  placeholder="e.g. 85"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Total Marks Display (No Input Box) */}
              <div className="space-y-1.5 shrink-0 pb-2.5">
                <span className="text-sm font-semibold text-slate-500">
                  / <span className="text-slate-700">{MAX_SCORE}</span>
                </span>
              </div>
            </div>

            {/* Percentage Display */}
            <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-lg">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-500">
                  Calculated Percentage
                </span>
                <span
                  className={`text-xl font-bold ${
                    isBelowThreshold ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {percentage}%
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500">
                  Passing Requirement
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {PASSING_PERCENTAGE}%
                </span>
              </div>
            </div>

            {/* Auto-Calculated Pass / Fail Display */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700">
                Evaluation Result
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Pass Option */}
                <div
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    calculatedResult === "PASS"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${calculatedResult === "PASS" ? "text-emerald-700" : "text-slate-400"}`}
                  >
                    Pass
                  </span>
                </div>

                {/* Fail Option */}
                <div
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    calculatedResult === "FAIL"
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-slate-200 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${calculatedResult === "FAIL" ? "text-rose-700" : "text-slate-400"}`}
                  >
                    Fail
                  </span>
                </div>
              </div>

              {/* Dynamic Hint Text */}
              {calculatedResult === "FAIL" && (
                <p className="text-[11px] text-rose-500 font-medium pt-1">
                  * Candidate is marked FAIL because their score ({percentage}%)
                  is below the {PASSING_PERCENTAGE}% threshold.
                </p>
              )}
              {calculatedResult === "PASS" && (
                <p className="text-[11px] text-emerald-600 font-medium pt-1">
                  * Candidate is marked PASS because their score ({percentage}%)
                  meets the {PASSING_PERCENTAGE}% threshold.
                </p>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              Evaluator Comments
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Remarks{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Add any notes regarding the candidate's performance..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>
        </form>

        {/* Modal Footer / Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="exam-form"
            disabled={score === ""}
            className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
              calculatedResult === "PASS"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : calculatedResult === "FAIL"
                  ? "bg-rose-600 hover:bg-rose-700"
                  : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Submit Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEntranceExamModal;
