import { X } from "lucide-react";
import { useState } from "react";

const FeesModel = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-bold text-[#142B4A] text-base">
            Collect Fee Payment
          </h3>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Select Student
            </label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 outline-none">
              <option>Sophia Montgomery (STU-1029) — Due: $1,200</option>
              <option>Alexander Wright (STU-1088) — Due: $850</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Collection Amount ($)
            </label>
            <input
              type="number"
              defaultValue="1200"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 outline-none"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex gap-3">
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsPaymentModalOpen(false);
              showToast("Fee payment receipt #8819 generated & sent!");
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#142B4A] text-white font-bold text-xs shadow-md"
          >
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeesModel;
