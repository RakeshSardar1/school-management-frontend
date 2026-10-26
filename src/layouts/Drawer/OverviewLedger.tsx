import { Send, X } from "lucide-react";
import { useState } from "react";
const STUDENT_FEES_LIST = [
  {
    id: "STU-1029",
    name: "Sophia Montgomery",
    grade: "Grade 10-A",
    amount: "$1,200.00",
    dueDate: "Apr 15, 2026",
    status: "Unpaid",
  },
  {
    id: "STU-1088",
    name: "Alexander Wright",
    grade: "Grade 11-B",
    amount: "$850.00",
    dueDate: "Apr 18, 2026",
    status: "Unpaid",
  },
  {
    id: "STU-1045",
    name: "Emma Watson",
    grade: "Grade 9-C",
    amount: "$450.00",
    dueDate: "Apr 20, 2026",
    status: "Partial",
  },
  {
    id: "STU-1012",
    name: "Liam Harrison",
    grade: "Grade 12-A",
    amount: "$1,200.00",
    dueDate: "Apr 02, 2026",
    status: "Paid",
  },
  {
    id: "STU-1102",
    name: "Olivia Bennett",
    grade: "Grade 8-A",
    amount: "$950.00",
    dueDate: "Apr 25, 2026",
    status: "Unpaid",
  },
];
const OverviewLedger = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white border-l border-slate-200 w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="font-bold text-[#142B4A] text-base">
                Fees Ledger Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Detailed Student Account Status
              </p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {STUDENT_FEES_LIST.map((student) => (
              <div
                key={student.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#142B4A]">
                    {student.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {student.grade} • Due: {student.dueDate}
                  </p>
                  <p className="text-xs font-black text-[#3B82F6] mt-1">
                    {student.amount}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      student.status === "Paid"
                        ? "bg-emerald-100 text-emerald-800"
                        : student.status === "Partial"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {student.status}
                  </span>
                  <button
                    onClick={() =>
                      showToast(`Payment reminder sent to ${student.name}`)
                    }
                    className="p-1.5 rounded-lg bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1 hover:bg-[#142B4A] hover:text-white transition-all"
                  >
                    <Send className="w-3 h-3" /> Remind
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              showToast("Automated reminders sent to all 216 unpaid accounts");
              setIsDrawerOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-[#142B4A] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-[#D6B36A]" /> Remind All Unpaid
            Accounts
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewLedger;
