import React, { useState, useMemo } from "react";
import type { PipeLineLeadsTypes } from "../../../utilities/types";
import { QrGenerate } from "../../../components";
import { useAppSelector } from "../../../redux/ReduxHooks";
import { formatAmount } from "../../../utilities/Helpers/converter";

interface FeePaymentModalProps {
  student: PipeLineLeadsTypes;
  close: () => void;
  onSuccess: () => void;
}

// If you have the exact type, import it and use it here, e.g.:
// type PaymentLevelKey = keyof GradeFees;

const AdmissionFeesModalForm: React.FC<FeePaymentModalProps> = ({
  student,
  close,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CASH">("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountInput, setDiscountInput] = useState<string>("");
  const [cashConfirmed, setCashConfirmed] = useState(false);

  const authUser = useAppSelector((state) => state.auth.user);
  const { gradeConfigurations, paymentLevels } = useAppSelector(
    (state) => state.payment,
  );

  const filteredPaymentLevels = useMemo(
    () =>
      Object.keys(paymentLevels).filter((key) =>
        paymentLevels[key].appearOn.includes("admission"),
      ),
    [paymentLevels],
  );

  const canAcceptCash = useMemo(() => {
    return [
      "super_admin",
      "admin",
      "management",
      "principal",
      "accountant",
    ].includes(authUser || "");
  }, [authUser]);

  const closeModal = () => {
    if (isProcessing) return;
    close();
  };

  // 1. Memoize Grade Config lookup
  const gradeConfig = useMemo(() => {
    return gradeConfigurations.find(
      (config) => config.gradeName === student.grade,
    );
  }, [gradeConfigurations, student.grade]);

  // 2. Memoize Subtotal calculation (Only sum up active payment levels, NOT all fees)
  const subtotal = useMemo(() => {
    if (!gradeConfig || !filteredPaymentLevels) return null;

    // Loop through the active paymentLevels object and sum only those amounts
    return filteredPaymentLevels.reduce((sum, key) => {
      const feeValue =
        gradeConfig.fees[key as keyof typeof gradeConfig.fees] || 0;
      return sum + feeValue;
    }, 0);
  }, [gradeConfig, filteredPaymentLevels]);

  // 3. Robust Discount Calculation
  const numericDiscount = useMemo(() => {
    const parsed = Number(discountInput);
    if (isNaN(parsed) || parsed < 0) return 0;
    // Ensure discount doesn't exceed subtotal
    return subtotal ? Math.min(parsed, subtotal) : 0;
  }, [discountInput, subtotal]);

  const total = Math.max(0, (subtotal || 0) - numericDiscount);
  const enteredDiscount =
    discountInput.trim() === "" ? 0 : Number(discountInput);

  const discountError =
    subtotal === null
      ? "Fee configuration is unavailable."
      : !Number.isFinite(enteredDiscount) || enteredDiscount < 0
        ? "Enter a valid discount amount."
        : enteredDiscount > subtotal
          ? "Discount cannot be greater than the fees."
          : "";

  const discountPercentage =
    subtotal !== null && subtotal > 0 ? (numericDiscount / subtotal) * 100 : 0;

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
    // Simulate API call
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

        {/* Form Body */}
        <form
          id="fee-payment-form"
          onSubmit={handlePay}
          className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* Fee Breakdown */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">
                Fee Breakdown
              </h3>
              <div className="space-y-1.5">
                {gradeConfig &&
                  filteredPaymentLevels.map((item) => {
                    const feeAmount =
                      gradeConfig.fees[item as keyof typeof gradeConfig.fees] ??
                      0;

                    return (
                      <div
                        key={item}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-600">
                          {paymentLevels[item].label}
                        </span>
                        <span className="font-semibold text-slate-800">
                          ₹{feeAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Discount Input */}
            {/* Discount Input */}
            <div
              className={`space-y-1 rounded-lg border p-2.5 ${
                discountPercentage > 30
                  ? "border-red-200 bg-red-50"
                  : discountPercentage > 10
                    ? "border-orange-200 bg-orange-50"
                    : "border-emerald-100 bg-emerald-50/50"
              }`}
            >
              <label
                htmlFor="discount"
                className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-700"
              >
                <span>Discount (₹)</span>
                <span
                  aria-invalid={Boolean(discountError)}
                  aria-describedby={
                    discountError ? "discount-error" : undefined
                  }
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold normal-case ${
                    discountPercentage > 30
                      ? "bg-red-100 text-red-700"
                      : discountPercentage > 10
                        ? "bg-orange-100 text-orange-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {discountPercentage.toFixed(2)}% discount
                </span>
              </label>

              <input
                id="discount"
                type="text"
                value={formatAmount(discountInput)}
                inputMode="decimal"
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, "");

                  // Allow digits and up to two decimal places.
                  if (!/^\d*(?:\.\d{0,2})?$/.test(value)) return;

                  setDiscountInput(value);
                  setCashConfirmed(false);
                }}
                aria-invalid={Boolean(discountError)}
                aria-describedby={discountError ? "discount-error" : undefined}
                min="0"
                max={subtotal ?? 0}
                placeholder="0"
                className={`w-full rounded-md border bg-white px-2.5 py-1.5 text-xs text-slate-800 outline-none transition focus:ring-1 ${
                  discountPercentage > 30
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : discountPercentage > 10
                      ? "border-orange-400 focus:border-orange-500 focus:ring-orange-500"
                      : "border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                }`}
              />
              {discountError && (
                <p
                  id="discount-error"
                  role="alert"
                  className="text-[10px] font-medium text-red-700"
                >
                  {discountError}
                </p>
              )}

              {discountPercentage > 50 && discountPercentage < 100 && (
                <p className="text-[10px] font-medium text-red-700">
                  Are you sure? High discount: more than 50%.
                </p>
              )}

              {discountPercentage > 30 && discountPercentage <= 50 && (
                <p className="text-[10px] font-medium text-red-700">
                  High discount: more than 30%.
                </p>
              )}
              {discountPercentage > 10 && discountPercentage <= 30 && (
                <p className="text-[10px] font-medium text-orange-700">
                  Discount is more than 10%.
                </p>
              )}
            </div>
            {/* Total Summary */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Subtotal</span>
                {subtotal === null ? (
                  <span className="text-red-500 text-[9px]">
                    Grade config not found
                  </span>
                ) : (
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                )}
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

          {/* RIGHT COLUMN */}
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
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Input Fields */}
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
