import React, { useState } from "react";
import type { PipeLineLeadsTypes } from "../../../utilities/types";
import { QrGenerate } from "../../../components";
import { useAppSelector } from "../../../redux/ReduxHooks";

interface FeePaymentModalProps {
  student: PipeLineLeadsTypes;
  close: () => void;
  // onSuccess: () => void;
}

const AdmissionFeesModalForm: React.FC<FeePaymentModalProps> = ({
  student,
  close,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CASH">("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountInput, setDiscountInput] = useState<string>("0");
  const [cashConfirmed, setCashConfirmed] = useState(false);

  const authUser = useAppSelector((state) => state.auth.user);

  const canAcceptCash =
    authUser === "super_admin" ||
    authUser === "admin" ||
    authUser === "management" ||
    authUser === "principal" ||
    authUser === "accountant";

  const closeModal = () => {
    if (isProcessing) return;
    close();
  };

  // Mock Fee Breakdown Data
  const feeDetails = {
    items: [
      { label: "Tuition Fee (Term 1)", amount: 15000 },
      { label: "Admission Fee (One-time)", amount: 5000 },
      { label: "Library & Lab Fee", amount: 2500 },
      { label: "Transport Fee (Quarterly)", amount: 3500 },
    ],
  };

  const subtotal = feeDetails.items.reduce((acc, item) => acc + item.amount, 0);
  const numericDiscount = Number(discountInput) || 0;
  const total = Math.max(0, subtotal - numericDiscount);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      isProcessing ||
      paymentMethod !== "CASH" ||
      !cashConfirmed ||
      !canAcceptCash
    ) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Fee Payment
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Paying for:{" "}
              <strong className="text-slate-700">{student.name}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            disabled={
              isProcessing || paymentMethod !== "CASH" || !cashConfirmed
            }
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg
              width="18"
              height="18"
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

        {/* Form Body - 2 Column Grid Layout (Compact) */}
        <form
          id="fee-payment-form"
          onSubmit={handlePay}
          className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {/* LEFT COLUMN: Breakdown & Discount */}
          <div className="space-y-4">
            {/* Fee Breakdown */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">
                Fee Breakdown
              </h3>
              <div className="space-y-1.5">
                {feeDetails.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-800">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Discount Input */}
            <div className="space-y-1 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
              <label className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
                <span>Discount (₹)</span>
                <span className="text-[9px] text-emerald-600/70 font-medium normal-case tracking-normal">
                  Optional
                </span>
              </label>
              <input
                type="number"
                value={discountInput}
                onChange={(e) => {
                  setDiscountInput(e.target.value);
                  setCashConfirmed(false);
                }}
                min="0"
                max={subtotal}
                placeholder="0"
                className="w-full px-2.5 py-1.5 bg-white border border-emerald-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Total Summary */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-600 font-medium">
                <span>Discount</span>
                <span>- ₹{numericDiscount.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between mt-1">
                <span className="text-xs font-bold text-slate-900">Total</span>
                <span className="text-sm font-bold text-slate-900">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Payment Methods & Inputs */}
          <div className="space-y-4">
            {/* Payment Methods */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">
                Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(["UPI", "CASH"] as const).map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border-2 transition-all cursor-pointer text-center ${
                      paymentMethod === method
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => {
                        setPaymentMethod(method);
                        setCashConfirmed(false);
                      }}
                      className="sr-only"
                    />
                    <span className="text-[10px] font-bold uppercase leading-tight">
                      {method === "UPI" ? "UPI" : method}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Input Fields based on Payment Method */}
            <div className="space-y-3">
              {paymentMethod === "UPI" && <QrGenerate total={total} />}

              {paymentMethod === "CASH" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75h19.5v10.5H2.25zM6 9.75h.008v.008H6V9.75Zm12 4.5h.008v.008H18v-.008ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Cash collection
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        Collect the amount from the student's parent or
                        guardian.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Amount to collect
                    </p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ₹{total.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      aria-pressed={cashConfirmed}
                      disabled={!canAcceptCash || isProcessing}
                      onClick={() =>
                        setCashConfirmed((confirmed) => !confirmed)
                      }
                      className={`cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-bold transition ${
                        cashConfirmed
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {cashConfirmed
                        ? "✓ Cash received"
                        : "Confirm cash received"}
                    </button>
                    {!canAcceptCash && (
                      <p
                        role="alert"
                        className="text-center text-xs text-red-600"
                      >
                        Your account is not authorized to accept cash payments.
                        Please contact an authorized staff member.
                      </p>
                    )}

                    <p className="text-center text-[11px] leading-relaxed text-slate-500">
                      {cashConfirmed
                        ? "Click again to undo your confirmation."
                        : "Confirm only after you have received the cash."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-slate-500">
              Amount to Pay
            </span>
            <span className="text-base font-bold text-slate-900">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
          <button
            type="submit"
            form="fee-payment-form"
            disabled={
              isProcessing ||
              paymentMethod !== "CASH" ||
              !cashConfirmed ||
              !canAcceptCash
            }
            className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-blue-500/20"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : paymentMethod === "CASH" ? (
              "Confirm Cash Payment"
            ) : (
              "Awaiting UPI Verification"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionFeesModalForm;
