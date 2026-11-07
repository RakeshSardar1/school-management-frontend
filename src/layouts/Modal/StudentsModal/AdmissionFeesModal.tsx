import React, { useState } from "react";
import type { PipeLineLeadsTypes } from "../../../utilities/types";

interface FeesPaidModalProps {
  student: PipeLineLeadsTypes;
  close: () => void;
  //   onDone: () => void;
}

const AdmissionFeesModal: React.FC<FeesPaidModalProps> = ({
  student,
  close,
  //   onDone,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    close();
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate PDF generation/download
    setTimeout(() => {
      setIsDownloading(false);
      alert("Receipt downloaded successfully!");
    }, 1500);
  };

  // Mock Fee Breakdown Data
  const feeDetails = {
    // eslint-disable-next-line react-hooks/purity
    receiptNo: `RCPT-${Math.floor(100000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    transactionId: "TXN-9876543210",
    paymentMethod: "UPI / Credit Card",
    items: [
      { label: "Tuition Fee (Term 1)", amount: 15000 },
      { label: "Admission Fee (One-time)", amount: 5000 },
      { label: "Library & Lab Fee", amount: 2500 },
      { label: "Transport Fee (Quarterly)", amount: 3500 },
    ],
    discount: 2000,
    total: 24000, // (15000 + 5000 + 2500 + 3500) - 2000
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
              Fees Paid Successfully
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Payment Receipt for{" "}
              <strong className="text-slate-700">{student.name}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
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

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Success Icon Banner */}
          <div className="flex flex-col items-center justify-center pt-2 pb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              ₹{feeDetails.total.toLocaleString("en-IN")}
            </h3>
            <p className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full mt-2 border border-emerald-200">
              Payment Status: PAID
            </p>
          </div>

          {/* Transaction Details Meta Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">
                Receipt No.
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {feeDetails.receiptNo}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">
                Date
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {feeDetails.date}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">
                Transaction ID
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">
                {feeDetails.transactionId}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">
                Payment Method
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {feeDetails.paymentMethod}
              </p>
            </div>
          </div>

          {/* Fee Breakdown List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              Fee Breakdown
            </h3>
            <div className="space-y-2">
              {feeDetails.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-semibold text-slate-800">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100"></div>

          {/* Discount & Total */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-emerald-600">
              <span>Discount Applied</span>
              <span className="font-semibold">
                - ₹{feeDetails.discount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-base font-bold text-slate-900">
                Total Paid
              </span>
              <span className="text-lg font-bold text-slate-900">
                ₹{feeDetails.total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDownloading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                Download Receipt
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionFeesModal;
