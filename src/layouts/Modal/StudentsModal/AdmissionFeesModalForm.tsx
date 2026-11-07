import React, { useState } from "react";
import type { PipeLineLeadsTypes } from "../../../utilities/types";

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
  const [paymentMethod, setPaymentMethod] = useState<
    "UPI" | "CARD" | "NETBANKING" | "CASH"
  >("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountInput, setDiscountInput] = useState<string>("2000");

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
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
            disabled={isProcessing}
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
                onChange={(e) => setDiscountInput(e.target.value)}
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
                {(["UPI", "CARD", "NETBANKING", "CASH"] as const).map(
                  (method) => (
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
                        onChange={() => setPaymentMethod(method)}
                        className="sr-only"
                      />
                      <span className="text-[10px] font-bold uppercase leading-tight">
                        {method === "NETBANKING" ? "Net Banking" : method}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Dynamic Input Fields based on Payment Method */}
            <div className="space-y-3">
              {paymentMethod === "UPI" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700">
                    UPI ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="student@upi"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              )}

              {paymentMethod === "CARD" && (
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">
                      Card Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700">
                        Expiry <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700">
                        CVV <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="***"
                        maxLength={4}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "NETBANKING" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700">
                    Select Bank <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="">Choose bank...</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="AXIS">Axis Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === "CASH" && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-[10px] text-amber-700 leading-tight">
                    Collect cash from the student/guardian. Clicking "Proceed to
                    Pay" marks this as completed.
                  </p>
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
            disabled={isProcessing}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-blue-500/20"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Proceed to Pay"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionFeesModalForm;
